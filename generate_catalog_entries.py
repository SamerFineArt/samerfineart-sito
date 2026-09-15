"""
Scansiona public/prints/ e public/print-files/ e genera automaticamente il
blocco di codice TypeScript da incollare in lib/catalog.ts per TUTTE le foto
trovate — invece di scriverle a mano una per una.

Uso: esegui questo file dalla cartella principale del progetto (quella che
contiene la cartella "public"), con:

    python3 generate_catalog_entries.py

Produce un file catalog-generated.txt con il blocco pronto da incollare
nell'array PRINTS di lib/catalog.ts. Titolo e categorie sono dedotti dal
nome file in modo grezzo: VANNO SEMPRE RIVISTI A MANO prima di pubblicare
(soprattutto categorie e il testo "story").
"""

from pathlib import Path
from PIL import Image
import re
from urllib.parse import quote

PRINTS_DIR = Path("public/prints")
PRINT_FILES_DIR = Path("public/print-files")
SITE_DOMAIN = "https://samerfineart-sito-red.vercel.app"  # aggiorna con il tuo dominio definitivo

VARIANTS = ["entry", "standard", "hero", "statement"]


def humanize_title(stem: str) -> str:
    """'20-Fenchurch-Street' -> '20 Fenchurch Street', 'London Steel' -> 'London Steel'"""
    words = re.split(r"[-_\s]+", stem)
    return " ".join(w if w.isdigit() else w.capitalize() for w in words if w)


def slugify(stem: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", stem).strip("-").lower()
    return s


def url_path(*parts: str) -> str:
    """Codifica correttamente ogni parte del path (spazi -> %20, ecc.)."""
    return "/".join(quote(p) for p in parts)


def guess_categories(stem: str) -> list[str]:
    """Deduce le categorie dal nome file in base a parole chiave note.
    Grezzo per natura — va sempre rivisto a mano."""
    s = stem.lower()
    cats = []

    japan_keywords = ["osaka", "umeda", "sinsekai", "vecchietta"]
    landscape_keywords = ["lake", "bled", "sentiero", "nebbioso", "via lattea", "passo cirone", "church in the fog"]
    abstract_keywords = ["astratto", "abstract", "dna", "idea", "linear-motion", "chromatic", "waves", "bamboo"]

    if any(k in s for k in japan_keywords):
        cats.append("japan")
    if any(k in s for k in landscape_keywords):
        cats.append("landscape")
    if any(k in s for k in abstract_keywords):
        cats.append("abstract")

    # Se non è stato individuato nulla di specifico, o se sembra un soggetto
    # architettonico esplicito, aggiungi "architecture" come default sensato
    # per il tuo catalogo (la maggioranza delle foto lo è).
    architecture_keywords = [
        "street", "building", "architect", "tower", "tunnel", "steel", "geometry",
        "spiral", "staircase", "station", "stazione", "beacon", "point", "eiffel",
        "louvre", "pyramid", "milano", "unicredit", "fenchurch",
    ]
    if any(k in s for k in architecture_keywords) or not cats:
        cats.append("architecture")

    return cats


def detect_orientation(base_stem: str) -> str:
    """Legge le dimensioni reali del file _entry_print per dedurre l'orientamento."""
    probe_path = PRINT_FILES_DIR / f"{base_stem}_entry_print.jpg"
    if not probe_path.exists():
        return "portrait"  # default se manca il file, da verificare a mano
    with Image.open(probe_path) as img:
        return "landscape" if img.width > img.height else "portrait"


def main():
    if not PRINTS_DIR.exists():
        print(f"Cartella non trovata: {PRINTS_DIR}. Esegui questo script dalla cartella principale del progetto.")
        return

    # Trova tutte le foto "base" (web, leggere) in public/prints/,
    # escludendo eventuali file già con suffisso _print per sicurezza.
    base_photos = sorted(
        p for p in PRINTS_DIR.glob("*")
        if p.suffix.lower() in (".jpg", ".jpeg", ".png") and "_print" not in p.stem
    )

    if not base_photos:
        print("Nessuna foto trovata in public/prints/.")
        return

    entries = []
    missing_print_files = []

    for photo in base_photos:
        base_stem = photo.stem
        slug = slugify(base_stem)
        title = humanize_title(base_stem)
        orientation = detect_orientation(base_stem)
        categories = guess_categories(base_stem)
        categories_str = ", ".join(f'"{c}"' for c in categories)

        # Verifica che tutte e 4 le varianti di stampa esistano.
        urls = {}
        for variant in VARIANTS:
            fname = f"{base_stem}_{variant}_print.jpg"
            fpath = PRINT_FILES_DIR / fname
            if not fpath.exists():
                missing_print_files.append(fname)
            urls[variant] = f"{SITE_DOMAIN}/{url_path('print-files', fname)}"

        image_src = f"/{url_path('prints', photo.name)}"

        entry = f'''  {{
    slug: "{slug}",
    title: "{title}",
    categories: [{categories_str}], // TODO: verifica/correggi le categorie
    story: "TODO: breve contesto — dove e perché è stata scattata.",
    orientation: "{orientation}",
    imageSrc: "{image_src}",
    printAssetUrls: {{
      entry: "{urls['entry']}",
      standard: "{urls['standard']}",
      hero: "{urls['hero']}",
      statement: "{urls['statement']}",
    }},
  }},'''
        entries.append(entry)

    output = "export const PRINTS: Print[] = [\n" + "\n".join(entries) + "\n];\n"

    out_path = Path("catalog-generated.txt")
    out_path.write_text(output, encoding="utf-8")

    print(f"\n{len(base_photos)} foto trovate ed elaborate.")
    print(f"Blocco di codice salvato in: {out_path.resolve()}")
    print("\nApri quel file, copia tutto il contenuto e sostituisci l'array")
    print("PRINTS esistente in lib/catalog.ts. Poi rivedi a mano categorie,")
    print("titoli e testo 'story' di ogni foto prima di pubblicare.")

    if missing_print_files:
        print(f"\n⚠️  ATTENZIONE: {len(missing_print_files)} file di stampa risultano mancanti:")
        for f in missing_print_files[:20]:
            print(f"   - {f}")
        if len(missing_print_files) > 20:
            print(f"   ... e altri {len(missing_print_files) - 20}")


if __name__ == "__main__":
    main()
