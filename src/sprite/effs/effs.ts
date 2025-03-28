import { handlers } from '@handlers';
import { EffFactory } from '@sprite/effs/eff-factory';
import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import _ from 'lodash';

export const EffTypes = ['buffs', 'imms', 'hit'] as const;

export type EffType = (typeof EffTypes)[number];

export const EffSources = ['timed', 'equipped'] as const;

export type EffSource = (typeof EffSources)[number];

export class Effs {
  public effs: Record<EffType, Eff[]> = {
    buffs: [],
    imms: [],
    hit: [],
  };

  public groups: Record<EffType, EffKey[]> = {
    buffs: [0, 101, 102, 120, 206, 259],
    imms: [100, 101, 206, 293, 308, 310, 318, 324, 367, 208, 120],
    hit: [248, 249],
    // statmods: [33, 34, 35, 36, 37, 189, 166, 173],
  };

  public static effsIgnored: EffKey[] = [
    6, 7, 8, 9, 10, 12, 14, 15, 18, 19, 41, 42, 44, 49, 50, 51, 52, 53, 59, 61, 65, 66, 84, 85, 90,
    91, 92, 93, 103, 106, 107, 114, 119, 135, 138, 139, 140, 141, 142, 144, 145, 146, 154, 155, 156,
    158, 169, 170, 173, 174, 177, 184, 186, 187, 208, 215, 233, 240, 265, 267, 271, 275, 276, 277,
    282, 283, 287, 290, 291, 293, 295, 296, 297, 309, 313, 315, 327, 328, 330, 336, 360,
  ];

  public static effsGrouped: number[] = [0, 83, 102, 200, 201, 259];

  public static effsSqueezes: number[][] = [
    [3, 101],
    [20], // Mislead
    [54, 73, 0], // Tenser's transformation
    [0, 40], // Slow
    [197],
    [33, 34, 35, 36, 37],
    [101, 120, 206],
  ];

  constructor(private baseTimed: bigint, private baseEquipped: bigint) {
    // Empty
  }

  public run(): void {
    _.each(EffTypes, (effType: EffType): void => {
      this.effs[effType].length = 0;
    });

    this.runInternal(this.baseTimed, 'timed');

    this.runInternal(this.baseEquipped, 'equipped');
  }

  private runInternal(base: bigint, source: EffSource): void {
    const count: number = handlers.memread.memReadNumber(base + BigInt(0x18), 'INT32');

    let nodePtr: bigint = handlers.memread.memReadBigint(base + BigInt(0x8), 'ADDR');

    for (let i: number = 0; i < count; i++) {
      const effPtr: bigint = handlers.memread.memReadBigint(nodePtr + BigInt(0x10), 'ADDR');

      const effKey: EffKey = handlers.memread.memReadNumber(
        effPtr + BigInt(0x8 + 0x8),
        'UINT32',
      ) as EffKey;

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');

      if (_.includes(Effs.effsIgnored, effKey)) {
        continue;
      }

      const eff: Eff = EffFactory.create(effKey, effPtr, source);

      if (!eff.loaded) {
        continue;
      }

      let added: boolean = false;

      for (let j: number = 0; j < EffTypes.length; j++) {
        const effType: EffType = EffTypes[j];

        if (_.includes(this.groups[effType], effKey)) {
          this.effs[effType].push(eff);

          added = true;
        }
      }

      if (!added) {
        this.effs.buffs.push(eff);
      }
    }
  }
}
