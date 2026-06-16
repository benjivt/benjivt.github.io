import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  getExperienceMapLabelVariants,
  getExperienceMapPinVariants,
} from '../../utils/motionPresets';

const ExperienceMapNode = forwardRef(function ExperienceMapNode(
  {
    stop,
    isActive,
    isCurrent = false,
    isOrigin = false,
    nodeIndex = 0,
    mapInView = false,
    onToggle,
    ariaControls,
  },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  const label = isOrigin ? stop.label : stop.shortLabel ?? stop.company;
  const ariaLabel = isOrigin
    ? `${stop.label}, ${stop.sublabel}`
    : `${stop.title}, ${stop.company}, ${stop.range}, ${stop.location}`;

  const motionState = shouldReduceMotion || mapInView ? 'visible' : 'hidden';

  return (
    <motion.div
      className={`experience-map-node${isActive ? ' is-active' : ''}${isCurrent ? ' is-current' : ''}${isOrigin ? ' is-origin' : ''}`}
      style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate={motionState}
      variants={getExperienceMapPinVariants(nodeIndex)}
    >
      <button
        ref={ref}
        type="button"
        className="experience-map-node-btn"
        onClick={onToggle}
        aria-expanded={isActive}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
        style={stop.accent ? { '--journey-accent': stop.accent } : undefined}
      >
        <span className="experience-map-node-pin" aria-hidden="true">
          <span className="experience-map-node-ring" />
          <span className="experience-map-node-logo-shell">
            {stop.logo ? (
              <img
                src={stop.logo}
                alt=""
                className="experience-map-node-logo"
                style={{ transform: `scale(${stop.logoScale ?? 1})` }}
              />
            ) : null}
          </span>
        </span>
      </button>
      <motion.p
        className="experience-map-node-label"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={motionState}
        variants={getExperienceMapLabelVariants(nodeIndex)}
      >
        {label}
      </motion.p>
      {isOrigin && stop.sublabel ? (
        <motion.p
          className="experience-map-node-sublabel"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate={motionState}
          variants={getExperienceMapLabelVariants(nodeIndex)}
        >
          {stop.sublabel}
        </motion.p>
      ) : null}
    </motion.div>
  );
});

export default ExperienceMapNode;
