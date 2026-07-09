"""Migrate a localStorage 'cict-exercises' export into the data/ folder tree.

Get the export from the browser that holds your data (DevTools console):
    copy(localStorage.getItem('cict-exercises'))
Paste it into a file, then:
    python migrate.py cict-exercises.json

The export is the JSON object { unitKey: [exerciseSet, ...] }. Each unitKey is
resolved against registry.py and written to data/<section>/<folder>/.
This does NOT touch the browser; your localStorage stays intact as a backup.
"""

import json
import sys
from pathlib import Path

import registry
import storage

# Windows consoles default to cp1252 and choke on Tamil in print(); force UTF-8.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except (AttributeError, ValueError):
    pass


def main():
    if len(sys.argv) < 2:
        print("Usage: python migrate.py <cict-exercises.json>")
        sys.exit(1)

    src = Path(sys.argv[1])
    if not src.exists():
        print(f"File not found: {src}")
        sys.exit(1)

    data = json.loads(src.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        print("Expected a JSON object { unitKey: [sets] }.")
        sys.exit(1)

    migrated, total_sets, skipped = 0, 0, []
    for unit_key, sets in data.items():
        unit = registry.find_by_unit_key(unit_key)
        if not unit or not isinstance(sets, list):
            skipped.append(unit_key)
            continue
        storage.write_list(unit["section"], unit_key, sets)
        migrated += 1
        total_sets += len(sets)
        print(f"  {unit['section']}/{unit['folder']}: {len(sets)} set(s)  <- {unit_key}")

    print(f"\nMigrated {migrated} unit(s), {total_sets} set(s) total.")
    if skipped:
        print("Skipped (unitKey not in registry):")
        for k in skipped:
            print(f"  - {k}")


if __name__ == "__main__":
    main()
