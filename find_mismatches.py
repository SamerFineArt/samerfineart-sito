"""
STEP 1: esegui prima "python3 find_mismatches.py" (nessun argomento).
Elenca, fianco a fianco, le foto in public/prints/ che non hanno una
corrispondenza in public/print-files/, e viceversa. Crea anche un file
rename_mapping.csv con una riga per ciascuna foto senza corrispondenza
web, da compilare a mano con il nome ORIGINALE dei file di stampa
corrispondenti.

STEP 2: apri rename_mapping.csv (con Excel, Google Sheets, o un editor di
testo), nella colonna "old_print_files_stem" scrivi il nome (senza suffissi
_entry_print ecc, senza estensione) che i file hanno ATTUALMENTE dentro
public/print-files/, per ciascuna riga. Salva il CSV.

STEP 3: esegui "python3 find_mismatches.py apply" per rinominare
automaticamente tutti i file di stampa in base al mapping che hai compilato.
"""

from pathlib import Path
import csv
import sys

PRINTS_DIR = Path("public/prints")
PRINT_FILES_DIR = Path("public/print-files")
VARIANTS = ["entry", "standard", "hero", "statement"]
MAPPING_FILE = Path("rename_mapping.csv")


def web_stems():
    return {
        p.stem: p
        for p in PRINTS_DIR.glob("*")
        if p.suffix.lower() in (".jpg", ".jpeg", ".png") and "_print" not in p.stem
    }


def print_file_stems():
    """Ricava lo stem 'base' dai file di stampa, togliendo il suffisso _variant_print."""
    stems = set()
    for p in PRINT_FILES_DIR.glob("*_print.jpg"):
        name = p.stem  # es: "Architectural Symphony_entry_print" -> tolto .jpg
        for variant in VARIANTS:
            suffix = f"_{variant}_print"
            if name.endswith(suffix):
                stems.add(name[: -len(suffix)])
                break
    return stems


def find_mismatches():
    web = web_stems()
    printed = print_file_stems()

    unmatched_web = sorted(set(web.keys()) - printed)
    unmatched_printed = sorted(printed - set(web.keys()))

    print(f"Foto web senza corrispondenza nei file di stampa: {len(unmatched_web)}")
    print(f"File di stampa senza corrispondenza nelle foto web: {len(unmatched_printed)}\n")

    print("--- Foto web (public/prints/) senza match ---")
    for s in unmatched_web:
        print(f"  {s}")

    print("\n--- Nomi base nei file di stampa (public/print-files/) senza match ---")
    for s in unmatched_printed:
        print(f"  {s}")

    # Crea il CSV da compilare.
    with MAPPING_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["web_photo_stem", "old_print_files_stem (da compilare tu)"])
        for s in unmatched_web:
            writer.writerow([s, ""])

    print(f"\nFile creato: {MAPPING_FILE.resolve()}")
    print("Apri il CSV, compila la seconda colonna con il nome esatto che i file")
    print("hanno ORA in public/print-files/ (senza _entry_print ecc, senza .jpg),")
    print("poi esegui: python3 find_mismatches.py apply")


def apply_mapping():
    if not MAPPING_FILE.exists():
        print(f"Non trovo {MAPPING_FILE}. Esegui prima lo script senza argomenti.")
        return

    renamed = 0
    skipped = 0

    with MAPPING_FILE.open(encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            new_stem = row["web_photo_stem"].strip()
            old_stem = row["old_print_files_stem (da compilare tu)"].strip()

            if not old_stem:
                skipped += 1
                continue

            for variant in VARIANTS:
                old_path = PRINT_FILES_DIR / f"{old_stem}_{variant}_print.jpg"
                new_path = PRINT_FILES_DIR / f"{new_stem}_{variant}_print.jpg"
                if old_path.exists():
                    old_path.rename(new_path)
                    renamed += 1
                else:
                    print(f"  ATTENZIONE: non trovato {old_path}")

    print(f"\nRinominati {renamed} file. Righe saltate (non compilate): {skipped}.")
    print("Rilancia generate_catalog_entries.py per verificare che non manchi più nulla.")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "apply":
        apply_mapping()
    else:
        find_mismatches()
