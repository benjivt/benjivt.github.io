export const NEIGHBOR_FAN_SHIFT_REM = 5.25;
export const NEIGHBOR_FAN_ROT_DEG = 2.4;
export const DISTANT_FAN_BASE_REM = 2.55;
export const DISTANT_FAN_STEP_REM = 1.05;
export const DISTANT_FAN_ROT_DEG = 1.05;
export const DISTANT_FAN_ROT_STEP_DEG = 0.28;

export function getFanVars(index, focusIndex) {
  if (focusIndex === null) {
    return {
      '--deck-shift-x': '0rem',
      '--deck-extra-rot': '0deg',
    };
  }

  const delta = index - focusIndex;
  if (delta === 0) {
    return {
      '--deck-shift-x': '0rem',
      '--deck-extra-rot': '0deg',
    };
  }

  const absDelta = Math.abs(delta);
  const sign = Math.sign(delta);

  if (absDelta === 1) {
    return {
      '--deck-shift-x': `${sign * NEIGHBOR_FAN_SHIFT_REM}rem`,
      '--deck-extra-rot': `${sign * NEIGHBOR_FAN_ROT_DEG}deg`,
    };
  }

  const distantShift = DISTANT_FAN_BASE_REM + (absDelta - 1) * DISTANT_FAN_STEP_REM;
  const distantRot = DISTANT_FAN_ROT_DEG + (absDelta - 2) * DISTANT_FAN_ROT_STEP_DEG;

  return {
    '--deck-shift-x': `${sign * distantShift}rem`,
    '--deck-extra-rot': `${sign * distantRot}deg`,
  };
}
