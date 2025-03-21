import _ from 'lodash';

export type SlotTab = typeof slotTab;

export type SlotKey = keyof SlotTab;

export type SlotValue = SlotTab[keyof SlotTab];

export const slotTab = {
  0: 'Amulet',
  1: 'Armor',
  2: 'Belt',
  3: 'Boots',
  4: 'Cloak',
  5: 'Gauntlets',
  6: 'Helmet',
  7: 'Left ring',
  8: 'Right ring',
  9: 'Shield/Offhand',
  10: 'Fist',
  11: 'Ammo',
  12: 'Ammo 1',
  13: 'Ammo 2',
  14: 'Ammo 3',
  15: 'Misc 0',
  16: 'Misc 1',
  17: 'Misc 2',
  18: 'Misc 3',
  19: 'Misc 4',
  20: 'Misc 5',
  21: 'Misc 6',
  22: 'Misc 7',
  23: 'Misc 8',
  24: 'Misc 9',
  25: 'Misc 10',
  26: 'Misc 11',
  27: 'Misc 12',
  28: 'Misc 13',
  29: 'Misc 14',
  30: 'Misc 15',
  31: 'Misc 16',
  32: 'Misc 17',
  33: 'Misc 18',
  34: 'Magical weapon',
  35: 'Main hand',
  36: 'Weapon 1',
  37: 'Weapon 2',
  38: 'Weapon 3',
} as const;

export const SlotKeys = _.keys(slotTab).map(Number);

export const SlotValues = _.values(slotTab);
