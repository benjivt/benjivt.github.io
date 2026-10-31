import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { hobbies } from '../data/hobbies';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// A framed photo of the selected hobby over a row of snapshots; Sports and Outdoors each show their own subset.
export default function Hobbies({ onBack, sectionId, hobbyIds }) {
  const gridRef = useRef(null);
  const list = hobbyIds ? hobbies.filter((item) => hobbyIds.includes(item.id)) : hobbies;
  const [activeId, setActiveId] = useState(list[0].id);
  useMenuKeys(gridRef, { columns: 'auto', onBack });

  const hobby = list.find((item) => item.id === activeId) ?? list[0];

  return (
    <section className="ui-screen hobbies" aria-label={`${sectionId}: hobbies`}>
      <ScreenHeader sectionId={sectionId} onBack={onBack} />

      <div className="ui-body">
        <AnimatePresence mode="wait">
          <motion.article
            key={hobby.id}
            className="hobby-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
          >
            <span className="ui-frame hobby-photo">
              <img src={hobby.image} alt="" />
            </span>
            <h2 className="ui-h2">{hobby.name}</h2>
            <p className="ui-text">{hobby.blurb}</p>
          </motion.article>
        </AnimatePresence>

        <ul ref={gridRef} className="ui-snaps" aria-label="Hobbies">
          {list.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="ui-polaroid ui-snap"
                data-nav-item
                aria-pressed={item.id === activeId}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
              >
                <img src={item.image} alt="" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
