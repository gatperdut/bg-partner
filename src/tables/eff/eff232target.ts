import _ from 'lodash';

export type Eff232TargetTab = typeof eff232TargetTab;

export type Eff232TargetKey = keyof Eff232TargetTab;

export type Eff232TargetValue = Eff232TargetTab[keyof Eff232TargetTab];

export const eff232TargetTab = {
  0: 'Myself',
  1: 'Last attacker',
  2: 'Nearest enemy',
  3: 'Nearest',
} as const;

export const Eff232TargetKeys = _.keys(eff232TargetTab);

export const Eff232TargetValues = _.values(eff232TargetTab);
