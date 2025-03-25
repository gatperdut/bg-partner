import _ from 'lodash';

export type SpecificTab = typeof specificTab;

export type SpecificKey = keyof SpecificTab;

export type SpecificValue = SpecificTab[keyof SpecificTab];

export const specificTab = {
  1: 'Normal',
  101: 'Magic',
  102: 'No magic',
  12: 'Sharran',
  64: 'Shou monk',
  65: 'Shou flayer',
  66: 'Quadim spider',
  10: 'Cultist',
  67: 'Culak spider',
  250: 'Spirit',
} as const;

export const SpecificKeys = _.keys(specificTab);

export const SpecificValues = _.values(specificTab);
