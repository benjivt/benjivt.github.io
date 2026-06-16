import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  experienceMapDetailContainerVariants,
  experienceMapDetailItemVariants,
} from '../../utils/motionPresets';
import { clampPopupPosition, ensureVisibleInMap } from './clampPopupPosition';
import ExperienceMapDetailQuote from './ExperienceMapDetailQuote';

const detailEnter = { duration: 0.22, ease: [0.22, 1, 0.36, 1] };
const detailExit = { duration: 0.14, ease: [0.4, 0, 1, 1] };

function MapPinIcon() {
  return (
    <svg
      className="experience-map-detail-pin-icon"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

export default function ExperienceMapDetail({
  stop,
  isOrigin = false,
  isOpen,
  anchorRef,
  surfaceRef,
  viewportRef,
}) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [quoteExpanded, setQuoteExpanded] = useState(false);

  useEffect(() => {
    setQuoteExpanded(false);
  }, [stop?.id]);

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef?.current || !surfaceRef?.current) {
      setPosition(null);
      return undefined;
    }

    const updatePosition = () => {
      const anchor = anchorRef.current;
      const surface = surfaceRef.current;
      const panel = panelRef.current;

      if (!anchor || !surface) {
        return;
      }

      const popupWidth = panel?.offsetWidth || 288;
      const popupHeight = panel?.offsetHeight || 220;

      const nextPosition = clampPopupPosition({
        anchorElement: anchor,
        surfaceElement: surface,
        popupWidth,
        popupHeight,
      });

      if (nextPosition) {
        setPosition(nextPosition);
      }

      requestAnimationFrame(() => {
        ensureVisibleInMap(viewportRef?.current, [anchor, panelRef.current]);
      });
    };

    updatePosition();

    const viewport = viewportRef?.current;
    viewport?.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      viewport?.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [anchorRef, isOpen, quoteExpanded, stop?.id, surfaceRef, viewportRef]);

  const kindLabel = isOrigin ? 'Origin' : stop?.isCurrent ? 'Current stop' : 'Waypoint';
  const detailId = `experience-map-detail-${stop?.id ?? 'origin'}`;

  return (
    <AnimatePresence initial={false}>
      {isOpen && stop ? (
        <motion.div
          key={detailId}
          ref={panelRef}
          className="experience-map-detail-slot"
          style={
            position
              ? {
                  left: `${position.left}px`,
                  top: `${position.top}px`,
                }
              : { visibility: 'hidden' }
          }
          initial={shouldReduceMotion ? false : { opacity: 0, y: position?.placement === 'below' ? -8 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? undefined
              : { opacity: 0, y: position?.placement === 'below' ? -6 : 6, transition: detailExit }
          }
          transition={shouldReduceMotion ? { duration: 0 } : detailEnter}
        >
          <div
            id={detailId}
            role="region"
            aria-labelledby={`${detailId}-title`}
            className={`experience-map-detail glass-panel glass-tier-2 is-chapter-open${shouldReduceMotion ? '' : ' is-scene-animated'}`}
            style={stop.accent ? { '--journey-accent': stop.accent } : undefined}
          >
            <div className="experience-map-detail-scene" aria-hidden="true">
              {stop.logo ? (
                <img src={stop.logo} alt="" className="experience-map-detail-scene-logo" />
              ) : null}
            </div>
            <motion.div
              className="experience-map-detail-inner"
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={experienceMapDetailContainerVariants}
            >
              <motion.p className="experience-map-detail-kind" variants={experienceMapDetailItemVariants}>
                {kindLabel}
              </motion.p>
              {!isOrigin ? (
                <>
                  <motion.p className="experience-map-detail-date" variants={experienceMapDetailItemVariants}>
                    {stop.range}
                  </motion.p>
                  <motion.p className="experience-map-detail-location" variants={experienceMapDetailItemVariants}>
                    <MapPinIcon />
                    <span>{stop.location}</span>
                  </motion.p>
                </>
              ) : (
                <motion.p className="experience-map-detail-date" variants={experienceMapDetailItemVariants}>
                  {stop.sublabel}
                </motion.p>
              )}
              <motion.h5
                id={`${detailId}-title`}
                className="experience-map-detail-title"
                variants={experienceMapDetailItemVariants}
              >
                {isOrigin ? stop.label : stop.title}
              </motion.h5>
              {!isOrigin ? (
                <motion.p className="experience-map-detail-company" variants={experienceMapDetailItemVariants}>
                  {stop.company}
                </motion.p>
              ) : null}
              <motion.p className="experience-map-detail-summary" variants={experienceMapDetailItemVariants}>
                {isOrigin ? stop.summary : stop.details ?? stop.summary}
              </motion.p>
              {!isOrigin && stop.quote ? (
                <ExperienceMapDetailQuote
                  quote={stop.quote}
                  detailId={detailId}
                  expanded={quoteExpanded}
                  onExpandedChange={setQuoteExpanded}
                />
              ) : null}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
