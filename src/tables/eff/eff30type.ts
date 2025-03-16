import _ from 'lodash';

export type Eff30TypeTab = typeof eff30TypeTab;

export type Eff30TypeKey = keyof Eff30TypeTab;

export type Eff30TypeValue = Eff30TypeTab[keyof Eff30TypeTab];

export const eff30TypeTab = {
  0: 'Cumulative',
  1: 'Flat',
  2: 'Percentage',
} as const;

export const Eff30TypeKeys = _.keys(eff30TypeTab);

export const Eff30TypeValues = _.values(eff30TypeTab);
