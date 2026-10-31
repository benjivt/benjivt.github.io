import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { watchGroups } from '../data/watching';
import { useSound } from '../hooks/useSound';
import ScreenHeader from '../components/ScreenHeader';

const items = watchGroups.flatMap((group) => group.items.map((item) => ({ ...item, group })));

// A poster, or the title on a gradient until a poster is added.
function Poster({ item, className }) {
  return item.poster ? (
    <img className={className} src={item.poster} alt="" />
  ) : (
    <span className={`${className} tv-poster-blank`}>{item.title}</span>
  );
}

// Arrow keys like a TV remote: left/right along a row, up/down to the closest poster in the next row.
// (Escape is handled app-wide.)
function useRemote(rowsRef) {
  const { play } = useSound();
  useEffect(() => {
    const onKey = (event) => {
      const rows = [...(rowsRef.current?.querySelectorAll('[data-row]') ?? [])].map((row) => [...row.querySelectorAll('button')]);
      if (!rows.length || event.altKey || event.ctrlKey || event.metaKey) return;
      const delta = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[event.key];
      if (!delta) return;
      event.preventDefault();
      let r = rows.findIndex((row) => row.includes(document.activeElement));
      let c = r < 0 ? 0 : rows[r].indexOf(document.activeElement);
      if (r < 0) r = 0;
      else if (delta[0]) {
        const from = rows[r][c].getBoundingClientRect().left;
        r = Math.min(rows.length - 1, Math.max(0, r + delta[0]));
        c = rows[r].reduce((best, el, i) => (Math.abs(el.getBoundingClientRect().left - from) < Math.abs(rows[r][best].getBoundingClientRect().left - from) ? i : best), 0);
      } else c = Math.min(rows[r].length - 1, Math.max(0, c + delta[1]));
      const next = rows[r][c];
      if (next && next !== document.activeElement) {
        next.focus();
        play('move');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rowsRef, play]);
}

// The TV, like a streaming dashboard: the selected title up top and its poster on the right,
// with a row of posters for each category underneath.
export default function Watching({ onBack }) {
  const rowsRef = useRef(null);
  const [activeId, setActiveId] = useState(items[0].id);
  useRemote(rowsRef);

  const item = items.find((entry) => entry.id === activeId) ?? items[0];

  return (
    <section className="ui-screen tv-screen" aria-label="Watching">
      <AnimatePresence>
        {item.poster && (
          <motion.img
            key={item.id}
            className="tv-art tv-art--blur"
            src={item.poster}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>
      <div className="tv-shade" aria-hidden="true" />

      <ScreenHeader sectionId="watching" onBack={onBack}>
        {items.length} titles
      </ScreenHeader>

      <div className="tv-body">
        <div className="tv-left">
          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              className="tv-hero tv-hero--compact"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-live="polite"
            >
              <span className="tv-kicker">{[item.group.name, item.year].filter(Boolean).join(' · ')}</span>
              <h2 className="tv-name">{item.title}</h2>
              <p className="tv-summary">{item.summary}</p>
              <ul className="tv-chips">
                {item.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </motion.article>
          </AnimatePresence>

          <div ref={rowsRef} className="tv-rows">
            {watchGroups.map((group) => (
              <div key={group.id} className="tv-row">
                <h3>{group.name}</h3>
                <ul data-row aria-label={group.name}>
                  {group.items.map((entry) => (
                    <li key={entry.id}>
                      <button
                        type="button"
                        className="tv-tile tv-tile--poster"
                        aria-pressed={entry.id === item.id}
                        aria-label={entry.title}
                        onFocus={() => setActiveId(entry.id)}
                        onClick={() => setActiveId(entry.id)}
                      >
                        <Poster item={entry} className="tv-tile-poster" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="tv-feature"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Poster item={item} className="tv-feature-poster" />
            {item.link && (
              <a className="tv-button" href={item.link} target="_blank" rel="noreferrer">
                <span aria-hidden="true">▶</span> Watch the trailer
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
