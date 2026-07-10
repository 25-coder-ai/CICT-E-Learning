import { useState } from 'react';
import AppShell from './layouts/AppShell';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import VideoLectureUnit7 from './pages/VideoLectureUnit7';

export default function App() {
  const [mode, setMode] = useState('lesson'); // 'lesson' | 'quiz' | 'videoLecture'

  return (
    <>
      <AppShell
        quizMode={mode === 'quiz'}
        onOpenVideoLecture={() => setMode('videoLecture')}
      >
        {mode === 'lesson' ? (
          <LessonPage onNext={() => setMode('quiz')} />
        ) : (
          <QuizPage onBackToLesson={() => setMode('lesson')} />
        )}
      </AppShell>

      {mode === 'videoLecture' && (
        <VideoLectureUnit7 onBack={() => setMode('lesson')} />
      )}
    </>
  );
}
