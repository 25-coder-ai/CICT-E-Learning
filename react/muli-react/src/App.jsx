import { useState } from 'react';
import AppShell from './layouts/AppShell';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  const [mode, setMode] = useState('lesson'); // 'lesson' | 'quiz'

  return (
    <AppShell quizMode={mode === 'quiz'}>
      {mode === 'lesson' ? (
        <LessonPage onNext={() => setMode('quiz')} />
      ) : (
        <QuizPage onBackToLesson={() => setMode('lesson')} />
      )}
    </AppShell>
  );
}
