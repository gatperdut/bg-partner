import _ from 'lodash';

export type Eff120TypeTab = typeof eff120TypeTab;

export type Eff120TypeKey = keyof Eff120TypeTab;

export type Eff120TypeValue = Eff120TypeTab[keyof Eff120TypeTab];

export const eff120TypeTab = {
  0: 'enchanted',
  1: 'magical',
  2: 'non-magical',
  3: 'silver',
  4: 'non-silver',
  5: 'non-silver / Non-magical',
  6: 'two-handed',
  7: 'one-handed',
  8: 'cursed',
  9: 'non-cursed',
  10: 'cold iron',
  11: 'non-Cold iron',
} as const;

export const Eff120TypeKeys = _.keys(eff120TypeTab);

export const Eff120TypeValues = _.values(eff120TypeTab);
