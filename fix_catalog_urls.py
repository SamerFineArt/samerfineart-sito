"""
Corregge lib/catalog.ts: gli URL in printAssetUrls devono usare il nome
ESATTO dei file reali in public/print-files/ (maiuscole comprese), non lo
slug minuscolo usato per l'URL della pagina prodotto.

Il problema: generate_catalog_entries.py aveva scritto gli URL usando lo
slug (tutto minuscolo), ma i file di stampa reali sul disco mantengono le
maiuscole del nome originale della foto (es. "20-Fenchurch-Street" non
"20-fenchurch-street"). Su Vercel i percorsi sono case-sensitive, quindi
gli URL non corrispondevano ai file reali -> 404 quando Prodigi scaricava
l'immagine.

USO: esegui dalla cartella principale del progetto con:
    python3 fix_catalog_urls.py

Legge lib/catalog.ts, per ogni foto trova il file REALE corrispondente in
public/print-files/ (matching case-insensitive, cosi' trova il file anche
se il case scritto nel catalogo è sbagliato), e riscrive gli URL con il
nome ESATTO trovato su disco. Salva il risultato in catalog-fixed.ts da
rivedere prima di sostituire il file originale.
"""

import re
from pathlib import Path

CATALOG_PATH = Path("lib/catalog.ts")
PRINT_FILES_DIR = Path("public/print-files")
VARIANTS = ["entry", "standard", "hero", "statement"]


def build_case_insensitive_index():
    """Mappa nome_file.lower() -> nome_file reale (con maiuscole corrette)."""
    index = {}
    for p in PRINT_FILES_DIR.glob("*_print.jpg"):
        index[p.name.lower()] = p.name
    return index


def main():
    if not CATALOG_PATH.exists():
        print(f"Non trovo {CATALOG_PATH}. Esegui questo script dalla cartella principale del progetto.")
        return
    if not PRINT_FILES_DIR.exists():
        print(f"Non trovo {PRINT_FILES_DIR}.")
        return

    real_files = build_case_insensitive_index()
    content = CATALOG_PATH.read_text(encoding="utf-8")

    # Trova ogni URL dentro printAssetUrls e lo corregge se il case non combacia.
    url_pattern = re.compile(r'(https://[^"]*?/print-files/)([^"]+\.jpg)"')

    fixed_count = 0
    not_found = []

    def replace_url(match):
        nonlocal fixed_count
        prefix, filename = match.group(1), match.group(2)
        real_name = real_files.get(filename.lower())
        if real_name is None:
            not_found.append(filename)
            return match.group(0)
        if real_name != filename:
            fixed_count += 1
            return f'{prefix}{real_name}"'
        return match.group(0)

    new_content = url_pattern.sub(replace_url, content)

    out_path = Path("catalog-fixed.ts")
    out_path.write_text(new_content, encoding="utf-8")

    print(f"Corretti {fixed_count} URL con maiuscole/minuscole sbagliate.")
    print(f"Risultato salvato in: {out_path.resolve()}")

    if not_found:
        print(f"\n⚠️  ATTENZIONE: {len(set(not_found))} nomi file citati nel catalogo NON trovati")
        print("   in public/print-files/ (nemmeno ignorando maiuscole/minuscole):")
        for f in sorted(set(not_found))[:20]:
            print(f"   - {f}")
        print("\n   Questi vanno controllati a mano: probabilmente il file manca davvero.")

    print("\nApri catalog-fixed.ts, verifica che sia corretto, poi sostituisci")
    print("il contenuto di lib/catalog.ts con questo.")


if __name__ == "__main__":
    main()
