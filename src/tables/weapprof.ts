import _ from 'lodash';

export type WeapprofTab = typeof weapprofTab;

export type WeapprofKey = keyof WeapprofTab;

export type WeapprofValue = WeapprofTab[keyof WeapprofTab];

export const weapprofTab = {
  bastardSword: 'Bastard swords',
  longsword: 'Longswords',
  shortsword: 'Shortswords',
  axe: 'Axes',
  twoHandedSword: 'Two-handed swords',
  katana: 'Katanas',
  scimitar: 'Scimitars',
  dagger: 'Daggers',
  warhammer: 'Warhammers',
  club: 'Clubs',
  spear: 'Spears',
  halberd: 'Halberds',
  flail: 'Flails',
  mace: 'Maces',
  quarterstaff: 'Quarterstaves',
  crossbow: 'Crossbows',
  longbow: 'Longbows',
  shortbow: 'Shortbows',
  dart: 'Darts',
  sling: 'Slings',
  styleTwoHanded: 'Style: Two-handed weapons',
  styleSwordAndShield: 'Style: Sword & shield',
  styleSingleWeapon: 'Style: Single weapon',
  styleTwoWeapons: 'Style: Two weapons',
} as const;

export const WeapprofKeys = _.keys(weapprofTab);

export const WeapprofValues = _.values(weapprofTab);
