import { motion } from 'framer-motion';
import headshot from '../../info/headshot/headshot.webp';
import { scrollToSection } from '../utils/scrollToSection';

export default function Hero({ sectionId = 'hero' }) {
  return (
    <section id={sectionId} className="hero-shell section-shell">
      <div className="hero-headshot-wrap" aria-hidden="true">
        <img src={headshot} alt="" className="hero-headshot" />
      </div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <p className="eyebrow">Benjamin Adjepong</p>
        <h1>Software engineer building AI/ML systems, automation, and immersive interfaces.</h1>
        <p className="hero-description">
          Master of Engineering candidate at Virginia Tech with experience across
          Microsoft, Collins Aerospace, and product UI engineering, focused on machine
          intelligence, automation, and polished user-facing systems.
        </p>
        <div className="hero-actions">
          <button type="button" className="button-primary" onClick={() => scrollToSection('projects')}>
            View projects
          </button>
          <button
            type="button"
            className="button-secondary"
            onClick={() => scrollToSection('experience')}
          >
            Explore experience
          </button>
        </div>
      </motion.div>
    </section>
  );
}
