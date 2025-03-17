import _ from 'lodash';

export type GenderTab = typeof genderTab;

export type GenderKey = keyof GenderTab;

export type GenderValue = GenderTab[keyof GenderTab];

export const genderTab = {
  1: 'Male',
  2: 'Female',
  3: 'Other',
  4: 'Neither',
  5: 'Both',
  6: 'Summoned',
  7: 'Illusionary',
  8: 'Extra',
  9: 'Summoned demon',
  10: 'Extra 2',
  11: 'Extra 3',
  12: 'Extra 4',
  13: 'Extra 5',
  14: 'Extra 6',
  15: 'Extra 7',
  16: 'Extra 8',
  17: 'Extra 9',
  18: 'Extra 10',
  66: 'Imprisoned/Summoned',
} as const;

export const GenderKeys = _.keys(genderTab);

export const GenderValues = _.values(genderTab);
