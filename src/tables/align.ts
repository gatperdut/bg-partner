import _ from 'lodash';

export type AlignTab = typeof alignTab;

export type AlignKey = keyof AlignTab;

export type AlignValue = AlignTab[keyof AlignTab];

export const alignTab = {
  0x00: 'None',
  0x11: 'Lawful good',
  0x12: 'Lawful neutral',
  0x13: 'Lawful evil',
  0x21: 'Neutral good',
  0x22: 'True neutral',
  0x23: 'Neutral evil',
  0x31: 'Chaotic good',
  0x32: 'Chaotic neutral',
  0x33: 'Chaotic evil',
  0x01: 'Good',
  0x02: 'Neutral good/evil',
  0x03: 'Evil',
  0x10: 'Lawful',
  0x20: 'Lawful/Chaotic neutral',
  0x30: 'Chaotic',
} as const;

export const AlignKeys = _.keys(alignTab);

export const AlignValues = _.values(alignTab);
