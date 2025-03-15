import { EffKey } from './eff';

export type EffdefaultTab = typeof effdefaultTab;

export type EffdefaultKey = keyof EffdefaultTab;

export type EffdefaultValue = EffdefaultTab[keyof EffdefaultTab];

export const effdefaultTab: Partial<Record<EffKey, string>> = {
  0: 'spwi102',
  30: 'spwi319',
  44: 'spwi214',
  69: 'spwi310',
  98: 'sppr711',
} as const;
