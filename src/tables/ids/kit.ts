import { ClassValue } from '@tables/ids/class';
import _ from 'lodash';

export type KitTab = typeof kitTab;

export type KitKey = keyof KitTab;

export type KitValue = KitTab[keyof KitTab];

export const kitTab = {
  // 0x4000: 'True class',
  0x4001: 'Berserker',
  0x4002: 'Wizard slayer',
  0x4003: 'Kensai',
  0x4004: 'Cavalier',
  0x4005: 'Inquisitor',
  0x4006: 'Undead hunter',
  0x0040: 'Abjurer',
  0x0080: 'Conjurer',
  0x0100: 'Diviner',
  0x0200: 'Enchanter',
  0x0400: 'Illusionist',
  0x0800: 'Invoker',
  0x1000: 'Necromancer',
  0x2000: 'Transmuter',
  0x4000: 'Generalist',
  0x4007: 'Feralan',
  0x4008: 'Stalker',
  0x4009: 'Beastmaster',
  0x400a: 'Assassin',
  0x400b: 'Bounty hunter',
  0x400c: 'Swashbuckler',
  0x400d: 'Blade',
  0x400e: 'Jester',
  0x400f: 'Skald',
  0x4013: 'Priest of Talos',
  0x4014: 'Priest of Helm',
  0x4015: 'Priest of Lathander',
  0x4010: 'Totemic druid',
  0x4011: 'Shapeshifter',
  0x4012: 'Beast friend',
  0x40000000: 'Barbarian',
  0x80000000: 'Wild mage',
  0x4020: 'Blackguard',
  0x4021: 'Shadow dancer',
  0x4022: 'Dwarven defender',
  0x4023: 'Dragon disciple',
  0x4024: 'Dark Moon monk',
  0x4025: 'Sun Soul monk',
  0x4027: 'Grizzly bear',
  0x4028: 'Ohtyr',
} as const;

export const KitKeys = _.keys(kitTab);

export const KitValues = _.values(kitTab);

export const kitParentTab: Record<KitValue, ClassValue> = {
  // 'True class': 'True class',
  Berserker: 'Fighter',
  'Wizard slayer': 'Fighter',
  Kensai: 'Fighter',
  Cavalier: 'Paladin',
  Inquisitor: 'Paladin',
  'Undead hunter': 'Paladin',
  Abjurer: 'Mage',
  Conjurer: 'Mage',
  Diviner: 'Mage',
  Enchanter: 'Mage',
  Illusionist: 'Mage',
  Invoker: 'Mage',
  Necromancer: 'Mage',
  Transmuter: 'Mage',
  Generalist: 'Mage',
  Feralan: 'Ranger',
  Stalker: 'Ranger',
  Beastmaster: 'Ranger',
  Assassin: 'Thief',
  'Bounty hunter': 'Thief',
  Swashbuckler: 'Thief',
  Blade: 'Bard',
  Jester: 'Bard',
  Skald: 'Bard',
  'Priest of Talos': 'Cleric',
  'Priest of Helm': 'Cleric',
  'Priest of Lathander': 'Cleric',
  'Totemic druid': 'Druid',
  Shapeshifter: 'Druid',
  'Beast friend': 'Ranger',
  Barbarian: 'Fighter',
  'Wild mage': 'Sorcerer',
  Blackguard: 'Paladin',
  'Shadow dancer': 'Thief',
  'Dwarven defender': 'Fighter',
  'Dragon disciple': 'Sorcerer',
  'Dark Moon monk': 'Monk',
  'Sun Soul monk': 'Monk',
  'Grizzly bear': 'Fighter', // ??
  Ohtyr: 'Fighter', // ??
};
