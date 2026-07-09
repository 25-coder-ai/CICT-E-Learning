# CICT Exercise Storage Backend

FastAPI service that stores exercise sets as files under `data/`, replacing the
old browser-localStorage `cict-exercises` blob. The frontend talks to it over
`/api` (proxied by the Vite dev server).

## Setup

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app:app --reload --port 8000
```

The frontend (in `../CICT-LEARNING`) runs as usual with `npm run dev`; its Vite
config proxies `/api` to `http://localhost:8000`, so start both.

## Data layout

Each exercise set is stored in its own file, numbered 1-based and contiguous:

```
data/<section>/<lesson>/exercise1.json   # the 1st exercise set (one object)
data/<section>/<lesson>/exercise2.json   # the 2nd exercise set
data/<section>/<lesson>/exercise3.json   # ...
```

Adding a set appends the next number, editing rewrites only that set's file, and
deleting renumbers so there are never gaps. The frontend still works with the
in-memory array shape `{ unitKey: [sets] }` — the backend just reads the files in
order. (An older single-array `exercise.json` is still read if present and is
converted to per-set files on the first write.)

`registry.py` is the single source of truth mapping `section + unitKey -> folder`.

## API

| Method | Route | Body / Params |
|--------|-------|---------------|
| GET    | `/api/health` | — |
| GET    | `/api/exercises` | — (returns `{ unitKey: [sets] }`) |
| POST   | `/api/exercises` | `{ section, unitKey, exerciseSet }` |
| PUT    | `/api/exercises/{index}` | `{ section, unitKey, exerciseSet }` |
| DELETE | `/api/exercises/{index}` | `?section=&unitKey=` |

## Migrating existing localStorage data

In the browser that has your data, open DevTools console and run
`copy(localStorage.getItem('cict-exercises'))`, paste into a file
`cict-exercises.json`, then:

```bash
python migrate.py cict-exercises.json
```
