import { useRef } from 'react';
import { contacts } from '../data/profile';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// White glyphs for the app-style icon squares.
const icons = {
  email: (
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="0.75" y="0.75" width="15.5" height="11.5" rx="2" />
      <path d="M1.5 1.8l7 5.2 7-5.2" />
    </svg>
  ),
  linkedin: <b className="contact-glyph">in</b>,
  github: (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  ),
  resume: (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1.5.75h6.5l4.25 4.25v9.25a1 1 0 01-1 1h-9.75a1 1 0 01-1-1V1.75a1 1 0 011-1z" />
      <path d="M3.5 8.5h6M3.5 11.5h6" />
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1" y="1" width="14" height="14" rx="4" />
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  beli: (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 1v5a2 2 0 002 2v7M1.5 1v4M4.5 1v4M10.5 15V1c-2 1-3 3-3 6h3" />
    </svg>
  ),
};

const groupNames = [...new Set(contacts.map((contact) => contact.group))];

// Contact as a phone app: grouped list rows with app-style icons.
export default function Contact({ onBack }) {
  const listRef = useRef(null);
  useMenuKeys(listRef, { onBack });

  return (
    <section className="ui-screen contact" aria-label="Contact">
      <ScreenHeader sectionId="contact" onBack={onBack} />

      <p className="contact-blurb">
        Recruiting, collaborating, or just want to talk hardware, ML, or the best e-skate routes? Pick whichever's easiest and I'll get back to you.
      </p>

      <div ref={listRef}>
        {groupNames.map((group) => (
          <div key={group}>
            <h2 className="contact-section">{group}</h2>
            <ul className="contact-group">
              {contacts
                .filter((contact) => contact.group === group)
                .map((contact) => {
                  const external = contact.href.startsWith('http');
                  return (
                    <li key={contact.id}>
                      <a
                        className="contact-row"
                        data-nav-item
                        href={contact.href}
                        download={contact.download}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                      >
                        <span className="contact-icon" style={{ background: contact.color }} aria-hidden="true">
                          {icons[contact.id]}
                        </span>
                        <span className="contact-row-body">
                          <span className="contact-label">{contact.label}</span>
                          <span className="contact-handle">{contact.handle}</span>
                          <span className="contact-chevron" aria-hidden="true">
                            ›
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
