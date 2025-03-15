import _ from 'lodash';

export type EaTab = typeof eaTab;

export type EaKey = keyof EaTab;

export type EaValue = EaTab[keyof EaTab];

export const eaTab = {
  0: 'None',
  1: 'Statue',
  2: 'Companion',
  3: 'Familiar',
  4: 'Ally',
  5: 'Summoning',
  6: 'Charmed',
  7: 'Really charmed',
  28: 'Good but red',
  29: 'Good but blue',
  30: 'Good cutoff',
  31: 'Not good',
  126: 'All',
  128: 'Neutral',
  199: 'NOTEVIL',
  200: 'Evil cutoff',
  201: 'Evil but green',
  202: 'EVILBUTBLUE',
  254: 'Charmed PC',
  255: 'Enemy',
} as const;

export const EaKeys = _.keys(eaTab);

export const EaValues = _.values(eaTab);
