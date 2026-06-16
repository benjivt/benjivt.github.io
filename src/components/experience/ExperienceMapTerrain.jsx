import { useReducedMotion } from 'framer-motion';
import { terrainContours, terrainRegions } from '../../data/experienceMapTerrain';

export default function ExperienceMapTerrain({ activeStop }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`experience-map-terrain${shouldReduceMotion ? ' is-reduced-motion' : ''}`}
      aria-hidden="true"
    >
      <div className="experience-map-terrain-plate" />

      <div
        className="experience-map-terrain-layer experience-map-terrain-layer--depth"
        style={{ '--parallax-depth': 0.36 }}
      >
        <svg
          className="experience-map-terrain-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="experience-map-region-soften"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="3.2" />
            </filter>
          </defs>
          <g className="experience-map-terrain-regions" filter="url(#experience-map-region-soften)">
            {terrainRegions.map((region) => (
              <ellipse
                key={region.id}
                cx={region.cx}
                cy={region.cy}
                rx={region.rx}
                ry={region.ry}
                fill={`rgba(${region.rgb}, ${region.opacity})`}
              />
            ))}
          </g>
          <g className="experience-map-terrain-contours">
            {terrainContours.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </svg>
      </div>

      <div
        className="experience-map-terrain-layer experience-map-terrain-layer--grid"
        style={{ '--parallax-depth': 0.9 }}
      />

      {activeStop ? (
        <div
          className="experience-map-terrain-focus"
          style={{ left: `${activeStop.x}%`, top: `${activeStop.y}%` }}
        />
      ) : null}
    </div>
  );
}
