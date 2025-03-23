import _ from 'lodash';

export type Effsave = typeof effsaveTab;

export type EffsaveKey = keyof Effsave;

export type EffsaveValue = Effsave[keyof Effsave];

export const effsaveTab = {
  0b00001: 'Spell',
  0b00010: 'Breath weapon',
  0b00100: 'Paralysis/Poison/Death',
  0b01000: 'Rod/Staff/Wand',
  0b10000: 'Petrification/Polymorph',
} as const;

export const EffsaveKeys = _.keys(effsaveTab);

export const EffsaveValues = _.values(effsaveTab);
