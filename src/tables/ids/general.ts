import _ from 'lodash';

export type GeneralTab = typeof generalTab;

export type GeneralKey = keyof GeneralTab;

export type GeneralValue = GeneralTab[keyof GeneralTab];

export const generalTab = {
  0: 'General item',
  1: 'Humanoid',
  2: 'Animal',
  3: 'Dead',
  4: 'Undead',
  5: 'Giant humanoid',
  6: 'Frozen',
  7: 'Plant',
  101: 'Weapon',
  102: 'Armor',
  103: 'Amulet',
  104: 'Belt',
  105: 'Boots',
  106: 'Ammo',
  107: 'Helmer',
  108: 'Key',
  109: 'Potion',
  110: 'Ring',
  111: 'Scroll',
  112: 'Shield',
  113: 'Gloves',
  255: 'Monster',
} as const;

export const GeneralKeys = _.keys(generalTab);

export const GeneralValues = _.values(generalTab);
