import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { stops } from '../data/career';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// The career roadmap, drawn as a desktop app on the laptop: a sidebar of stops and the selected stop beside it.
export default function Roadmap({ onBack }) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  useMenuKeys(listRef, { onBack });

  const stop = stops[activeIndex];
  const step = (delta) => setActiveIndex((index) => Math.min(stops.length - 1, Math.max(0, index + delta)));

  return (
    <section className="ui-screen roadmap" aria-label="Career">
      <ScreenHeader sectionId="career" onBack={onBack}>
        <span className="roadmap-stepper">
          <button type="button" aria-label="Previous stop" disabled={activeIndex === 0} onClick={() => step(-1)}>
            ‹
          </button>
          <span>
            Stop {activeIndex + 1} of {stops.length}
          </span>
          <button type="button" aria-label="Next stop" disabled={activeIndex === stops.length - 1} onClick={() => step(1)}>
            ›
          </button>
        </span>
      </ScreenHeader>

      <div className="roadmap-app">
        <nav className="roadmap-side" aria-label="Stops">
          <p className="roadmap-side-label">Roadmap</p>
          <ol ref={listRef}>
            {stops.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="roadmap-item"
                  data-nav-item
                  aria-pressed={index === activeIndex}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={item.logo} alt="" />
                  <span>
                    <b>{item.team}</b>
                    <small>
                      {item.label} · {item.tag}
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <AnimatePresence mode="wait">
          <motion.article
            key={stop.id}
            className="roadmap-detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-live="polite"
          >
            <div className="roadmap-main">
              <div className="roadmap-head">
                <img className="roadmap-logo" src={stop.logo} alt="" />
                <div>
                  <span className={`roadmap-tag${stop.current ? ' roadmap-tag--live' : ''}`}>{stop.tag}</span>
                  <h2 className="roadmap-team">{stop.team}</h2>
                  <p className="roadmap-role">
                    {stop.role} · {stop.range}
                  </p>
                </div>
              </div>
              <p className="roadmap-recap">{stop.recap}</p>
              <h3 className="roadmap-label">Highlights</h3>
              <ul className="roadmap-highlights">
                {stop.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <aside className="roadmap-aside">
              {stop.stat && (
                <div className="roadmap-card">
                  <span className="roadmap-stat">{stop.stat.value}</span>
                  <span className="roadmap-role">{stop.stat.label}</span>
                </div>
              )}
              {stop.quote && (
                <figure className="roadmap-card roadmap-quote">
                  <blockquote>“{stop.quote.text}”</blockquote>
                  <figcaption>
                    <img src={stop.quote.photo} alt="" />
                    <span>
                      <b>{stop.quote.author}</b>
                      {stop.quote.role}
                    </span>
                  </figcaption>
                </figure>
              )}
              {!stop.stat && !stop.quote && (
                <p className="roadmap-card roadmap-role">{stop.current ? 'Happening now' : 'Where it started'}</p>
              )}
            </aside>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
