export default function FlipCard({ front, back }) {
  return (
    <div className="interaction-shell flip-shell">
      <div className="flip-inner">
        <div className="flip-face flip-front">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}
