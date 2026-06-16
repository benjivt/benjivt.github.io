import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { orbDriftRem } from '../utils/motionPresets';

export default function ScrollAtmosphere() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const orbOneX = useTransform(scrollYProgress, [0, 1], ['0rem', `${orbDriftRem}rem`]);
  const orbOneY = useTransform(scrollYProgress, [0, 1], ['0rem', `${orbDriftRem * 0.55}rem`]);
  const orbTwoX = useTransform(scrollYProgress, [0, 1], ['0rem', `${-orbDriftRem * 0.75}rem`]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], ['0rem', `${-orbDriftRem * 0.45}rem`]);

  if (shouldReduceMotion) {
    return (
      <>
        <div className="background-orb background-orb-one" aria-hidden="true" />
        <div className="background-orb background-orb-two" aria-hidden="true" />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="background-orb background-orb-one"
        aria-hidden="true"
        style={{ x: orbOneX, y: orbOneY }}
      />
      <motion.div
        className="background-orb background-orb-two"
        aria-hidden="true"
        style={{ x: orbTwoX, y: orbTwoY }}
      />
    </>
  );
}
