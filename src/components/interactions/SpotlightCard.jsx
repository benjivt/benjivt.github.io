export default function SpotlightCard({ children }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
    event.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
  };

  return (
    <div className="interaction-shell spotlight-shell" onMouseMove={handleMove}>
      <div className="spotlight-overlay" />
      {children}
    </div>
  );
}
