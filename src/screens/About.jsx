import { useRef } from 'react';
import { profile } from '../data/profile';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// About, opened from the photo on the desk: the photo itself, then who I am.
export default function About({ onBack }) {
  const screenRef = useRef(null);
  useMenuKeys(screenRef, { columns: 'auto', onBack });

  return (
    <section ref={screenRef} className="ui-screen about" aria-label="About me">
      <ScreenHeader sectionId="about" onBack={onBack} />

      <div className="ui-body">
        <div className="about-intro">
          <figure className="ui-polaroid about-photo">
            <img src={profile.headshot} alt={profile.name} />
            <figcaption>{profile.nickname}</figcaption>
          </figure>
          <div>
            <h2 className="ui-h2">{profile.name}</h2>
            <p className="ui-muted">
              {profile.role} · {profile.company} · {profile.location}
            </p>
            <ul className="ui-chips about-strengths">
              {profile.strengths.map((item) => (
                <li key={item} className="ui-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="ui-text">{profile.bio}</p>

        <h3 className="ui-label">Education</h3>
        <ul className="ui-rows">
          {profile.education.map((item) => (
            <li key={item.degree} className="ui-row">
              <span className="ui-row-text">
                <span className="ui-row-title">{item.school}</span>
                <span className="ui-row-sub">{item.degree}</span>
              </span>
            </li>
          ))}
        </ul>

        <h3 className="ui-label">Toolbox</h3>
        <div className="about-toolbox">
          {profile.toolbox.map((group) => (
            <div key={group.group}>
              <span className="ui-muted">{group.group}</span>
              <ul className="ui-chips">
                {group.items.map((item) => (
                  <li key={item} className="ui-chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ui-actions">
          <a className="ui-button" data-nav-item href="#resume">
            View resume
          </a>
          <a className="ui-button ui-button--light" data-nav-item href="#career">
            See my roadmap
          </a>
        </div>
      </div>
    </section>
  );
}
