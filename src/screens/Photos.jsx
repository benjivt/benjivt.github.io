import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// A photo wall (Film, Travel): the selected print up close over a spread of prints,
// or blank prints until photos are added (see src/data/photos.js).
export default function Photos({ onBack, sectionId, label, photos, emptyText, emptyCaption }) {
  const gridRef = useRef(null);
  const [activeId, setActiveId] = useState(photos[0]?.id);
  useMenuKeys(gridRef, { columns: 'auto', onBack });

  const photo = photos.find((item) => item.id === activeId) ?? photos[0];

  return (
    <section className="ui-screen photos" aria-label={label}>
      <ScreenHeader sectionId={sectionId} onBack={onBack} />

      <div className="ui-body">
        {photo ? (
          <>
            <AnimatePresence mode="wait">
              <motion.figure
                key={photo.id}
                className="ui-polaroid photo-print"
                initial={{ opacity: 0, rotate: -3 }}
                animate={{ opacity: 1, rotate: -1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                aria-live="polite"
              >
                <img src={photo.src} alt={photo.caption} />
                <figcaption>{photo.caption}</figcaption>
              </motion.figure>
            </AnimatePresence>

            {photos.length > 1 && (
              <ul ref={gridRef} className="ui-snaps" aria-label={label}>
                {photos.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="ui-polaroid ui-snap"
                      data-nav-item
                      aria-pressed={item.id === photo.id}
                      aria-label={item.caption}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                    >
                      <img src={item.src} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <>
            <p className="ui-text">{emptyText}</p>
            <ul className="photo-blanks" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <li key={index} className="ui-polaroid">
                  <span className="photo-blank" />
                  <span>{emptyCaption}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
