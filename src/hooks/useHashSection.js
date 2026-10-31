import { useCallback, useEffect, useState } from 'react';
import { sectionById } from '../data/sections';

function sectionFromHash() {
  const id = window.location.hash.replace(/^#\/?/, '');
  return sectionById[id] ? id : null;
}

// The open section lives in the URL hash, so deep links (/#career) and the back button work.
export default function useHashSection() {
  const [sectionId, setSectionId] = useState(sectionFromHash);

  useEffect(() => {
    const sync = () => setSectionId(sectionFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const open = useCallback((next) => {
    const hash = next ? `#${next}` : '';
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash || window.location.pathname);
    }
    setSectionId(next);
  }, []);

  return [sectionId, open];
}
