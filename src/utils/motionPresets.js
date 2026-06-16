export const revealEase = [0.22, 1, 0.36, 1];

export const staggerStepMs = 90;

export const revealEnter = { duration: 0.65, ease: revealEase };
export const revealExit = { duration: 0.4, ease: revealEase };

export const revealViewport = { once: false, amount: 0.35, margin: '0px 0px -8% 0px' };

export const cardRevealY = 36;
export const cardRevealScale = 0.94;

export const heroParallaxHeadshot = 72;
export const heroParallaxCopy = 32;

export const orbDriftRem = 6;

export const tiltMaxDeg = 20;

export const navDotTransition = { duration: 0.28, ease: revealEase };

export function staggerDelay(index, stepMs = staggerStepMs) {
  return index * stepMs;
}

export function getCardRevealVariants(index = 0) {
  return {
    hidden: {
      opacity: 0,
      y: cardRevealY,
      scale: cardRevealScale,
      transition: revealExit,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...revealEnter,
        delay: staggerDelay(index) / 1000,
      },
    },
  };
}

export function getHorizontalRevealVariants(fromLeft, travel = 28) {
  return {
    hidden: {
      opacity: 0,
      x: fromLeft ? -travel : travel,
      transition: revealExit,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: revealEnter,
    },
  };
}

export function getMetaRevealVariants(fromLeft) {
  return getHorizontalRevealVariants(fromLeft);
}

export const thumbRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    transition: revealExit,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...revealEnter, delay: 0.1 },
  },
};

export function getFadeUpVariants(index = 0) {
  return {
    hidden: {
      opacity: 0,
      y: 20,
      transition: revealExit,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...revealEnter,
        delay: staggerDelay(index) / 1000,
      },
    },
  };
}

export const experiencePartStaggerMs = 50;
export const experiencePartRevealY = 16;

export function getExperienceCardContainerVariants(index = 0) {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: staggerDelay(index) / 1000,
        staggerChildren: experiencePartStaggerMs / 1000,
      },
    },
  };
}

export const experiencePartVariants = {
  hidden: {
    opacity: 0,
    y: experiencePartRevealY,
    transition: revealExit,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealEnter,
  },
};

export const experienceQuoteVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: revealExit,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...revealEnter, delay: 0.12 },
  },
};

export const experienceMapPathStaggerMs = 100;
export const experienceMapPathDrawDuration = 0.38;

export function getExperienceMapPinVariants(nodeIndex = 0) {
  return {
    hidden: {
      opacity: 0,
      scale: 0.55,
      x: '-50%',
      y: '-50%',
      transition: revealExit,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: '-50%',
      y: '-50%',
      transition: {
        duration: 0.42,
        ease: revealEase,
        delay: (nodeIndex * experienceMapPathStaggerMs) / 1000,
      },
    },
  };
}

export function getExperienceMapLabelVariants(nodeIndex = 0) {
  return {
    hidden: {
      opacity: 0,
      y: 6,
      transition: revealExit,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.32,
        ease: revealEase,
        delay: (nodeIndex * experienceMapPathStaggerMs + 80) / 1000,
      },
    },
  };
}

export const experienceMapDetailContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.06,
    },
  },
};

export const experienceMapDetailItemVariants = {
  hidden: {
    opacity: 0,
    y: 8,
    transition: revealExit,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: revealEase },
  },
};
