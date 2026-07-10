-- ============================================================
-- Muli Tamil App — Unified Lesson 1 Table
-- Migration: 003_lesson_1_unified.sql
--
-- ONE table, ONE row — contains every piece of content
-- for lesson 1:  poem · author · glossary · commentary ·
-- explanation · transliteration · English translation ·
-- book reference · quiz config · all 13 quiz questions
-- ============================================================

-- ── Drop all previous per-content tables ───────────────────
DROP TABLE IF EXISTS quiz_sub_questions       CASCADE;
DROP TABLE IF EXISTS quiz_word_order_options  CASCADE;
DROP TABLE IF EXISTS quiz_mcq_options         CASCADE;
DROP TABLE IF EXISTS quiz_questions           CASCADE;
DROP TABLE IF EXISTS quiz_intro_options       CASCADE;
DROP TABLE IF EXISTS quizzes                  CASCADE;
DROP TABLE IF EXISTS quiz_config              CASCADE;
DROP TABLE IF EXISTS lesson_1_quiz            CASCADE;
DROP TABLE IF EXISTS lesson_2_quiz            CASCADE;
DROP TABLE IF EXISTS lesson_3_quiz            CASCADE;
DROP TABLE IF EXISTS lesson_4_quiz            CASCADE;
DROP TABLE IF EXISTS lesson_5_quiz            CASCADE;
DROP TABLE IF EXISTS book_references          CASCADE;
DROP TABLE IF EXISTS authors                  CASCADE;
DROP TABLE IF EXISTS english_translations     CASCADE;
DROP TABLE IF EXISTS transliterations         CASCADE;
DROP TABLE IF EXISTS explanations             CASCADE;
DROP TABLE IF EXISTS commentaries             CASCADE;
DROP TABLE IF EXISTS glossary                 CASCADE;
DROP TABLE IF EXISTS lessons                  CASCADE;

-- ── Create unified lesson_1 table ──────────────────────────
CREATE TABLE IF NOT EXISTS lesson_1 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- ─────────────────────────────────────────────────────────
  -- LESSON CORE
  -- ─────────────────────────────────────────────────────────
  unit           INTEGER NOT NULL,
  lesson_number  INTEGER NOT NULL DEFAULT 1,
  poem           INTEGER NOT NULL,
  heading        TEXT    NOT NULL,    -- அலகு 1 : பாடம் 1 : பாடல் 3
  subtitle       TEXT    NOT NULL,    -- இது முதற்பொருள் பற்றியது
  poem_number    INTEGER NOT NULL,    -- 167
  collection     TEXT    NOT NULL,    -- குறுந்தொகை
  tinai          TEXT    NOT NULL,    -- முல்லை
  turai          TEXT    NOT NULL,    -- முதற்பொருள்
  prose_summary  TEXT    NOT NULL,    -- long prose paragraph
  poem_lines     TEXT[]  NOT NULL DEFAULT '{}',
  kondukoottu    TEXT    NOT NULL,

  -- ─────────────────────────────────────────────────────────
  -- AUTHOR  (பாடலாசிரியர்)
  -- ─────────────────────────────────────────────────────────
  author_heading   TEXT NOT NULL,
  author_name      TEXT NOT NULL,    -- கூடலூர்கிழார்
  author_biography TEXT NOT NULL,

  -- ─────────────────────────────────────────────────────────
  -- BOOK REFERENCE  (நூற்பெயர்)
  -- ─────────────────────────────────────────────────────────
  book_heading           TEXT NOT NULL,
  book_name              TEXT NOT NULL,    -- குறுந்தொகை
  book_description       TEXT NOT NULL,
  book_english_link_label TEXT NOT NULL DEFAULT '',

  -- ─────────────────────────────────────────────────────────
  -- GLOSSARY  (அருஞ்சொற்பொருள்)
  -- JSONB array of { word, meaning }
  -- ─────────────────────────────────────────────────────────
  glossary_heading TEXT NOT NULL,
  glossary_entries JSONB NOT NULL DEFAULT '[]',

  -- ─────────────────────────────────────────────────────────
  -- COMMENTARY  (பதவுரை)
  -- JSONB array of { phrase, explanation }
  -- ─────────────────────────────────────────────────────────
  commentary_heading TEXT NOT NULL,
  commentary_entries JSONB NOT NULL DEFAULT '[]',

  -- ─────────────────────────────────────────────────────────
  -- EXPLANATION  (பொழிப்புரை)
  -- ─────────────────────────────────────────────────────────
  explanation_heading TEXT NOT NULL,
  explanation_text    TEXT NOT NULL,

  -- ─────────────────────────────────────────────────────────
  -- TRANSLITERATION  (எழுத்துப்பெயர்ப்பு)
  -- ─────────────────────────────────────────────────────────
  transliteration_heading TEXT   NOT NULL,
  transliteration_lines   TEXT[] NOT NULL DEFAULT '{}',

  -- ─────────────────────────────────────────────────────────
  -- ENGLISH TRANSLATION  (மொழிபெயர்ப்பு)
  -- ─────────────────────────────────────────────────────────
  english_heading    TEXT   NOT NULL,
  english_lines      TEXT[] NOT NULL DEFAULT '{}',
  english_translator TEXT   NOT NULL DEFAULT '',

  -- ─────────────────────────────────────────────────────────
  -- QUIZ
  -- quiz_intro : { instruction1, instruction2, question, options }
  -- quiz_questions : full array of all 13 questions, exact JSON shape
  --   mcq        → { id, type, context, question, options:[{id,label,correct}] }
  --   word-order → { id, type, instruction, clue, options:[{id,lines[],correct}] }
  --   drag-drop  → { id, type, instruction, correctOrder[], wordBank[] }
  --   listening  → { id, type, instruction, poemLines[], footer }
  --   read-aloud → { id, type, instruction, lines[] }
  --   short-answer→ { id, type, instruction, subQuestions:[{question,answer}] }
  -- ─────────────────────────────────────────────────────────
  quiz_audio_src  TEXT   NOT NULL,
  quiz_poem_lines TEXT[] NOT NULL DEFAULT '{}',
  quiz_intro      JSONB  NOT NULL DEFAULT '{}',
  quiz_questions  JSONB  NOT NULL DEFAULT '[]',

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Index ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_lesson_1_number ON lesson_1(lesson_number);

-- ── RLS — public read ──────────────────────────────────────
ALTER TABLE lesson_1 ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_lesson_1" ON lesson_1 FOR SELECT USING (true);
