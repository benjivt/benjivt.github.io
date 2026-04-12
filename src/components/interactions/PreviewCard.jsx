export default function PreviewCard({ children }) {
  return (
    <div className="interaction-shell preview-shell">
      <div className="preview-scanline" />
      <div className="preview-noise" />
      {children}
    </div>
  );
}
