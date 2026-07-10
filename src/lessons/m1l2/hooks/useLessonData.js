/**
 * useLessonData.js
 * ─────────────────────────────────────────────────────────────
 * All content for Lesson 1 lives in ONE Supabase table: lesson_1
 * ONE query fetches the full row; all hooks read from it.
 *
 * Fallback: if Supabase is not configured or the query fails,
 * every hook returns data from the original JSON files so the
 * app always works.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';
import { supabase, SUPABASE_READY } from '../lib/supabase';

// ── JSON fallbacks ────────────────────────────────────────────
import _lessonJson      from '../data/lessons/lesson-1.json';
import _glossaryJson    from '../data/glossary/lesson-1-glossary.json';
import _commentaryJson  from '../data/translations/lesson-1-commentary.json';
import _explanationJson from '../data/translations/lesson-1-explanation.json';
import _translitJson    from '../data/translations/lesson-1-transliteration.json';
import _englishJson     from '../data/translations/lesson-1-english.json';
import _authorJson      from '../data/author/lesson-1-author.json';
import _bookJson        from '../data/reference/lesson-1-book.json';
import _quizJson        from '../data/quiz/lesson-2-quiz.json';

// ─────────────────────────────────────────────────────────────
// Single cached fetch — all hooks share ONE round-trip
// ─────────────────────────────────────────────────────────────
let _cachedRow  = null;   // the raw lesson_1 DB row
let _fetchProm  = null;   // in-flight promise (dedup parallel calls)

async function fetchLesson1Row() {
  if (_cachedRow) return _cachedRow;
  if (!_fetchProm) {
    _fetchProm = supabase
      .from('lesson_1')
      .select('*')
      .single()
      .then(({ data, error }) => {
        _fetchProm = null;
        if (error) throw error;
        _cachedRow = data;
        return data;
      })
      .catch(err => {
        _fetchProm = null;
        throw err;
      });
  }
  return _fetchProm;
}

// ─────────────────────────────────────────────────────────────
// Parsers — row → same shape the components already expect
// ─────────────────────────────────────────────────────────────

function parseLesson(row) {
  return {
    unit:         row.unit,
    lesson:       row.lesson_number,
    poem:         row.poem,
    heading:      row.heading,
    subtitle:     row.subtitle,
    poemNumber:   row.poem_number,
    collection:   row.collection,
    tinai:        row.tinai,
    turai:        row.turai,
    proseSummary: row.prose_summary,
    poemLines:    row.poem_lines,
    kondukoottu:  row.kondukoottu,
  };
}

function parseGlossary(row) {
  return {
    lesson:  row.lesson_number,
    heading: row.glossary_heading,
    entries: row.glossary_entries,   // [{word, meaning}] — stored as-is
  };
}

function parseCommentary(row) {
  return {
    lesson:  row.lesson_number,
    heading: row.commentary_heading,
    entries: row.commentary_entries, // [{phrase, explanation}]
  };
}

function parseExplanation(row) {
  return {
    lesson:  row.lesson_number,
    heading: row.explanation_heading,
    text:    row.explanation_text,
  };
}

function parseTransliteration(row) {
  return {
    lesson:  row.lesson_number,
    heading: row.transliteration_heading,
    lines:   row.transliteration_lines,
  };
}

function parseEnglish(row) {
  return {
    lesson:     row.lesson_number,
    heading:    row.english_heading,
    lines:      row.english_lines,
    translator: row.english_translator,
  };
}

function parseAuthor(row) {
  return {
    lesson:    row.lesson_number,
    heading:   row.author_heading,
    name:      row.author_name,
    biography: row.author_biography,
  };
}

function parseBook(row) {
  return {
    lesson:              row.lesson_number,
    heading:             row.book_heading,
    bookName:            row.book_name,
    description:         row.book_description,
    englishLinkLabel:    row.book_english_link_label,
    englishDescription:  row.book_english_description,
  };
}

function parseQuiz(row) {
  // quiz_intro and quiz_questions are stored as-is (exact JSON shape)
  // Supabase returns JSONB columns already parsed as JS objects
  const intro     = row.quiz_intro     || {};
  const questions = Array.isArray(row.quiz_questions)
    ? row.quiz_questions
    : (typeof row.quiz_questions === 'string'
        ? JSON.parse(row.quiz_questions)
        : []);

  return {
    audioSrc:  row.quiz_audio_src,
    poemLines: row.quiz_poem_lines,
    intro,
    questions,
  };
}

// ─────────────────────────────────────────────────────────────
// Generic hook factory
// ─────────────────────────────────────────────────────────────
function makeHook(parser, jsonFallback) {
  return function useData() {
    const [data,    setData]    = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!SUPABASE_READY) {
        setData(jsonFallback);
        setLoading(false);
        return;
      }
      let cancelled = false;
      fetchLesson1Row()
        .then(row => {
          if (!cancelled) { setData(parser(row)); setLoading(false); }
        })
        .catch(err => {
          if (!cancelled) {
            console.warn('[useLessonData] Supabase failed, using JSON fallback:', err?.message ?? err);
            setData(jsonFallback);
            setLoading(false);
          }
        });
      return () => { cancelled = true; };
    }, []);

    return { data, loading, error: null };
  };
}

// ─────────────────────────────────────────────────────────────
// Exported hooks — same API as before, zero component changes
// ─────────────────────────────────────────────────────────────
export const useLessonData          = makeHook(parseLesson,          _lessonJson);
export const useGlossaryData        = makeHook(parseGlossary,        _glossaryJson);
export const useCommentaryData      = makeHook(parseCommentary,      _commentaryJson);
export const useExplanationData     = makeHook(parseExplanation,     _explanationJson);
export const useTransliterationData = makeHook(parseTransliteration, _translitJson);
export const useEnglishData         = makeHook(parseEnglish,         _englishJson);
export const useAuthorData          = makeHook(parseAuthor,          _authorJson);
export const useBookData            = makeHook(parseBook,            _bookJson);
export const useQuizData            = makeHook(parseQuiz,            _quizJson);

/**
 * useAllLessonContent — fetches the whole row once and returns
 * every content object in one call.  Used by RightSidebar so it
 * triggers only ONE database query regardless of which panel is active.
 */
