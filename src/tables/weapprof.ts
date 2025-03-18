import _ from 'lodash';

export type WeapprofTab = typeof weapprofTab;

export type WeapprofKey = keyof WeapprofTab;

export type WeapprofValue = WeapprofTab[keyof WeapprofTab];

export const weapprofTab = {
  89: 'Bastard swords',
  90: 'Longswords',
  91: 'Shortswords',
  92: 'Axes',
  93: 'Two-handed swords',
  94: 'Katanas',
  95: 'Scimitars',
  96: 'Daggers',
  97: 'Warhammers',
  115: 'Clubs',
  98: 'Spears',
  99: 'Halberds',
  100: 'Flails',
  101: 'Maces',
  102: 'Quarterstaves',
  103: 'Crossbows',
  104: 'Longbows',
  105: 'Shortbows',
  106: 'Darts',
  107: 'Slings',
  111: 'Style: Two-handed',
  112: 'Style: Shield',
  113: 'Style: Single',
  114: 'Style: Dual',
} as const;

export const WeapprofKeys = _.keys(weapprofTab);

export const WeapprofValues = _.values(weapprofTab);
