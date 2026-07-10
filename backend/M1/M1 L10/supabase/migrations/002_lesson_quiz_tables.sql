-- ============================================================
-- Muli Tamil App — Lesson Quiz Tables (Flat Structure)
-- Migration: 002_lesson_quiz_tables.sql
--
-- Replaces the complex normalized quiz tables with one simple
-- flat table per lesson quiz.
--
-- Structure per lesson:
--   quiz_config       — audio, poem lines, intro question (shared)
--   lesson_1_quiz     — all 13 questions for lesson 1 (flat rows)
--   lesson_2_quiz     — ready for future lesson 2
--   ...
--   lesson_5_quiz     — ready for future lesson 5
-- ============================================================

-- ── Drop old complex quiz tables if they were created by 001 ──
DROP TABLE IF EXISTS quiz_sub_questions      CASCADE;
DROP TABLE IF EXISTS quiz_word_order_options CASCADE;
DROP TABLE IF EXISTS quiz_mcq_options        CASCADE;
DROP TABLE IF EXISTS quiz_questions          CASCADE;
DROP TABLE IF EXISTS quiz_intro_options      CASCADE;
DROP TABLE IF EXISTS quizzes                 CASCADE;

-- ────────────────────────────────────────────────────────────
-- QUIZ_CONFIG
-- One row per lesson. Stores the audio file, the poem lines
-- shown at the top of the quiz, and the intro read-check question.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_config (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_number       INTEGER     UNIQUE NOT NULL,
  audio_src           TEXT        NOT NULL,
  poem_lines          TEXT[]      NOT NULL DEFAULT '{}',
  intro_instruction1  TEXT        NOT NULL DEFAULT '',
  intro_instruction2  TEXT        NOT NULL DEFAULT '',
  intro_question      TEXT        NOT NULL DEFAULT '',
  intro_options       JSONB       NOT NULL DEFAULT '[]',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- LESSON 1 QUIZ  (குறுந்தொகை — poem 167)
-- 13 questions across 6 types.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_1_quiz (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number  INTEGER     NOT NULL,
  question_type    TEXT        NOT NULL,   -- mcq | word-order | drag-drop | listening | read-aloud | short-answer
  question_text    TEXT,                   -- context (mcq) / instruction (others)
  option_a         TEXT,                   -- MCQ label A / word-order option A lines (joined)
  option_b         TEXT,                   -- MCQ label B / word-order option B lines (joined)
  option_c         TEXT,                   -- MCQ label C
  option_d         TEXT,                   -- MCQ label D (reserved)
  correct_answer   TEXT,                   -- 'a' | 'b' | 'c' | 'd' (MCQ & word-order)
  explanation      TEXT,                   -- question line (mcq) / clue (word-order) / footer (listening)
  audio_reference  TEXT,                   -- audio file path for this question
  image_reference  TEXT,                   -- image file path (null if none)
  extra_data       JSONB,                  -- lines[], correctOrder[], wordBank[], subQuestions[], option_X_lines[]
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- LESSON 2 QUIZ  (ready for future content)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_2_quiz (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number  INTEGER     NOT NULL,
  question_type    TEXT        NOT NULL,
  question_text    TEXT,
  option_a         TEXT,
  option_b         TEXT,
  option_c         TEXT,
  option_d         TEXT,
  correct_answer   TEXT,
  explanation      TEXT,
  audio_reference  TEXT,
  image_reference  TEXT,
  extra_data       JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- LESSON 3 QUIZ  (ready for future content)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_3_quiz (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number  INTEGER     NOT NULL,
  question_type    TEXT        NOT NULL,
  question_text    TEXT,
  option_a         TEXT,
  option_b         TEXT,
  option_c         TEXT,
  option_d         TEXT,
  correct_answer   TEXT,
  explanation      TEXT,
  audio_reference  TEXT,
  image_reference  TEXT,
  extra_data       JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- LESSON 4 QUIZ  (ready for future content)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_4_quiz (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number  INTEGER     NOT NULL,
  question_type    TEXT        NOT NULL,
  question_text    TEXT,
  option_a         TEXT,
  option_b         TEXT,
  option_c         TEXT,
  option_d         TEXT,
  correct_answer   TEXT,
  explanation      TEXT,
  audio_reference  TEXT,
  image_reference  TEXT,
  extra_data       JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- LESSON 5 QUIZ  (ready for future content)
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lesson_5_quiz (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  question_number  INTEGER     NOT NULL,
  question_type    TEXT        NOT NULL,
  question_text    TEXT,
  option_a         TEXT,
  option_b         TEXT,
  option_c         TEXT,
  option_d         TEXT,
  correct_answer   TEXT,
  explanation      TEXT,
  audio_reference  TEXT,
  image_reference  TEXT,
  extra_data       JSONB,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ────────────────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_quiz_config_lesson   ON quiz_config(lesson_number);
CREATE INDEX IF NOT EXISTS idx_lesson_1_quiz_num    ON lesson_1_quiz(question_number);
CREATE INDEX IF NOT EXISTS idx_lesson_2_quiz_num    ON lesson_2_quiz(question_number);
CREATE INDEX IF NOT EXISTS idx_lesson_3_quiz_num    ON lesson_3_quiz(question_number);
CREATE INDEX IF NOT EXISTS idx_lesson_4_quiz_num    ON lesson_4_quiz(question_number);
CREATE INDEX IF NOT EXISTS idx_lesson_5_quiz_num    ON lesson_5_quiz(question_number);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY — public read
-- ────────────────────────────────────────────────────────────
ALTER TABLE quiz_config   ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_1_quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_2_quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_3_quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_4_quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_5_quiz ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_quiz_config"    ON quiz_config   FOR SELECT USING (true);
CREATE POLICY "public_read_lesson_1_quiz"  ON lesson_1_quiz FOR SELECT USING (true);
CREATE POLICY "public_read_lesson_2_quiz"  ON lesson_2_quiz FOR SELECT USING (true);
CREATE POLICY "public_read_lesson_3_quiz"  ON lesson_3_quiz FOR SELECT USING (true);
CREATE POLICY "public_read_lesson_4_quiz"  ON lesson_4_quiz FOR SELECT USING (true);
CREATE POLICY "public_read_lesson_5_quiz"  ON lesson_5_quiz FOR SELECT USING (true);
