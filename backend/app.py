"""FastAPI backend for CICT exercise-set storage.

Replaces the browser-localStorage 'cict-exercises' blob with folder-based
storage under data/<section>/<lesson>/. The frontend keeps its in-memory
shape { unitKey: ExerciseSet[] } and only swaps the persistence layer.

Run (from the backend/ directory):
    uvicorn app:app --reload --port 8000
"""

from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import registry
import storage

app = FastAPI(title="CICT Exercise Storage")

# Local dev: the Vite dev server proxies /api here, but allow direct calls too.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExercisePayload(BaseModel):
    section: str
    unitKey: str
    exerciseSet: Dict[str, Any]


def _require_unit(section: str, unit_key: str):
    if registry.get_unit(section, unit_key) is None:
        raise HTTPException(status_code=404, detail=f"Unknown unit: {section}/{unit_key}")


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/exercises")
def get_exercises() -> Dict[str, List[Any]]:
    """Full { unitKey: [sets] } map assembled from every lesson folder."""
    return storage.load_all()


@app.post("/api/exercises")
def add_exercise(payload: ExercisePayload):
    """Append a new exercise set to a unit."""
    _require_unit(payload.section, payload.unitKey)
    sets = storage.read_list(payload.section, payload.unitKey)
    sets.append(payload.exerciseSet)
    storage.write_list(payload.section, payload.unitKey, sets)
    return {"index": len(sets) - 1, "list": sets}


@app.put("/api/exercises/{index}")
def edit_exercise(index: int, payload: ExercisePayload):
    """Replace the exercise set at `index` for a unit (edit)."""
    _require_unit(payload.section, payload.unitKey)
    sets = storage.read_list(payload.section, payload.unitKey)
    if index < 0 or index >= len(sets):
        raise HTTPException(status_code=400, detail="Index out of range")
    sets[index] = payload.exerciseSet
    storage.write_list(payload.section, payload.unitKey, sets)
    return {"list": sets}


@app.delete("/api/exercises/{index}")
def delete_exercise(
    index: int,
    section: str = Query(...),
    unitKey: str = Query(...),
):
    """Remove the exercise set at `index` for a unit."""
    _require_unit(section, unitKey)
    sets = storage.read_list(section, unitKey)
    if index < 0 or index >= len(sets):
        raise HTTPException(status_code=400, detail="Index out of range")
    sets.pop(index)
    storage.write_list(section, unitKey, sets)
    return {"list": sets}
