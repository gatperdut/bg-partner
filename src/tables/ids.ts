import { AlignKey, alignTab, AlignValue } from '@tables/align';
import { ClassKey, classTab, ClassValue } from '@tables/class';
import { EaKey, eaTab, EaValue } from '@tables/ea';
import { GenderKey, genderTab, GenderValue } from '@tables/gender';
import { GeneralKey, generalTab, GeneralValue } from '@tables/general';
import { KitKey, kitTab, KitValue } from '@tables/kit';
import { RaceKey, raceTab, RaceValue } from '@tables/race';
import { SpecificKey, specificTab, SpecificValue } from '@tables/specific';
import _ from 'lodash';

export type IdsTab = typeof idsTab;

export type IdsKey = keyof IdsTab;

export type IdsValue = IdsTab[keyof IdsTab];

export const idsTab = {
  2: eaTab,
  3: generalTab,
  4: raceTab,
  5: classTab,
  6: specificTab,
  7: genderTab,
  8: alignTab,
  9: kitTab,
} as const;

export const IdsKeys = _.keys(idsTab);

export const IdsValues = _.values(idsTab);

export type IdsKeyAll =
  | EaKey
  | GeneralKey
  | RaceKey
  | ClassKey
  | SpecificKey
  | GenderKey
  | AlignKey
  | KitKey;

export type IdsValueAll =
  | EaValue
  | GeneralValue
  | RaceValue
  | ClassValue
  | SpecificValue
  | GenderValue
  | AlignValue
  | KitValue;
