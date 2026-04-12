import useScrollReveal from '../hooks/useScrollReveal';

export default function About() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2 className="section-title">Machine intelligence, product thinking, and strong engineering fundamentals.</h2>
      </div>
      <div className="glass-panel prose-panel">
        <p className="section-copy">
          I am a Virginia Tech M.Eng. candidate in Software and Machine Intelligence
          looking for software engineering roles where I can build reliable systems
          with real user impact. My work spans anomaly detection, test automation,
          UI development, and applied machine learning across enterprise and research
          environments.
        </p>
        <p className="section-copy">
          I enjoy translating complex technical problems into usable products, whether
          that means wiring telemetry into dashboards, building responsive Qt/QML
          interfaces, or turning raw sensor data into machine learning pipelines.
          My toolbox includes Python, PowerShell, C/C++, C#, JavaScript, PyTorch,
          TensorFlow, scikit-learn, OpenCV, Unity, and modern Git-based workflows.
        </p>
      </div>
    </section>
  );
}
