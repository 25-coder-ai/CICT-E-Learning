"""Single source of truth mapping section + unitKey -> lesson folder.

The unitKey strings MUST match exactly what the frontend uses in
CICT-LEARNING/src/pages/VideoLecturesPage.jsx (the Akam akamUnitMap /
Unit 6-7 keys, the puramUnitContent keys, and the two overview keys).
"""

SECTIONS = ("akam", "puram")

# order roughly mirrors the sidebar; folder names are ASCII/stable, the
# Tamil unitKey is preserved here and echoed into each metadata.json
UNITS = [
    # ── அகம் (Akam) ──
    {"section": "akam", "unitKey": "akam-overview",      "folder": "overview", "lesson": 0},
    {"section": "akam", "unitKey": "அலகு 1 : முல்லை",     "folder": "Lesson_1", "lesson": 1},
    {"section": "akam", "unitKey": "அலகு 2 : குறிஞ்சி",   "folder": "Lesson_2", "lesson": 2},
    {"section": "akam", "unitKey": "அலகு 3 : மருதம்",     "folder": "Lesson_3", "lesson": 3},
    {"section": "akam", "unitKey": "அலகு 4 : நெய்தல்",    "folder": "Lesson_4", "lesson": 4},
    {"section": "akam", "unitKey": "அலகு 5 : பாலை",       "folder": "Lesson_5", "lesson": 5},
    {"section": "akam", "unitKey": "அலகு 6 : கைக்கிளை",   "folder": "Lesson_6", "lesson": 6},
    {"section": "akam", "unitKey": "அலகு 7 : பெருந்திணை", "folder": "Lesson_7", "lesson": 7},
    # ── புறம் (Puram) ──
    {"section": "puram", "unitKey": "puram-overview",     "folder": "overview", "lesson": 0},
    {"section": "puram", "unitKey": "அலகு 1 : வெட்சி",    "folder": "Lesson_1", "lesson": 1},
    {"section": "puram", "unitKey": "அலகு 2 : வஞ்சி",     "folder": "Lesson_2", "lesson": 2},
    {"section": "puram", "unitKey": "அலகு 3 : உழிஞை",     "folder": "Lesson_3", "lesson": 3},
    {"section": "puram", "unitKey": "அலகு 4 : தும்பை",    "folder": "Lesson_4", "lesson": 4},
    {"section": "puram", "unitKey": "அலகு 5 : வாகை",      "folder": "Lesson_5", "lesson": 5},
    {"section": "puram", "unitKey": "அலகு 6 : காஞ்சி",    "folder": "Lesson_6", "lesson": 6},
    {"section": "puram", "unitKey": "அலகு 7 : பாடாண்",    "folder": "Lesson_7", "lesson": 7},
]

_BY_SECTION_KEY = {(u["section"], u["unitKey"]): u for u in UNITS}
_BY_KEY = {u["unitKey"]: u for u in UNITS}


def get_unit(section, unit_key):
    """Return the unit entry for (section, unitKey), or None if unknown."""
    return _BY_SECTION_KEY.get((section, unit_key))


def find_by_unit_key(unit_key):
    """Return the unit entry by unitKey alone (keys are globally unique)."""
    return _BY_KEY.get(unit_key)


def all_units():
    return list(UNITS)
