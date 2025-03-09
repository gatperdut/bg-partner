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
