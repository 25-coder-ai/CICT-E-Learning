-- ============================================================
-- Muli Tamil Learning App — Supabase PostgreSQL Schema
-- Migration: 001_create_schema.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- LESSONS
-- Stores poem metadata: unit/lesson/poem identifiers,
-- heading, subtitle, collection info, prose summary,
-- poem lines array, and the kondukoottu joined-text form.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit            INTEGER     NOT NULL,
  lesson_number   INTEGER     NOT NULL,
  poem            INTEGER     NOT NULL,
  heading         TEXT        NOT NULL,
  subtitle        TEXT        NOT NULL,
  poem_number     INTEGER     NOT NULL,
  collection      TEXT        NOT NULL,
  tinai           TEXT        NOT NULL,
  turai           TEXT        NOT NULL,
  prose_summary   TEXT        NOT NULL,
  poem_lines      TEXT[]      NOT NULL DEFAULT '{}',
  kondukoottu     TEXT        NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(), 
  UNIQUE (unit, lesson_number, poem)
);

-- ────────────────────────────────────────────────────────────
-- GLOSSARY  (அருஞ்சொற்பொருள்)
-- Each row = one word + meaning entry, ordered by sort_order.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS glossary (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  word          TEXT    NOT NULL,
  meaning       TEXT    NOT NULL
);

-- ────────────────────────────────────────────────────────────
-- COMMENTARIES  (பதவுரை)
-- Each row = one phrase + explanation pair.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS commentaries (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  phrase        TEXT    NOT NULL,
  explanation   TEXT    NOT NULL
);

-- ────────────────────────────────────────────────────────────
-- EXPLANATIONS  (பொழிப்புரை)
-- Single prose block per lesson.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS explanations (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  text          TEXT    NOT NULL
);

-- ────────────────────────────────────────────────────────────
-- TRANSLITERATIONS  (எழுத்துப்பெயர்ப்பு)
-- Array of romanized lines, one per poem line.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS transliterations (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  lines         TEXT[]  NOT NULL DEFAULT '{}'
);

-- ────────────────────────────────────────────────────────────
-- ENGLISH_TRANSLATIONS  (மொழிபெயர்ப்பு)
-- Array of translated lines + optional translator credit.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS english_translations (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  lines         TEXT[]  NOT NULL DEFAULT '{}',
  translator    TEXT    NOT NULL DEFAULT ''
);

-- ────────────────────────────────────────────────────────────
-- AUTHORS  (பாடலாசிரியர்)
-- Author name + biography per lesson.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS authors (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id     UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  heading       TEXT    NOT NULL,
  name          TEXT    NOT NULL,
  biography     TEXT    NOT NULL
);

-- ────────────────────────────────────────────────────────────
-- BOOK_REFERENCES  (நூற்பெயர்)
-- Book name, description, and UI link label per lesson.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS book_references (
  id                  UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id           UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number       INTEGER NOT NULL,
  heading             TEXT    NOT NULL,
  book_name           TEXT    NOT NULL,
  description         TEXT    NOT NULL,
  english_link_label  TEXT    NOT NULL DEFAULT ''
);

-- ────────────────────────────────────────────────────────────
-- QUIZZES
-- One quiz per lesson. Stores audio reference, poem lines
-- used in the quiz UI, and the intro read-check question data.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id                  UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id           UUID    NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  lesson_number       INTEGER NOT NULL,
  audio_src           TEXT    NOT NULL,
  poem_lines          TEXT[]  NOT NULL DEFAULT '{}',
  intro_instruction1  TEXT    NOT NULL,
  intro_instruction2  TEXT    NOT NULL,
  intro_question      TEXT    NOT NULL,
  UNIQUE (lesson_number)
);

