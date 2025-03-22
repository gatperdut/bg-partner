import _ from 'lodash';

export type Effsave = typeof effsaveTab;

export type EffsaveKey = keyof Effsave;

export type EffsaveValue = Effsave[keyof Effsave];

export const effsaveTab = {
  0b00001: 'Spells',
  0b00010: 'Breath',
  0b00100: 'Death',
  0b01000: 'Wands',
  0b10000: 'Polymorph',
} as const;

export const EffsaveKeys = _.keys(effsaveTab);

export const EffsaveValues = _.values(effsaveTab);
