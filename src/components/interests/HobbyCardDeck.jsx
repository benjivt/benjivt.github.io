import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { hobbiesContent } from '../../data/hobbiesContent';
import { hobbyImages } from '../../data/hobbiesAssets';
import { revealViewport } from '../../utils/motionPresets';
import { HobbyIcon } from './InterestIcons';
import { getFanVars } from './hobbyDeckFan';

function isAdjacentToFocus(index, focusIndex) {
  return focusIndex !== null && Math.abs(index - focusIndex) === 1;
}

function HobbyDeckCard({
  hobby,
  index,
  count,
  focusIndex,
  isPinned,
  onToggle,
  onHoverStart,
  onHoverEnd,
}) {
  const image = hobbyImages[hobby.imageKey];
  const offset = index - (count - 1) / 2;
  const isActive = focusIndex === index;
  const isAdjacent = isAdjacentToFocus(index, focusIndex);

  return (
    <article
      className={`hobby-deck-card hobby-photo-card${isPinned ? ' is-pinned' : ''}${isActive ? ' is-active' : ''}${isAdjacent ? ' is-adjacent' : ''}`}
      style={{
        '--deck-i': index,
        '--deck-offset': offset,
        '--deck-lift': Math.abs(offset) * 0.18,
        ...getFanVars(index, focusIndex),
      }}
      tabIndex={0}
      aria-expanded={isActive}
      onMouseEnter={() => onHoverStart(index)}
      onMouseLeave={(event) => onHoverEnd(index, event)}
      onClick={(event) => {
        event.stopPropagation();
        onToggle(hobby.id);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onToggle(hobby.id);
        }
      }}
    >
      <div className="hobby-deck-card-shell">
        <div className="hobby-photo-media">
          <img src={image} alt="" loading="lazy" aria-hidden="true" />
          <span className="hobby-photo-overlay" aria-hidden="true" />
          <span className="hobby-photo-label">{hobby.title}</span>
          <span className="hobby-photo-icon">
            <HobbyIcon id={hobby.id} />
          </span>
        </div>
        <div className="hobby-photo-body">
          <h3>{hobby.title}</h3>
          <p>{hobby.blurb}</p>
        </div>
      </div>
    </article>
  );
}

export default function HobbyCardDeck() {
  const shouldReduceMotion = useReducedMotion();
  const deckRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const count = hobbiesContent.length;

  const activeIndex = useMemo(() => {
    if (!activeId) return null;
    const index = hobbiesContent.findIndex((hobby) => hobby.id === activeId);
    return index === -1 ? null : index;
  }, [activeId]);

  const focusIndex = activeIndex ?? hoveredIndex;

  const resetDeck = useCallback(() => {
    setActiveId(null);
    setHoveredIndex(null);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Node)) return;

      if (deckRef.current?.contains(event.target)) {
        const onCard = event.target instanceof Element && event.target.closest('.hobby-deck-card');
        if (!onCard) {
          resetDeck();
        }
        return;
      }

      resetDeck();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [resetDeck]);

  useEffect(() => {
    const node = deckRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          resetDeck();
        }
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [resetDeck]);

  const handleToggle = (id) => {
    setActiveId((prev) => {
      if (prev === id) {
        setHoveredIndex(null);
        return null;
      }
      return id;
    });
  };

  const handleHoverStart = (index) => {
    setHoveredIndex(index);
  };

  const handleHoverEnd = (index, event) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Element && nextTarget.closest('.hobby-deck-card')) {
      return;
    }

    setHoveredIndex((prev) => (prev === index ? null : prev));
  };

  return (
    <motion.div
      ref={deckRef}
      className={`hobby-deck${focusIndex !== null ? ' has-focus' : ''}${activeId ? ' has-pinned' : ''}`}
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
      <div className="hobby-deck-scroll">
        <div
          className={`hobby-deck-inner${focusIndex !== null ? ' is-fanned' : ''}`}
          style={{ '--deck-count': count, '--deck-focus': focusIndex ?? -1 }}
        >
          {hobbiesContent.map((hobby, index) => (
            <HobbyDeckCard
              key={hobby.id}
              hobby={hobby}
              index={index}
              count={count}
              focusIndex={focusIndex}
              isPinned={activeId === hobby.id}
              onToggle={handleToggle}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
