"""Folder-based persistence for exercise sets.

Each unit (lesson) is a folder under data/<section>/<folder>/ containing ONE
JSON file per exercise set, named exercise1.json, exercise2.json, ... in order:
  - exercise1.json : the first exercise set (a single object, not an array)
  - exercise2.json : the second exercise set
  - ...

The numbering is always 1-based and contiguous: adding a set appends the next
number, editing rewrites just that set's file, and deleting renumbers so there
are never gaps. The in-memory shape the frontend uses ({ unitKey: [sets] }) is
unchanged — read_list assembles the array by reading the files in order.

All reads/writes are UTF-8 with ensure_ascii=False so Tamil text is preserved,
and writes are atomic (temp file + os.replace) to avoid corruption on crash.
"""

import json
import os
import re
import tempfile
from pathlib import Path

import registry

DATA_DIR = Path(__file__).resolve().parent / "data"

# Matches exercise1.json, exercise2.json, ... (captures the number).
_SET_FILE_RE = re.compile(r"^exercise(\d+)\.json$")

# Legacy single-array file this storage used to write, kept only for reading so
# old data auto-migrates to per-set files on the first write.
_LEGACY_ARRAY_FILE = "exercise.json"
_LEGACY_META_FILE = "metadata.json"


def _lesson_dir(section, unit_key):
    unit = registry.get_unit(section, unit_key)
    if not unit:
        raise KeyError(f"Unknown unit: {section}/{unit_key}")
    return DATA_DIR / section / unit["folder"], unit


def _atomic_write_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, path)  # atomic on the same filesystem
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def _set_files(lesson_dir: Path):
    """Return [(number, Path), ...] for exercise<N>.json files, sorted by N."""
    if not lesson_dir.exists():
        return []
    found = []
    for p in lesson_dir.iterdir():
        m = _SET_FILE_RE.match(p.name)
        if m:
            found.append((int(m.group(1)), p))
    found.sort(key=lambda t: t[0])
    return found


def _read_set_files(lesson_dir: Path):
    """Read every exercise<N>.json in order into a list of set objects."""
    sets = []
    for _, p in _set_files(lesson_dir):
        try:
            with open(p, encoding="utf-8") as fp:
                sets.append(json.load(fp))
        except (json.JSONDecodeError, OSError):
            continue
    return sets


def _read_legacy_array(lesson_dir: Path):
    """Read the old single-array exercise.json, if present ([] otherwise)."""
    f = lesson_dir / _LEGACY_ARRAY_FILE
    if not f.exists():
        return []
    try:
        with open(f, encoding="utf-8") as fp:
            data = json.load(fp)
    except (json.JSONDecodeError, OSError):
        return []
    return data if isinstance(data, list) else []


def read_list(section, unit_key):
    """Return the array of sets for a unit ([] if none). Raises KeyError if
    the (section, unitKey) pair is not in the registry.

    Prefers the per-set exercise<N>.json files; falls back to the legacy
    single-array exercise.json so pre-migration data still loads. The legacy
    file is converted to per-set files the next time this unit is written."""
    lesson_dir, _ = _lesson_dir(section, unit_key)
    per_set = _read_set_files(lesson_dir)
    if per_set:
        return per_set
    return _read_legacy_array(lesson_dir)


def write_list(section, unit_key, sets):
    """Persist the full array of sets as one file per set (exercise1.json ...).

    Rewrites the numbered files from scratch so numbering stays 1-based and
    contiguous, and removes any leftover higher-numbered files plus the legacy
    exercise.json / metadata.json from the old single-array layout."""
    lesson_dir, _ = _lesson_dir(section, unit_key)
    lesson_dir.mkdir(parents=True, exist_ok=True)

    # Remove existing per-set files so deletes/reorders don't leave stragglers.
    for _, p in _set_files(lesson_dir):
        try:
            p.unlink()
        except OSError:
            pass

    # Write one file per set, 1-based and contiguous.
    for i, exercise_set in enumerate(sets, start=1):
        _atomic_write_json(lesson_dir / f"exercise{i}.json", exercise_set)

    # Drop the old single-array layout files now that per-set files are current.
    for legacy in (_LEGACY_ARRAY_FILE, _LEGACY_META_FILE):
        legacy_path = lesson_dir / legacy
        if legacy_path.exists():
            try:
                legacy_path.unlink()
            except OSError:
                pass

    return sets


def load_all():
    """Assemble the full { unitKey: [sets] } map the frontend expects.

    Only units that actually have exercise sets on disk are included; the
    frontend already treats missing keys as an empty list.
    """
    result = {}
    for unit in registry.all_units():
        sets = read_list(unit["section"], unit["unitKey"])
        if sets:
            result[unit["unitKey"]] = sets
    return result
