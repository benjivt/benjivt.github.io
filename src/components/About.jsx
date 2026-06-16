import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { aboutTimeline } from '../data/aboutTimeline';
import { ENABLE_PROJECT_DETAILS } from '../config/features';
import useScrollReveal from '../hooks/useScrollReveal';
import AboutTimelineThumb from './AboutTimelineThumb';
import {
  getMetaRevealVariants,
  revealEnter,
  revealExit,
  revealEase,
  revealViewport,
} from '../utils/motionPresets';

const detailEnter = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };
const detailExit = { duration: 0.14, ease: [0.4, 0, 1, 1] };
const itemRevealEnter = revealEnter;
const itemRevealExit = revealExit;
const itemRevealEase = revealEase;
const itemRevealViewport = revealViewport;

const aboutThumbRevealVariants = {
  hidden: {
    opacity: 0.78,
    scale: 0.92,
    transition: revealExit,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...revealEnter, delay: 0.1 },
  },
};

function getAboutMetaRevealVariants(fromLeft) {
  const base = getMetaRevealVariants(fromLeft);
  return {
    hidden: { ...base.hidden, opacity: 0.78 },
    visible: base.visible,
  };
}

function AboutHistoryScene({ entry }) {
  if (entry.sceneImages?.length) {
    return (
      <div className="about-history-detail-scene about-history-detail-scene-grid" aria-hidden="true">
        {entry.sceneImages.map((scene) => (
          <img
            key={scene.alt}
            src={scene.image}
            alt=""
            className="about-history-detail-scene-image"
          />
        ))}
      </div>
    );
  }

  if (entry.sceneImage) {
    return (
      <div className="about-history-detail-scene" aria-hidden="true">
        <img src={entry.sceneImage} alt="" className="about-history-detail-scene-image" />
      </div>
    );
  }

  return null;
}

function AboutHistorySpine({ containerRef, nodeRefs, shouldReduceMotion }) {
  const [dotRatio, setDotRatio] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'end 0.12'],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    let frame = 0;

    const updateDot = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          return;
        }

        const containerRect = container.getBoundingClientRect();
        const spineTop = containerRect.top + 36;
        const spineBottom = containerRect.bottom - 36;
        const spineHeight = spineBottom - spineTop;

        if (spineHeight <= 0) {
          return;
        }

        const viewportCenter = window.innerHeight * 0.45;
        let closestCenter = spineTop;
        let closestDistance = Infinity;

        nodeRefs.current.forEach((node) => {
          if (!node) {
            return;
          }

          const rect = node.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(center - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestCenter = center;
          }
        });

        const ratio = Math.min(1, Math.max(0, (closestCenter - spineTop) / spineHeight));
        setDotRatio(ratio);
      });
    };

    updateDot();
    window.addEventListener('scroll', updateDot, { passive: true });
    window.addEventListener('resize', updateDot);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateDot);
      window.removeEventListener('resize', updateDot);
    };
  }, [containerRef, nodeRefs, shouldReduceMotion]);

  return (
    <div className="about-history-spine-wrap" aria-hidden="true">
      <div className="about-history-spine about-history-spine-track" />
      <motion.div
        className="about-history-spine about-history-spine-progress"
        style={{
          scaleY: shouldReduceMotion ? 1 : progressScale,
          transformOrigin: 'top center',
        }}
      />
      {!shouldReduceMotion ? (
        <span
          className="about-history-spine-dot"
          style={{ top: `${dotRatio * 100}%` }}
        />
      ) : null}
    </div>
  );
}

function AboutHistoryMeta({ entry, align, shouldReduceMotion }) {
  const fromLeft = align === 'left';

  return (
    <motion.div
      className="about-history-meta"
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={itemRevealViewport}
      variants={getAboutMetaRevealVariants(fromLeft)}
    >
      <p className="about-history-date">{entry.date}</p>
      <h4 className="about-history-title">{entry.title}</h4>
    </motion.div>
  );
}

