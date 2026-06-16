import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { experience } from '../data/experience';
import {
  getExperienceMapStops,
  getExperienceMapSurface,
  getMapPathPoints,
} from '../data/experienceMapLayout';
import useMapDragPan from '../hooks/useMapDragPan';
import useMapParallaxScroll from '../hooks/useMapParallaxScroll';
import useScrollReveal from '../hooks/useScrollReveal';
import ExperienceMapDetail from './experience/ExperienceMapDetail';
import ExperienceMapNode from './experience/ExperienceMapNode';
import ExperienceMapPath from './experience/ExperienceMapPath';
import ExperienceMapTerrain from './experience/ExperienceMapTerrain';

const MOBILE_QUERY = '(max-width: 900px)';
const INTRO_PAN_KEY = 'experience-map-intro-panned';

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  );

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

export default function ExperienceMap({ sectionId = 'experience', items = experience }) {
  const { ref, isVisible } = useScrollReveal();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobileLayout();
  const viewportRef = useRef(null);
  const surfaceRef = useRef(null);
  const originRef = useRef(null);
  const stopRefs = useRef({});
  const lastFocusedRef = useRef(null);
  const dragRef = useMapDragPan(viewportRef);
  useMapParallaxScroll(viewportRef, surfaceRef);

  const mapInView = useInView(viewportRef, { once: true, amount: 0.35 });

  const [activeStopId, setActiveStopId] = useState(null);
  const [flashSegmentIndex, setFlashSegmentIndex] = useState(null);

  const mapData = useMemo(() => getExperienceMapStops(items, isMobile), [items, isMobile]);
  const surfaceSize = useMemo(() => getExperienceMapSurface(isMobile), [isMobile]);
  const pathPoints = useMemo(
    () => getMapPathPoints(mapData.origin, mapData.stops),
    [mapData.origin, mapData.stops]
  );

  const activeStopIndex = useMemo(() => {
    if (!activeStopId || activeStopId === 'origin') {
      return -1;
    }

    return mapData.stops.findIndex((stop) => stop.id === activeStopId);
  }, [activeStopId, mapData.stops]);

  const activeStop = useMemo(() => {
    if (!activeStopId) {
      return null;
    }

    if (activeStopId === 'origin') {
      return mapData.origin;
    }

    return mapData.stops.find((stop) => stop.id === activeStopId) ?? null;
  }, [activeStopId, mapData.origin, mapData.stops]);

  const activeAnchorRef = useMemo(() => {
    if (activeStopId === 'origin') {
      return originRef;
    }

    if (!activeStopId) {
      return { current: null };
    }

    return {
      get current() {
        return stopRefs.current[activeStopId] ?? null;
      },
    };
  }, [activeStopId]);

  const handleToggle = useCallback(
    (stopId, buttonRef) => {
      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }

      setActiveStopId((current) => {
        const next = current === stopId ? null : stopId;

        if (next && next !== 'origin') {
          const idx = mapData.stops.findIndex((stop) => stop.id === next);
          if (idx >= 0) {
            setFlashSegmentIndex(idx);
          }
        } else {
          setFlashSegmentIndex(null);
        }

        if (next) {
          lastFocusedRef.current = buttonRef?.current ?? null;
        }

        return next;
      });
    },
    [dragRef, mapData.stops]
  );

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setActiveStopId(null);
      setFlashSegmentIndex(null);
      lastFocusedRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (flashSegmentIndex === null) {
      return undefined;
    }

    const timer = window.setTimeout(() => setFlashSegmentIndex(null), 450);
    return () => window.clearTimeout(timer);
  }, [flashSegmentIndex]);

  useEffect(() => {
    if (!activeStopId) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest('.experience-map-detail')) {
        return;
      }

      if (target.closest('.experience-map-node-btn')) {
        return;
      }

      setActiveStopId(null);
      setFlashSegmentIndex(null);
      lastFocusedRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeStopId]);

  useEffect(() => {
    if (shouldReduceMotion || !mapInView || isMobile) {
      return undefined;
    }

    const viewport = viewportRef.current;
    const surface = surfaceRef.current;

    if (!viewport || !surface) {
      return undefined;
    }

    if (sessionStorage.getItem(INTRO_PAN_KEY)) {
      return undefined;
    }

    const maxScrollLeft = Math.max(0, surface.offsetWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, surface.offsetHeight - viewport.clientHeight);

    if (maxScrollLeft <= 0 && maxScrollTop <= 0) {
      sessionStorage.setItem(INTRO_PAN_KEY, 'true');
      return undefined;
    }

    const targetLeft = maxScrollLeft * 0.62;
    const targetTop = maxScrollTop * 0.88;
    const duration = 1400;
    let startTime = null;
    let frameId = null;

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min(1, (timestamp - startTime) / duration);
      const eased = 1 - (1 - progress) ** 3;

      viewport.scrollLeft = targetLeft * eased;
      viewport.scrollTop = targetTop * eased;

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    const startDelay = window.setTimeout(() => {
      frameId = requestAnimationFrame(step);
      sessionStorage.setItem(INTRO_PAN_KEY, 'true');
    }, 900);

    return () => {
      window.clearTimeout(startDelay);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [mapInView, shouldReduceMotion, isMobile]);

  useEffect(() => {
    if (isMobile || !mapInView) {
      return undefined;
    }

    const viewport = viewportRef.current;
    const surface = surfaceRef.current;

    if (!viewport || !surface) {
      return undefined;
    }

    const maxScrollTop = Math.max(0, surface.offsetHeight - viewport.clientHeight);
    if (maxScrollTop <= 0) {
      return undefined;
    }

    const applyDefaultPan = () => {
      viewport.scrollLeft = Math.max(0, surface.offsetWidth - viewport.clientWidth) * 0.62;
      viewport.scrollTop = maxScrollTop * 0.88;
    };

    if (shouldReduceMotion || sessionStorage.getItem(INTRO_PAN_KEY)) {
      applyDefaultPan();
      return undefined;
    }

    return undefined;
  }, [mapInView, isMobile, shouldReduceMotion, surfaceSize]);

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">Fast travel through my roles.</h2>
        <p className="experience-map-hint">Drag the map to explore.</p>
      </div>

      <div
        ref={viewportRef}
        className={`experience-map-viewport glass-panel glass-tier-2${shouldReduceMotion ? ' is-reduced-motion' : ''}`}
        role="application"
        aria-label="Experience map. Drag to pan."
      >
        <div
          ref={surfaceRef}
          className="experience-map-surface"
          style={{ width: surfaceSize.width, height: surfaceSize.height }}
        >
          <ExperienceMapTerrain activeStop={activeStop} />

          <ExperienceMapPath
            points={pathPoints}
            activeStopIndex={activeStopIndex}
            flashSegmentIndex={flashSegmentIndex}
            mapInView={mapInView}
          />

          <ExperienceMapNode
            ref={originRef}
            stop={mapData.origin}
            isOrigin
            nodeIndex={0}
            mapInView={mapInView}
            isActive={activeStopId === 'origin'}
            ariaControls={activeStopId === 'origin' ? 'experience-map-detail-origin' : undefined}
            onToggle={() => handleToggle('origin', originRef)}
          />

          {mapData.stops.map((stop, index) => (
            <ExperienceMapNode
              key={stop.id}
              ref={(node) => {
                stopRefs.current[stop.id] = node;
              }}
              stop={stop}
              nodeIndex={index + 1}
              mapInView={mapInView}
              isCurrent={stop.isCurrent}
              isActive={activeStopId === stop.id}
              ariaControls={
                activeStopId === stop.id ? `experience-map-detail-${stop.id}` : undefined
              }
              onToggle={() =>
                handleToggle(stop.id, {
                  get current() {
                    return stopRefs.current[stop.id] ?? null;
                  },
                })
              }
            />
          ))}

          <ExperienceMapDetail
            stop={activeStop}
            isOrigin={activeStopId === 'origin'}
            isOpen={Boolean(activeStopId)}
            anchorRef={activeAnchorRef}
            surfaceRef={surfaceRef}
            viewportRef={viewportRef}
          />
        </div>
        <div className="experience-map-vignette" aria-hidden="true" />
      </div>
    </section>
  );
}
