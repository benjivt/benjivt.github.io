import { useRef } from 'react';
import { profile } from '../data/profile';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// Only the no-WebGL fallback uses this; in the room the resume is the printed page on the desk.
export default function ResumeViewer({ onBack }) {
  const screenRef = useRef(null);
  useMenuKeys(screenRef, { onBack, autoFocus: false });

  return (
    <section ref={screenRef} className="ui-screen resume-viewer" aria-label="Resume">
      <ScreenHeader sectionId="resume" onBack={onBack} />
      <div className="ui-body resume-body">
        <div className="ui-actions">
          <a className="ui-button" href={profile.resume} download="Benjamin-Adjepong-Resume.pdf">
            Download PDF
          </a>
          <a className="ui-button ui-button--light" href={profile.resume} target="_blank" rel="noreferrer">
            Open in new tab
          </a>
        </div>
        <iframe className="resume-frame" title="Benjamin Adjepong's resume" src={`${profile.resume}#navpanes=0&view=FitH`} />
      </div>
    </section>
  );
}