function AboutHistoryDetail({ entry, isActive, slideFrom, shouldReduceMotion }) {
  const slideIn = slideFrom === 'start' ? -8 : 8;
  const slideOut = slideFrom === 'start' ? -6 : 6;
  const isProject = entry.kind === 'project';
  const kindLabel = isProject ? 'Project' : 'Chapter';
  const projectHref = entry.projectSlug
    ? ENABLE_PROJECT_DETAILS
      ? `/project/${entry.projectSlug}`
      : '/#projects'
    : null;

  return (
    <AnimatePresence initial={false}>
      {isActive ? (
        <motion.div
          key={`detail-${entry.id}`}
          className="about-history-detail-slot"
          initial={shouldReduceMotion ? false : { opacity: 0, x: slideIn }}
          animate={{ opacity: 1, x: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, x: slideOut, transition: detailExit }
          }
          transition={shouldReduceMotion ? { duration: 0 } : detailEnter}
        >
          <div
            id={`about-history-detail-${entry.id}`}
            role="region"
            aria-labelledby={`about-history-detail-title-${entry.id}`}
            className="about-history-detail glass-panel glass-tier-2 is-chapter-open"
            style={entry.accent ? { '--journey-accent': entry.accent } : undefined}
          >
            <AboutHistoryScene entry={entry} />
            <div className="about-history-detail-inner">
              <p className="about-history-detail-kind">{kindLabel}</p>
              <p className="about-history-detail-date">{entry.date}</p>
              <h5 id={`about-history-detail-title-${entry.id}`} className="about-history-detail-title">
                {entry.title}
              </h5>
              {entry.summary ? (
                <p className="about-history-detail-summary">{entry.summary}</p>
              ) : null}
              {entry.reflection ? (
                <p className="about-history-detail-reflection">{entry.reflection}</p>
              ) : null}
              {entry.details ? (
                <p className="about-history-detail-body">{entry.details}</p>
              ) : null}
              {isProject && projectHref ? (
                ENABLE_PROJECT_DETAILS ? (
                  <Link to={projectHref} className="about-history-detail-link">
                    View project →
                  </Link>
                ) : (
                  <a href={projectHref} className="about-history-detail-link">
                    View project →
                  </a>
                )
              ) : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AboutHistoryTimeline({ entries }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(null);
  const timelineRef = useRef(null);
  const nodeRefs = useRef([]);

  nodeRefs.current = entries.map((_, index) => nodeRefs.current[index] ?? null);

  const handleToggle = (entryId) => {
    setActiveId((current) => (current === entryId ? null : entryId));
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setActiveId(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!activeId) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest('.about-history-detail')) {
        return;
      }

      if (target.closest('.about-history-thumb-btn')) {
        return;
      }

      setActiveId(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeId]);

  return (
    <div className="about-history" role="list" ref={timelineRef}>
      <AboutHistorySpine
        containerRef={timelineRef}
        nodeRefs={nodeRefs}
        shouldReduceMotion={shouldReduceMotion}
      />
      {entries.map((entry, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const isActive = entry.id === activeId;

        return (
          <article
            key={entry.id}
            role="listitem"
            className={`about-history-item is-${side}${entry.kind === 'project' ? ' is-project' : ''}${isActive ? ' is-active' : ''}`}
            style={entry.accent ? { '--journey-accent': entry.accent } : undefined}
          >
            <div className="about-history-row">
              <div className="about-history-side about-history-side-start">
                {side === 'left' ? (
                  <AboutHistoryMeta
                    entry={entry}
                    align="left"
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ) : (
                  <AboutHistoryDetail
                    entry={entry}
                    isActive={isActive}
                    slideFrom="start"
                    shouldReduceMotion={shouldReduceMotion}
                  />
                )}
              </div>

              <motion.div
                ref={(node) => {
                  nodeRefs.current[index] = node;
                }}
                className="about-history-node"
                initial={shouldReduceMotion ? false : 'hidden'}
                whileInView={shouldReduceMotion ? undefined : 'visible'}
                viewport={itemRevealViewport}
                variants={aboutThumbRevealVariants}
              >
                <button
                  type="button"
                  className="about-history-thumb-btn"
                  onClick={() => handleToggle(entry.id)}
                  aria-expanded={isActive}
                  aria-controls={`about-history-detail-${entry.id}`}
                  aria-label={`${entry.title}, ${entry.date}`}
                >
                  <AboutTimelineThumb
                    image={entry.image}
                    imageAlt={entry.imageAlt}
                    title={entry.title}
                    variant={entry.imageVariant}
                    scale={entry.imageScale}
                  />
                </button>
              </motion.div>

              <div className="about-history-side about-history-side-end">
                {side === 'right' ? (
                  <AboutHistoryMeta
                    entry={entry}
                    align="right"
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ) : (
                  <AboutHistoryDetail
                    entry={entry}
                    isActive={isActive}
                    slideFrom="end"
                    shouldReduceMotion={shouldReduceMotion}
                  />
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function About({ sectionId = 'about' }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <p className="section-copy about-bio">
          I&apos;m a double Hokie — M.Eng. Summa Cum Laude, B.S. Magna Cum Laude. The last few
          years have been research at the Hume Center, building product interfaces at Automation
          Creations, and two Microsoft internships. I like work where you build something real and
          people actually use it.
        </p>
        <h3 className="about-journey-title">My journey.</h3>
      </div>
      <AboutHistoryTimeline entries={aboutTimeline} />
    </section>
  );
}
