import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero-shell section-shell">
      <div className="hero-background glass-panel">
        <div className="hero-grid" />
        <div className="hero-shine" />
      </div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <p className="eyebrow">Portfolio Framework</p>
        <h1>Apple-inspired structure for projects, experience, and rich interactions.</h1>
        <p className="hero-description">
          This foundation focuses on motion, typography, and glassy surfaces first,
          making it easy to drop real work and stories in later.
        </p>
        <div className="hero-actions">
          <a className="button-primary" href="#projects">
            View project framework
          </a>
          <a className="button-secondary" href="#experience">
            See experience structure
          </a>
        </div>
      </motion.div>
    </section>
  );
}