export function useAllLessonContent() {
  const [state, setState] = useState({
    lesson: null, glossary: null, commentary: null,
    explanation: null, transliteration: null,
    english: null, author: null, book: null,
    loading: true,
  });

  useEffect(() => {
    if (!SUPABASE_READY) {
      setState({
        lesson:          _lessonJson,
        glossary:        _glossaryJson,
        commentary:      _commentaryJson,
        explanation:     _explanationJson,
        transliteration: _translitJson,
        english:         _englishJson,
        author:          _authorJson,
        book:            _bookJson,
        loading: false,
      });
      return;
    }

    let cancelled = false;
    fetchLesson1Row()
      .then(row => {
        if (!cancelled) setState({
          lesson:          parseLesson(row),
          glossary:        parseGlossary(row),
          commentary:      parseCommentary(row),
          explanation:     parseExplanation(row),
          transliteration: parseTransliteration(row),
          english:         parseEnglish(row),
          author:          parseAuthor(row),
          book:            parseBook(row),
          loading: false,
        });
      })
      .catch(err => {
        if (!cancelled) {
          console.warn('[useAllLessonContent] Supabase failed, using JSON fallback:', err?.message ?? err);
          setState({
            lesson: _lessonJson, glossary: _glossaryJson, commentary: _commentaryJson,
            explanation: _explanationJson, transliteration: _translitJson,
            english: _englishJson, author: _authorJson, book: _bookJson,
            loading: false,
          });
        }
      });
    return () => { cancelled = true; };
  }, []);

  return state;
}
