import _ from 'lodash';

export type SchoolTab = typeof schoolTab;

export type SchoolKey = keyof SchoolTab;

export type SchoolValue = SchoolTab[keyof SchoolTab];

export const schoolTab = {
  0: 'No school',
  1: 'Abjuration',
  2: 'Conjuration',
  3: 'Divination',
  4: 'Enchantment',
  5: 'Illusion',
  6: 'Invocation',
  7: 'Necromancy',
  8: 'Transmutation',
  9: 'General school',
} as const;

export const SchoolKeys = _.keys(schoolTab);

export const SchoolValues = _.values(schoolTab);

export type SchoolShortTab = typeof schoolShortTab;

export type SchoolShortValue = SchoolShortTab[keyof SchoolShortTab];

export const schoolShortTab = {
  0: 'NONE',
  1: 'ABJ',
  2: 'CON',
  3: 'DIV',
  4: 'ENC',
  5: 'ILL',
  6: 'INV',
  7: 'NEC',
  8: 'TRA',
  9: 'GEN',
} as const;

export const SchoolShortKeys = _.keys(schoolShortTab);

export const SchoolShortValues = _.values(schoolShortTab);
