import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ENABLE_PROJECT_DETAILS } from '../config/features';
import { revealViewport } from '../utils/motionPresets';

const ORBIT_DURATION_MS = 62000;
const ORBIT_HOVER_SLOW_FACTOR = 4;
const STATIC_ORBIT_ANGLES = [270, 330, 30, 90, 150, 210];

function ProjectOrbitCard({
  project,
  isPinned,
  onHoverStart,
  onHoverEnd,
  onTogglePin,
}) {
  return (
    <div
      className={`project-orbit-card-shell${isPinned ? ' is-pinned' : ''}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={(event) => onTogglePin(event)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onTogglePin(event);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isPinned}
      aria-label={`${project.title}. ${isPinned ? 'Collapse' : 'Expand'} project details.`}
    >
      <article
        className="project-orbit-card-content"
        style={{ '--card-accent': project.accent }}
        aria-hidden={isPinned}
      >
        <div className="project-orbit-card-top">
          <p className="project-orbit-meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
          </p>
          <div className="project-orbit-display">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt=""
                className="project-orbit-thumbnail"
                loading="lazy"
                aria-hidden="true"
              />
            ) : (
              <div className="project-orbit-placeholder" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </div>
        <div className="project-orbit-card-bottom">
          <h3>{project.title}</h3>
        </div>
      </article>
      <div className="project-orbit-details">
        <p className="project-orbit-details-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </p>
        <h3 className="project-orbit-details-title">{project.title}</h3>
        <p className="project-orbit-summary">{project.summary}</p>
        <div className="project-orbit-tags">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {ENABLE_PROJECT_DETAILS ? (
          <Link
            to={`/project/${project.slug}`}
            state={{ scrollY: window.scrollY, fromSection: 'projects' }}
            className="project-orbit-details-link"
            onClick={(event) => event.stopPropagation()}
          >
            View project
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default function ProjectOrbit({ projects }) {
  const shouldReduceMotion = useReducedMotion();
  const orbitRef = useRef(null);
  const trackRef = useRef(null);
  const orbitOffsetRef = useRef(0);
  const hoveredIndexRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pinnedIndex, setPinnedIndex] = useState(null);
  const count = projects.length;

  const resetOrbit = useCallback(() => {
    setPinnedIndex(null);
    hoveredIndexRef.current = null;
    setHoveredIndex(null);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    let frameId = 0;
    let lastNow = performance.now();
    const slowDuration = ORBIT_DURATION_MS * ORBIT_HOVER_SLOW_FACTOR;

    const tick = (now) => {
      const duration = hoveredIndexRef.current !== null ? slowDuration : ORBIT_DURATION_MS;
      const delta = now - lastNow;
      lastNow = now;
      orbitOffsetRef.current = (orbitOffsetRef.current + (delta / duration) * 360) % 360;
      trackRef.current?.style.setProperty('--orbit-offset', `${orbitOffsetRef.current}deg`);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const node = orbitRef.current;
    if (!node) return undefined;

    const updateOrbitBounds = () => {
      const rect = node.getBoundingClientRect();
      const cardProbe = node.querySelector('.project-orbit-card-shell');
      const cardRect = cardProbe?.getBoundingClientRect();
      const cardW = cardRect?.width ?? 156;
      const cardH = cardRect?.height ?? 210;
      const isNarrow = rect.width <= 430;
      const inset = isNarrow ? 20 : 28;
      const popScale = isNarrow ? 1.06 : 1.1;

      const maxRx = Math.max(88, rect.width / 2 - (cardW * popScale) / 2 - inset);
      const maxRy = Math.max(64, rect.height / 2 - (cardH * popScale) / 2 - inset);

      node.style.setProperty('--orbit-rx-fit', `${maxRx}px`);
      node.style.setProperty('--orbit-ry-fit', `${maxRy}px`);
    };

    updateOrbitBounds();
    const observer = new ResizeObserver(updateOrbitBounds);
    observer.observe(node);
    window.addEventListener('resize', updateOrbitBounds);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateOrbitBounds);
    };
  }, [count]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Node)) return;

      if (orbitRef.current?.contains(event.target)) {
        const onCard =
          event.target instanceof Element && event.target.closest('.project-orbit-card-shell');
        if (!onCard) {
          resetOrbit();
        }
        return;
      }

      resetOrbit();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [resetOrbit]);

  useEffect(() => {
    const node = orbitRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          resetOrbit();
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [resetOrbit]);

  const handleHoverStart = (index) => {
    hoveredIndexRef.current = index;
    setHoveredIndex(index);
  };

  const handleHoverEnd = (index, event) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Element && nextTarget.closest('.project-orbit-card-shell')) {
      return;
    }

    hoveredIndexRef.current = null;
    setHoveredIndex((prev) => (prev === index ? null : prev));
  };

  const handleTogglePin = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setPinnedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      ref={orbitRef}
      className={`project-orbit${pinnedIndex !== null ? ' has-pinned' : ''}${hoveredIndex !== null ? ' has-hover' : ''}${shouldReduceMotion ? ' is-static' : ''}`}
      style={{ '--orbit-count': count }}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={revealViewport}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <div ref={trackRef} className="project-orbit-track">
        {projects.map((project, index) => {
          const baseAngle = shouldReduceMotion
            ? (STATIC_ORBIT_ANGLES[index] ?? (360 / count) * index)
            : (360 / count) * index;
          const isPinned = pinnedIndex === index;

          return (
            <div
              key={project.slug}
              className={`project-orbit-slot${isPinned ? ' is-pinned' : ''}${hoveredIndex === index ? ' is-hovered' : ''}`}
              style={{ '--orbit-base-angle': `${baseAngle}deg`, '--orbit-i': index }}
            >
              <div className="project-orbit-card-anchor">
                <div className="project-orbit-pop">
                  <ProjectOrbitCard
                    project={project}
                    isPinned={isPinned}
                    onHoverStart={() => handleHoverStart(index)}
                    onHoverEnd={(event) => handleHoverEnd(index, event)}
                    onTogglePin={(event) => handleTogglePin(index, event)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
