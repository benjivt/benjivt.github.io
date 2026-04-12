import { useState } from 'react';

export default function Tilt3D({ children }) {
  const [style, setStyle] = useState({});

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const rotateY = ((offsetX / rect.width) - 0.5) * 16;
    const rotateX = (((offsetY / rect.height) - 0.5) * -16);

    setStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
    });
  };

  return (
    <div
      className="interaction-shell tilt-shell"
      onMouseMove={handleMove}
      onMouseLeave={() => setStyle({})}
      style={style}
    >
      {children}
    </div>
  );
}
