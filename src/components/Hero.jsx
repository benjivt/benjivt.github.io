import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import headshot from '../../info/headshot/headshot.webp';
import useSessionIntro from '../hooks/useSessionIntro';
import { heroParallaxCopy, heroParallaxHeadshot, revealEase } from '../utils/motionPresets';
import TechTicker from './TechTicker';
import { scrollToSection } from '../utils/scrollToSection';

const identityWords = [
  { article: 'a', label: 'developer' },
  { article: 'an', label: 'engineer' },
  { article: 'a', label: 'builder' },
  { article: 'a', label: 'researcher' },
  { article: 'an', label: 'embedded engineer' },
  { article: 'an', label: 'ML engineer' },
  { article: 'just a', label: 'guy' },
];

const TYPE_MS = 72;
const DELETE_MS = 42;
const HOLD_MS = 1400;
const PAUSE_MS = 320;

export default function Hero({ sectionId = 'hero' }) {
  const shouldReduceMotion = useReducedMotion();
  const { shouldPlayIntro, isReady, markIntroSeen } = useSessionIntro();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const headshotY = useTransform(scrollYProgress, [0, 1], [0, -heroParallaxHeadshot]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -heroParallaxCopy]);
  const [typewriterEnabled, setTypewriterEnabled] = useState(false);
  const [tickerVisible, setTickerVisible] = useState(false);

  const identityPhrases = useMemo(
    () => identityWords.map(({ article, label }) => `${article} ${label}`),
    []
  );
  const widestPhrase = useMemo(
    () => identityPhrases.reduce((longest, phrase) => (phrase.length > longest.length ? phrase : longest)),
    [identityPhrases]
  );
  const [typedSuffix, setTypedSuffix] = useState('');

  useEffect(() => {
    if (!isReady) {
      return undefined;
    }

    if (shouldReduceMotion || !shouldPlayIntro) {
      setTypewriterEnabled(true);
      setTickerVisible(true);
      return undefined;
    }

    const typewriterTimer = window.setTimeout(() => setTypewriterEnabled(true), 500);
    const tickerTimer = window.setTimeout(() => setTickerVisible(true), 1200);

    return () => {
      window.clearTimeout(typewriterTimer);
      window.clearTimeout(tickerTimer);
    };
  }, [isReady, shouldPlayIntro, shouldReduceMotion]);

  useEffect(() => {
    if (!typewriterEnabled || shouldReduceMotion) {
      setTypedSuffix(identityPhrases[0]);
      return undefined;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId = 0;

    const tick = () => {
      const phrase = identityPhrases[phraseIndex];

      if (!isDeleting) {
        charIndex += 1;
        setTypedSuffix(phrase.slice(0, charIndex));

        if (charIndex >= phrase.length) {
          isDeleting = true;
          timerId = window.setTimeout(tick, HOLD_MS);
          return;
        }

        timerId = window.setTimeout(tick, TYPE_MS);
        return;
      }

      charIndex -= 1;
      setTypedSuffix(phrase.slice(0, charIndex));

      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % identityPhrases.length;
        timerId = window.setTimeout(tick, PAUSE_MS);
        return;
      }

      timerId = window.setTimeout(tick, DELETE_MS);
    };

    timerId = window.setTimeout(tick, PAUSE_MS);

    return () => window.clearTimeout(timerId);
  }, [identityPhrases, shouldReduceMotion, typewriterEnabled]);

  const ariaLabel = typedSuffix ? `I am ${typedSuffix}` : 'I am';
  const introEase = revealEase;
  const playEntrance = isReady && shouldPlayIntro && !shouldReduceMotion;
  const motionKey = !isReady ? 'pending' : playEntrance ? 'intro' : 'static';

  return (
    <section
      id={sectionId}
      ref={heroRef}
      className="hero-shell section-shell section-viewport-centered"
    >
      <div className="hero-stage">
        <motion.div
          key={`headshot-${motionKey}`}
          className="hero-headshot-wrap"
          initial={
            !isReady
              ? { opacity: 0 }
              : playEntrance
                ? { opacity: 0, scale: 0.88, y: 28 }
                : false
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: introEase }}
          style={shouldReduceMotion ? undefined : { y: headshotY }}
        >
          <img src={headshot} alt="Benjamin Adjepong" className="hero-headshot" />
        </motion.div>
        <motion.div
          key={`copy-${motionKey}`}
          className="hero-copy"
          initial={
            !isReady
              ? { opacity: 0 }
              : playEntrance
                ? { opacity: 0, y: 36 }
                : false
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: playEntrance ? 0.2 : 0, ease: introEase }}
          style={shouldReduceMotion ? undefined : { y: copyY }}
        >
          <motion.h1
            initial={playEntrance ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: playEntrance ? 0.2 : 0, ease: introEase }}
          >
            Benjamin Adjepong
          </motion.h1>
          <div className="hero-identity" aria-live="polite" aria-label={ariaLabel}>
            <span className="hero-identity-slot">
              <span className="hero-identity-sizer" aria-hidden="true">
                I am {widestPhrase}
              </span>
              <span className="hero-identity-content">
                I am {typedSuffix}
                {!shouldReduceMotion && typewriterEnabled ? (
                  <span className="hero-identity-cursor" aria-hidden="true">
                    |
                  </span>
                ) : null}
              </span>
            </span>
          </div>
          <motion.div
            className="hero-actions"
            initial={playEntrance ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: playEntrance ? 0.9 : 0.15, ease: introEase }}
            onAnimationComplete={() => {
              if (playEntrance) {
                markIntroSeen();
              }
            }}
          >
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
          </motion.div>
        </motion.div>
      </div>
      <TechTicker visible={tickerVisible || shouldReduceMotion} introDelay={playEntrance} />
    </section>
  );
}
