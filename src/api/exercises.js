// API client for exercise-set storage (replaces browser localStorage).
// The Vite dev server proxies /api to the FastAPI backend (see vite.config.js).

const BASE = "/api";

async function handle(res) {
  if (!res.ok) {
    let detail = res.statusText;
    try {
      detail = (await res.json()).detail || detail;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(`API ${res.status}: ${detail}`);
  }
  return res.json();
}

// Returns the full { unitKey: ExerciseSet[] } map.
export async function fetchAllExercises() {
  return handle(await fetch(`${BASE}/exercises`));
}

// Create (index null/undefined) or edit (numeric index) a single set.
// Returns { index, list } for create and { list } for edit.
export async function saveExerciseSet(section, unitKey, index, exerciseSet) {
  const isEdit = index !== null && index !== undefined;
  const res = await fetch(isEdit ? `${BASE}/exercises/${index}` : `${BASE}/exercises`, {
    method: isEdit ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, unitKey, exerciseSet }),
  });
  return handle(res);
}

// Deletes the set at index. Returns { list }.
export async function deleteExerciseSet(section, unitKey, index) {
  const params = new URLSearchParams({ section, unitKey });
  return handle(await fetch(`${BASE}/exercises/${index}?${params}`, { method: "DELETE" }));
}
