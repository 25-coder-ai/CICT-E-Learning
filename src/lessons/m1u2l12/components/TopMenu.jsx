export default function TopMenu() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '2px 8px',
        backgroundColor: '#d4d0c8',
        borderBottom: '1px solid #888',
        height: 22,
        fontSize: 12,
        fontFamily: 'Arial, sans-serif',
        flexShrink: 0,
      }}
    >
      {['File', 'View', 'Control', 'Help'].map((item) => (
        <span
          key={item}
          style={{ cursor: 'default', userSelect: 'none', color: '#000' }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
