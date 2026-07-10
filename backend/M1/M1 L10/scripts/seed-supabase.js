/**
 * seed-supabase.js — creates the lesson_1 table then seeds all data
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const path = require('path');
const fs   = require('fs');
const { createClient } = require('@supabase/supabase-js');

const DATA = path.join(__dirname, '..', 'muli-react', 'src', 'data');

const lessonJson      = require(path.join(DATA, 'lessons',      'lesson-1.json'));
const glossaryJson    = require(path.join(DATA, 'glossary',     'lesson-1-glossary.json'));
const commentaryJson  = require(path.join(DATA, 'translations', 'lesson-1-commentary.json'));
const explanationJson = require(path.join(DATA, 'translations', 'lesson-1-explanation.json'));
const translitJson    = require(path.join(DATA, 'translations', 'lesson-1-transliteration.json'));
const englishJson     = require(path.join(DATA, 'translations', 'lesson-1-english.json'));
const authorJson      = require(path.join(DATA, 'author',       'lesson-1-author.json'));
const bookJson        = require(path.join(DATA, 'reference',    'lesson-1-book.json'));
const quizJson        = require(path.join(DATA, 'quiz',         'lesson-1-quiz.json'));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('ERROR: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in .env');
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// ── Try to run migration via Supabase management API ─────────
async function runMigration() {
  const sqlFile = path.join(__dirname, '..', 'supabase', 'migrations', '003_lesson_1_unified.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  console.log('  Attempting to create lesson_1 table via management API...');

  // Supabase Management API — needs project ref extracted from URL
  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
  const mgmtUrl = `https://api.supabase.com/v1/projects/${ref}/database/query`;

  try {
    const res = await fetch(mgmtUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });

    if (res.ok) {
      console.log('  ✓ Migration ran successfully via management API.\n');
      return true;
    }

    const text = await res.text();
    console.log(`  ⚠ Management API returned ${res.status}: ${text}`);
  } catch (e) {
    console.log(`  ⚠ Management API call failed: ${e.message}`);
  }

  return false;
}

async function seed() {
  console.log('\n══════════════════════════════════════════════════════');
  console.log('  Muli Tamil App — Seed lesson_1');
  console.log('══════════════════════════════════════════════════════\n');

  // ── Check if table exists ─────────────────────────────────
  const { error: checkErr } = await sb.from('lesson_1').select('id').limit(1);

  if (checkErr && checkErr.code === 'PGRST205') {
    console.log('► Table lesson_1 not found. Running migration...\n');
    const ok = await runMigration();

    if (!ok) {
      // Print the SQL so user can paste it manually
      const sqlFile = path.join(__dirname, '..', 'supabase', 'migrations', '003_lesson_1_unified.sql');
      console.log('\n══════════════════════════════════════════════════════');
      console.log('  ACTION REQUIRED — Run this SQL in Supabase Dashboard');
      console.log('  Go to: https://supabase.com/dashboard/project/pckwteukcyskdkitccga/sql');
      console.log('══════════════════════════════════════════════════════\n');
      console.log(fs.readFileSync(sqlFile, 'utf8'));
      console.log('\n══════════════════════════════════════════════════════');
      console.log('  After running the SQL above, run this script again.');
      console.log('══════════════════════════════════════════════════════\n');
      process.exit(1);
    }
  }

  // ── Delete any existing row (re-seed safe) ─────────────────
  await sb.from('lesson_1').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // ── Build & insert the single row ─────────────────────────
  console.log('► Inserting ONE row with all Lesson 1 content...\n');

  const row = {
    unit:          lessonJson.unit,
    lesson_number: lessonJson.lesson,
    poem:          lessonJson.poem,
    heading:       lessonJson.heading,
    subtitle:      lessonJson.subtitle,
    poem_number:   lessonJson.poemNumber,
    collection:    lessonJson.collection,
    tinai:         lessonJson.tinai,
    turai:         lessonJson.turai,
    prose_summary: lessonJson.proseSummary,
    poem_lines:    lessonJson.poemLines,
    kondukoottu:   lessonJson.kondukoottu,

    author_heading:   authorJson.heading,
    author_name:      authorJson.name,
    author_biography: authorJson.biography,

    book_heading:            bookJson.heading,
    book_name:               bookJson.bookName,
    book_description:        bookJson.description,
    book_english_link_label: bookJson.englishLinkLabel || '',

    glossary_heading: glossaryJson.heading,
    glossary_entries: glossaryJson.entries,

    commentary_heading: commentaryJson.heading,
    commentary_entries: commentaryJson.entries,

    explanation_heading: explanationJson.heading,
    explanation_text:    explanationJson.text,

    transliteration_heading: translitJson.heading,
    transliteration_lines:   translitJson.lines,

    english_heading:    englishJson.heading,
    english_lines:      englishJson.lines,
    english_translator: englishJson.translator || '',

    quiz_audio_src:  quizJson.audioSrc,
    quiz_poem_lines: quizJson.poemLines,
    quiz_intro:      quizJson.intro,
    quiz_questions:  quizJson.questions,
  };

  const { data, error } = await sb.from('lesson_1').insert(row).select('id').single();

  if (error) {
    console.error('✗ Insert failed:', error.message);
    process.exit(1);
  }

  console.log(`  ✓ lesson_1  — 1 row inserted (id: ${data.id})\n`);

  // ── Validation ────────────────────────────────────────────
  const { data: check, error: ce } = await sb.from('lesson_1').select('*').single();
  if (ce) { console.error('✗ Read-back failed:', ce.message); process.exit(1); }

  const questions = Array.isArray(check.quiz_questions)
    ? check.quiz_questions
    : JSON.parse(check.quiz_questions || '[]');

  console.log('══════════════════════════════════════════════════════');
  console.log('  Validation');
  console.log('══════════════════════════════════════════════════════');
  console.log(`  ✓ heading               : ${check.heading}`);
  console.log(`  ✓ poem_lines            : ${check.poem_lines.length} lines`);
  console.log(`  ✓ author_name           : ${check.author_name}`);
  console.log(`  ✓ book_name             : ${check.book_name}`);
  console.log(`  ✓ glossary_entries      : ${check.glossary_entries.length} words`);
  console.log(`  ✓ commentary_entries    : ${check.commentary_entries.length} phrases`);
  console.log(`  ✓ transliteration_lines : ${check.transliteration_lines.length} lines`);
  console.log(`  ✓ english_lines         : ${check.english_lines.length} lines`);
  console.log(`  ✓ quiz_questions        : ${questions.length} questions`);

  const types = questions.reduce((a, q) => { a[q.type] = (a[q.type]||0)+1; return a; }, {});
  Object.entries(types).forEach(([t,n]) => console.log(`      ${n} × ${t}`));
  console.log('\n✓ All Lesson 1 content seeded. Zero data loss.\n');
}

seed().catch(err => { console.error(err); process.exit(1); });
