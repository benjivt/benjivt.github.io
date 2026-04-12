import { motion } from 'framer-motion';
import headshot from '../../info/headshot/headshot.png';

export default function Hero() {
  return (
    <section id="hero" className="hero-shell section-shell">
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
          <a className="button-primary" href="#projects">
            View projects
          </a>
          <a className="button-secondary" href="#experience">
            Explore experience
          </a>
        </div>
      </motion.div>
    </section>
  );
}
