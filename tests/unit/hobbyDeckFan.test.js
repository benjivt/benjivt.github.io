import { describe, expect, it } from 'vitest';
import {
  DISTANT_FAN_BASE_REM,
  DISTANT_FAN_ROT_DEG,
  DISTANT_FAN_ROT_STEP_DEG,
  DISTANT_FAN_STEP_REM,
  NEIGHBOR_FAN_ROT_DEG,
  NEIGHBOR_FAN_SHIFT_REM,
  getFanVars,
} from '../../src/components/interests/hobbyDeckFan';

describe('getFanVars', () => {
  it('returns neutral values when nothing is focused', () => {
    expect(getFanVars(3, null)).toEqual({
      '--deck-shift-x': '0rem',
      '--deck-extra-rot': '0deg',
    });
  });

  it('returns neutral values for the focused card', () => {
    expect(getFanVars(4, 4)).toEqual({
      '--deck-shift-x': '0rem',
      '--deck-extra-rot': '0deg',
    });
  });

  it('fans immediate neighbors by the neighbor constants', () => {
    expect(getFanVars(5, 4)).toEqual({
      '--deck-shift-x': `${NEIGHBOR_FAN_SHIFT_REM}rem`,
      '--deck-extra-rot': `${NEIGHBOR_FAN_ROT_DEG}deg`,
    });

    expect(getFanVars(3, 4)).toEqual({
      '--deck-shift-x': `${-NEIGHBOR_FAN_SHIFT_REM}rem`,
      '--deck-extra-rot': `${-NEIGHBOR_FAN_ROT_DEG}deg`,
    });
  });

  it('nudges distant cards progressively farther from focus', () => {
    const deltaTwo = getFanVars(6, 4);
    const deltaThree = getFanVars(7, 4);

    expect(deltaTwo).toEqual({
      '--deck-shift-x': `${DISTANT_FAN_BASE_REM + DISTANT_FAN_STEP_REM}rem`,
      '--deck-extra-rot': `${DISTANT_FAN_ROT_DEG}deg`,
    });

    expect(deltaThree['--deck-extra-rot']).toBe(
      `${DISTANT_FAN_ROT_DEG + DISTANT_FAN_ROT_STEP_DEG}deg`,
    );
  });
});
