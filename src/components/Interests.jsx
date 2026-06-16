import { motion, useReducedMotion } from 'framer-motion';
import { interests } from '../data/interestsAssets';
import useScrollReveal from '../hooks/useScrollReveal';
import { revealViewport } from '../utils/motionPresets';
import HobbyCardDeck from './interests/HobbyCardDeck';
import InterestLinkCard from './interests/InterestLinkCard';

export default function Interests({ sectionId = 'interests' }) {
  const { ref, isVisible } = useScrollReveal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section-shell section-viewport-centered reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="section-heading">
        <p className="eyebrow">Beyond work</p>
        <h2 className="section-title">What fills my free time.</h2>
        <p className="section-copy interests-intro">
          The technical rabbit holes I chase for fun, and the offline stuff that keeps me sane.
        </p>
      </div>

      <div className="interests-layout">
        <motion.div
          className="interests-zone"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={revealViewport}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <div className="interests-zone-heading">
            <h3>Interests</h3>
            <p>Topics I’ll happily ramble about — usually tied to something I’ve built.</p>
          </div>
          <div className="interest-link-grid">
            {interests.map((interest) => (
              <InterestLinkCard key={interest.id} interest={interest} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="interests-zone hobbies-zone"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={revealViewport}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
            },
          }}
        >
          <div className="interests-zone-heading">
            <h3>Hobbies</h3>
            <p>How I unplug — mostly outdoors, often competitive, always better with friends.</p>
          </div>
          <HobbyCardDeck />
        </motion.div>
      </div>
    </section>
  );
}
