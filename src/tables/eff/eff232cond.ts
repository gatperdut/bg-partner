import _ from 'lodash';

export type Eff232CondTab = typeof eff232CondTab;

export type Eff232CondKey = keyof Eff232CondTab;

export type Eff232CondValue = Eff232CondTab[keyof Eff232CondTab];

export const eff232CondTab = {
  0: 'Hit', //([ANYONE]) — Checked every time
  1: 'See enemy', //([EVILCUTOFF]) — Checked once per round
  2: 'HP < 50%', //(Myself,50) — Checked once per round
  3: 'HP < 25%', //(Myself,25) — Checked once per round
  4: 'HP < 10%', //(Myself,10) — Checked once per round
  5: 'Helpless', //(Myself,STATE_HELPLESS) f.i. unconscious — Checked once per round
  6: 'Poisoned', //(Myself,STATE_POISONED) — Checked once per round
  7: 'Attacked', //([ANYONE]) — Checked every time
  8: 'Distance 4', //([ANYONE],4) — Checked once per round
  9: 'Distance 10', //([ANYONE],10) — Checked once per round
  10: 'Delay', //(Extra) — Checked once per round
  11: 'Take damage', //() — Checked every time
  12: 'Killed', //([ANYONE]) — Checked every time
  13: 'Time of day', //(Extra) — Checked once per round
  14: 'Distance parameter', //([ANYONE],Extra) — Checked once per round
  15: 'State parameter', //([ANYONE],Extra) — Checked once per round
  16: 'Die', //()
  17: 'Died', //([ANYONE]) — Checked every time
  18: 'Turned by', //([ANYONE]) — Checked every time
  19: 'HP < parameter%', //(Myself,Extra) — Checked once per round
  20: 'HP% < parameter%', //(Myself,Extra) — Checked once per round
  21: 'Check spell state', //(Myself,Extra) — Checked once per round
} as const;

export const Eff232CondKeys = _.keys(eff232CondTab);

export const Eff232CondValues = _.values(eff232CondTab);
