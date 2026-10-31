import { Component, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import useHashSection from './hooks/useHashSection';
import { useSound } from './hooks/useSound';
import SectionDock from './components/SectionDock';
import { SurfaceContext } from './components/Surface';
import { sectionById } from './data/sections';
import { placements } from './room/placements';
import { preloadSections, sectionContent } from './sectionContent';

const RoomCanvas = lazy(() => import('./room/RoomCanvas'));

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

class RoomBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Without WebGL the room can't render, so every section is a card that opens a sheet instead.
function FallbackSite({ activeId, onSelect, onClose }) {
  const reduceMotion = useReducedMotion();
  const Panel = activeId ? sectionContent[activeId] : null;
  // Sections that live on a device screen in the room keep that screen's look here too.
  const surface = (activeId && placements[activeId]?.device) || 'card';
  return (
    <div className="fallback">
      <header className="fallback-intro">
        <h1 className="room-sign-title">Benji's room</h1>
        <p className="room-sign-sub">Software engineer @ Microsoft. Pick a corner of the room to explore.</p>
      </header>
      <SectionDock activeId={activeId} onHover={() => {}} onSelect={onSelect} expanded />
      <AnimatePresence>
        {Panel && (
          <motion.aside
            key={activeId}
            className={`panel panel--${surface}`}
            aria-label="Section details"
            style={{ '--accent': sectionById[activeId].accent }}
            initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <SurfaceContext.Provider value={surface}>
              <Suspense fallback={<p className="device-loading">Loading…</p>}>
                <Panel onBack={onClose} />
              </Suspense>
            </SurfaceContext.Provider>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [activeId, open] = useHashSection();
  const [hoveredId, setHoveredId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [roomAvailable, setRoomAvailable] = useState(hasWebGL);
  const reduceMotion = useReducedMotion();
  const { play } = useSound();

  const select = useCallback(
    (id) => {
      play('select');
      setHoveredId(null);
      open(id);
    },
    [open, play]
  );
  const close = useCallback(() => open(null), [open]);
  const markLoaded = useCallback(() => {
    setLoaded(true);
    preloadSections();
  }, []);

  useEffect(() => {
    document.body.style.cursor = hoveredId && !activeId ? 'pointer' : '';
  }, [hoveredId, activeId]);

  // Escape always backs out to the room, even before a screen's own key handling is ready.
  useEffect(() => {
    if (!activeId) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, close]);

  if (!roomAvailable) {
    return <FallbackSite activeId={activeId} onSelect={select} onClose={close} />;
  }

  return (
    <main className="room-app">
      <RoomBoundary onFail={() => setRoomAvailable(false)}>
        <Suspense fallback={null}>
          <RoomCanvas
            hoveredId={hoveredId}
            activeId={activeId}
            onHover={setHoveredId}
            onSelect={select}
            onClose={close}
            reduceMotion={reduceMotion}
            onLoaded={markLoaded}
          />
        </Suspense>
      </RoomBoundary>
      {!loaded && (
        <div className="room-loader" role="status">
          Setting up the room…
        </div>
      )}
    </main>
  );
}
