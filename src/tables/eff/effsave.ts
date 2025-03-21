import _ from 'lodash';

export type Effsave = typeof effsaveTab;

export type EffsaveKey = keyof Effsave;

export type EffsaveValue = Effsave[keyof Effsave];

export const effsaveTab = {
  0b0000: 'Spells',
  0b0001: 'Breath',
  0b0010: 'Death',
  0b0100: 'Wands',
  0b1000: 'Polymorph',
} as const;

export const EffsaveKeys = _.keys(effsaveTab);

export const EffsaveValues = _.values(effsaveTab);
