import _ from 'lodash';
import { EffKey } from './eff';

export type EffdefaultTab = typeof effdefaultTab;

export type EffdefaultKey = keyof EffdefaultTab;

export type EffdefaultValue = EffdefaultTab[keyof EffdefaultTab];

export const effdefaultTab: Partial<Record<EffKey, string>> = {
  // 0: 'spwi102',
  // 16: 'spwi305',
  // 20: 'spwi206',
  // 30: 'spwi319',
  // 44: 'spwi214',
  // 69: 'spwi310',
  // 98: 'sppr711',
  // 102: 'spwi602',
  // 126: 'spwi305',
  // 131: 'sppr203',
  // 137: 'sppr203',
  // 166: 'sppr509',
  // 159: 'spwi212',
  // 197: 'sppr613',
  // 219: 'sppr107',
  // 259: 'spwi902',
} as const;

export const EffdefaultKeys = _.keys(effdefaultTab);

export const EffdefaultValues = _.values(effdefaultTab);
