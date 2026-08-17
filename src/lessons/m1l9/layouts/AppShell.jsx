import { useState } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import LeftNavigation from '../components/LeftNavigation';
import RightSidebar from '../components/RightSidebar';
import BottomProgress from '../components/BottomProgress';


export default function AppShell({ children, quizMode = false, onOpenVideoLecture }) {
  const bp = useBreakpoint();
  const isMobile = bp === 'mobile';
  const [activePanel, setActivePanel] = useState('kondukoottu');
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const handleNavSelectMobile = (id) => {
    setActivePanel(id);
    setShowMobilePanel(true);
  };

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial Unicode MS, Arial, sans-serif',
        background: quizMode
          ? 'linear-gradient(160deg,#dceeff,#f0f6ff)'
          : 'linear-gradient(to bottom,#c8daf5,#e8f0fc)',
      }}>
        {/* Horizontal nav tabs */}
        <LeftNavigation
          active={activePanel}
          onSelect={handleNavSelectMobile}
          horizontal
        />

        {/* Main content area */}
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {showMobilePanel ? (
            <div style={{ padding: '14px 16px' }}>
              <button
                onClick={() => setShowMobilePanel(false)}
                style={{
                  background: '#0d2a80', color: '#fff', border: 'none',
                  borderRadius: 4, padding: '6px 16px', marginBottom: 14,
                  cursor: 'pointer', fontSize: 13,
                  fontFamily: 'Arial Unicode MS, Arial, sans-serif',
                  fontWeight: 'bold',
                }}
              >
                ← பாடம்
              </button>
              <RightSidebar activePanel={activePanel} fullWidth onOpenVideoLecture={onOpenVideoLecture} />
            </div>
          ) : children}
        </div>

        <BottomProgress active={activePanel} compact />
      </div>
    );
  }

  /* ── Tablet layout ── */
  if (bp === 'tablet') {
    return (
      <div style={{
        width: '100%',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial Unicode MS, Arial, sans-serif',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <LeftNavigation active={activePanel} onSelect={setActivePanel} narrow />

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: quizMode
              ? 'linear-gradient(160deg,#dceeff 0%,#f0f6ff 60%,#ffffff 100%)'
              : 'linear-gradient(to bottom,#c8daf5 0%,#e8f0fc 40%,#ffffff 100%)',
            overflow: 'hidden',
          }}>
            {children}
          </div>

          <RightSidebar activePanel={activePanel} narrow onOpenVideoLecture={onOpenVideoLecture} />
        </div>
        <BottomProgress active={activePanel} />
      </div>
    );
  }

  /* ── Desktop layout (870×620, Flash-faithful) ── */
  return (
    <div style={{
      width: 870,
      height: 620,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
      border: '1px solid #444',
      borderRadius: 4,
      overflow: 'hidden',
      fontFamily: 'Arial Unicode MS, Arial, sans-serif',
    }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <LeftNavigation active={activePanel} onSelect={setActivePanel} />

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: quizMode
            ? 'linear-gradient(160deg,#dceeff 0%,#f0f6ff 60%,#ffffff 100%)'
            : 'linear-gradient(to bottom,#c8daf5 0%,#e8f0fc 40%,#ffffff 100%)',
          overflow: 'hidden',
        }}>
          {children}
        </div>

        <RightSidebar activePanel={activePanel} onOpenVideoLecture={onOpenVideoLecture} />
      </div>

      <BottomProgress active={activePanel} />
    </div>
  );
}
