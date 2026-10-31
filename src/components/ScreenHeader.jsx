import { sectionById } from '../data/sections';
import { useSound } from '../hooks/useSound';
import { useSurface } from './Surface';

export function CloseIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// Every section's header, dressed for where it's drawn: the wood plank on room cards, a window
// toolbar on the laptop, a top bar on the TV, a nav bar on the phone, an app title bar in the headset.
// Always an h1 title and a close.
export default function ScreenHeader({ sectionId, onBack, children }) {
  const { label } = sectionById[sectionId];
  const surface = useSurface();
  const { play } = useSound();
  const close = () => {
    play('back');
    onBack();
  };

  if (surface === 'laptop') {
    return (
      <header className="mac-bar">
        <div className="mac-lights">
          <button type="button" className="mac-light mac-light--close" aria-label="Close" onClick={close}>
            <CloseIcon size={8} />
          </button>
          <span className="mac-light mac-light--min" aria-hidden="true" />
          <span className="mac-light mac-light--zoom" aria-hidden="true" />
        </div>
        <h1 className="mac-title">{label}</h1>
        <div className="mac-bar-end">{children}</div>
      </header>
    );
  }

  if (surface === 'tv') {
    return (
      <header className="tv-top">
        <h1 className="tv-title">{label}</h1>
        {children && <span className="tv-meta">{children}</span>}
        <button type="button" className="tv-close" aria-label="Close" onClick={close}>
          <CloseIcon size={18} />
        </button>
      </header>
    );
  }

  if (surface === 'vr') {
    return (
      <header className="vr-titlebar">
        <span className="vr-app-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4L1.5 8 5 12M11 4l3.5 4-3.5 4M9.5 2.5l-3 11" />
          </svg>
        </span>
        <h1 className="vr-title">{label}</h1>
        {children && <span className="vr-meta">{children}</span>}
        <button type="button" className="vr-close" aria-label="Close" onClick={close}>
          <CloseIcon size={13} />
        </button>
      </header>
    );
  }

  if (surface === 'phone') {
    return (
      <header className="ios-head">
        <button type="button" className="ios-close" aria-label="Close" onClick={close}>
          <CloseIcon size={11} />
        </button>
        <h1 className="ios-title">{label}</h1>
      </header>
    );
  }

  return (
    <header className="ui-head">
      <h1 className="ui-title">{label}</h1>
      {children && <div className="ui-head-meta">{children}</div>}
      <button type="button" className="ui-close" aria-label="Close" onClick={close}>
        <CloseIcon />
      </button>
    </header>
  );
}
