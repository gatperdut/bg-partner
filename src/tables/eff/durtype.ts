import _ from 'lodash';

export type Durtype = typeof durtypeTab;

export type DurtypeKey = keyof Durtype;

export type DurtypeValue = Durtype[keyof Durtype];

export const durtypeTab = {
  0: 'Instant/Limited',
  1: 'Instant/Permanent',
  2: 'Instant/While equipped',
  3: 'Delay/Limited',
  4: 'Delay/Permanent',
  5: 'Delay/While equipped',
  6: 'Limited after duration',
  7: 'Permanent after duration',
  8: 'Equipped after duration',
  9: 'Instant/Permanent',
  10: 'Instant/Limited',
  4096: 'Absolute',
} as const;

export const DurtypeKeys = _.keys(durtypeTab);

export const DurtypeValues = _.values(durtypeTab);
