import _ from 'lodash';

export type Eff0TypeTab = typeof eff0TypeTab;

export type Eff0TypeKey = keyof Eff0TypeTab;

export type Eff0TypeValue = Eff0TypeTab[keyof Eff0TypeTab];

export const eff0TypeTab = {
  0: 'Modifier',
  1: 'Crushing',
  2: 'Missile',
  4: 'Piercing',
  8: 'Slashing',
  16: 'Base',
} as const;

export const Eff0TypeKeys = _.keys(eff0TypeTab);

export const Eff0TypeValues = _.values(eff0TypeTab);
