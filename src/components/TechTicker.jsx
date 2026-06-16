import { motion, useReducedMotion } from 'framer-motion';
import { techSkills } from '../data/techSkills';
import { revealEase } from '../utils/motionPresets';

function TechTickerItem({ skill }) {
  return (
    <div className="tech-ticker-item">
      <img src={skill.logo} alt="" className="tech-logo" loading="lazy" decoding="async" />
      <span>{skill.name}</span>
    </div>
  );
}

export default function TechTicker({ skills = techSkills, visible = true, introDelay = false }) {
  const shouldReduceMotion = useReducedMotion();
  const tickerItems = [...skills, ...skills];

  return (
    <motion.div
      className="tech-ticker glass-panel glass-tier-1"
      aria-label="Technical skills"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={visible || shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.75,
        delay: introDelay && !shouldReduceMotion ? 0 : 0,
        ease: revealEase,
      }}
    >
      <div className="tech-ticker-track">
        {tickerItems.map((skill, index) => (
          <TechTickerItem key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}
