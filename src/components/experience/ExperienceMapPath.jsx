import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  experienceMapPathDrawDuration,
  experienceMapPathStaggerMs,
} from '../../utils/motionPresets';

function buildSegments(points) {
  if (points.length < 2) {
    return [];
  }

  return points.slice(0, -1).map((point, index) => ({
    id: `${point.x}-${point.y}-${index}`,
    d: `M ${point.x} ${point.y} L ${points[index + 1].x} ${points[index + 1].y}`,
    index,
  }));
}

function buildTravelKeyframes(points) {
  if (points.length < 2) {
    return null;
  }

  const count = points.length;
  const times = points.map((_, index) => index / (count - 1));

  return {
    cx: points.map((point) => point.x),
    cy: points.map((point) => point.y),
    opacity: points.map((_, index) => (index === 0 || index === count - 1 ? 0.85 : 1)),
    times,
  };
}

export default function ExperienceMapPath({
  points,
  activeStopIndex = -1,
  flashSegmentIndex = null,
  mapInView = false,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();
  const segments = useMemo(() => buildSegments(points), [points]);
  const travelKeyframes = useMemo(() => buildTravelKeyframes(points), [points]);
  const [drawComplete, setDrawComplete] = useState(() => shouldReduceMotion && mapInView);

  useEffect(() => {
    if (!mapInView) {
      setDrawComplete(false);
      return undefined;
    }

    if (shouldReduceMotion) {
      setDrawComplete(true);
      return undefined;
    }

    const totalMs =
      segments.length * experienceMapPathStaggerMs + experienceMapPathDrawDuration * 1000 + 80;

    const timer = window.setTimeout(() => setDrawComplete(true), totalMs);
    return () => window.clearTimeout(timer);
  }, [mapInView, shouldReduceMotion, segments.length]);

  const svgClassName = [
    'experience-map-path-svg',
    mapInView ? 'is-visible' : '',
    mapInView && !drawComplete && !shouldReduceMotion ? 'is-drawing' : '',
    drawComplete ? 'is-drawn' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!segments.length) {
    return null;
  }

  return (
    <svg
      className={svgClassName}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {segments.map((segment) => {
        const isActive = activeStopIndex >= 0 && segment.index <= activeStopIndex;
        const isFlash = flashSegmentIndex === segment.index;

        return (
          <path
            key={segment.id}
            className={`experience-map-path-segment${isActive ? ' is-active' : ''}${isFlash ? ' is-flash' : ''}`}
            d={segment.d}
            fill="none"
            style={{ '--segment-draw-delay': `${segment.index * experienceMapPathStaggerMs}ms` }}
          />
        );
      })}

      {!shouldReduceMotion && travelKeyframes && drawComplete && mapInView ? (
        <motion.circle
          className="experience-map-travel-dot"
          r={0.85}
          fill="rgba(214, 187, 255, 0.95)"
          initial={{
            cx: travelKeyframes.cx[0],
            cy: travelKeyframes.cy[0],
            opacity: 0,
          }}
          animate={{
            cx: travelKeyframes.cx,
            cy: travelKeyframes.cy,
            opacity: travelKeyframes.opacity,
          }}
          transition={{
            duration: 2.4,
            delay: 0.1,
            times: travelKeyframes.times,
            ease: 'linear',
          }}
        />
      ) : null}
    </svg>
  );
}