-- ────────────────────────────────────────────────────────────
-- QUIZ_INTRO_OPTIONS
-- Yes/No options for the intro read-check question.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_intro_options (
  id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id     UUID    NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  option_id   TEXT    NOT NULL,   -- "yes" | "no"
  label       TEXT    NOT NULL,
  correct     BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- QUIZ_QUESTIONS
-- All question types share this table (polymorphic).
-- Columns not applicable to a type are NULL.
--
-- type        | used columns
-- ------------|----------------------------------------------
-- mcq         | context, question_text, [quiz_mcq_options]
-- word-order  | instruction, clue, [quiz_word_order_options]
-- drag-drop   | instruction, correct_order, word_bank
-- listening   | instruction, poem_lines, footer
-- read-aloud  | instruction, lines
-- short-answer| instruction, [quiz_sub_questions]
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_questions (
  id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id         UUID    NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,   -- original JSON "id" field
  type            TEXT    NOT NULL CHECK (type IN (
                    'mcq','word-order','drag-drop',
                    'listening','read-aloud','short-answer')),
  -- mcq
  context         TEXT,
  question_text   TEXT,               -- optional clarifying question
  -- word-order / drag-drop / listening / read-aloud / short-answer
  instruction     TEXT,
  -- word-order
  clue            TEXT,
  -- listening
  poem_lines      TEXT[],
  footer          TEXT,
  -- read-aloud
  lines           TEXT[],
  -- drag-drop
  correct_order   TEXT[],
  word_bank       TEXT[],
  sort_order      INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- QUIZ_MCQ_OPTIONS
-- Answer options for type="mcq" questions.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_mcq_options (
  id           UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id  UUID    NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_id    TEXT    NOT NULL,   -- "a" | "b" | "c"
  label        TEXT    NOT NULL,
  correct      BOOLEAN NOT NULL DEFAULT false,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- QUIZ_WORD_ORDER_OPTIONS
-- Answer options for type="word-order" questions.
-- Each option contains an ordered array of poem lines.
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_word_order_options (
  id           UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id  UUID    NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  option_id    TEXT    NOT NULL,   -- "a" | "b"
  lines        TEXT[]  NOT NULL DEFAULT '{}',
  correct      BOOLEAN NOT NULL DEFAULT false,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- QUIZ_SUB_QUESTIONS
-- Sub-questions for type="short-answer" questions.
-- answer may be empty string (student writes own answer).
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quiz_sub_questions (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id   UUID    NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  question_text TEXT    NOT NULL,
  answer        TEXT    NOT NULL DEFAULT '',
  sort_order    INTEGER NOT NULL DEFAULT 0
);

-- ────────────────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_lessons_lesson_number         ON lessons(lesson_number);
CREATE INDEX IF NOT EXISTS idx_glossary_lesson_number        ON glossary(lesson_number);
CREATE INDEX IF NOT EXISTS idx_commentaries_lesson_number    ON commentaries(lesson_number);
CREATE INDEX IF NOT EXISTS idx_explanations_lesson_number    ON explanations(lesson_number);
CREATE INDEX IF NOT EXISTS idx_transliterations_lesson_number ON transliterations(lesson_number);
CREATE INDEX IF NOT EXISTS idx_english_translations_lesson   ON english_translations(lesson_number);
CREATE INDEX IF NOT EXISTS idx_authors_lesson_number         ON authors(lesson_number);
CREATE INDEX IF NOT EXISTS idx_book_references_lesson_number ON book_references(lesson_number);
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_number         ON quizzes(lesson_number);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id        ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_sort           ON quiz_questions(quiz_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_quiz_mcq_options_question_id  ON quiz_mcq_options(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_word_order_q_id          ON quiz_word_order_options(question_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sub_questions_q_id       ON quiz_sub_questions(question_id);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (public read — no auth required)
-- ────────────────────────────────────────────────────────────
ALTER TABLE lessons               ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary              ENABLE ROW LEVEL SECURITY;
ALTER TABLE commentaries          ENABLE ROW LEVEL SECURITY;
ALTER TABLE explanations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE transliterations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE english_translations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors               ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_references       ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_intro_options    ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_mcq_options      ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_word_order_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sub_questions    ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_lessons"               ON lessons               FOR SELECT USING (true);
CREATE POLICY "public_read_glossary"              ON glossary              FOR SELECT USING (true);
CREATE POLICY "public_read_commentaries"          ON commentaries          FOR SELECT USING (true);
CREATE POLICY "public_read_explanations"          ON explanations          FOR SELECT USING (true);
CREATE POLICY "public_read_transliterations"      ON transliterations      FOR SELECT USING (true);
CREATE POLICY "public_read_english_translations"  ON english_translations  FOR SELECT USING (true);
CREATE POLICY "public_read_authors"               ON authors               FOR SELECT USING (true);
CREATE POLICY "public_read_book_references"       ON book_references       FOR SELECT USING (true);
CREATE POLICY "public_read_quizzes"               ON quizzes               FOR SELECT USING (true);
CREATE POLICY "public_read_quiz_intro_options"    ON quiz_intro_options    FOR SELECT USING (true);
CREATE POLICY "public_read_quiz_questions"        ON quiz_questions        FOR SELECT USING (true);
CREATE POLICY "public_read_quiz_mcq_options"      ON quiz_mcq_options      FOR SELECT USING (true);
CREATE POLICY "public_read_quiz_word_order_opts"  ON quiz_word_order_options FOR SELECT USING (true);
CREATE POLICY "public_read_quiz_sub_questions"    ON quiz_sub_questions    FOR SELECT USING (true);
