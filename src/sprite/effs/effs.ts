import { handlers } from '@handlers';
import { EffFactory } from '@sprite/effs/eff-factory';
import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import _ from 'lodash';

export const EffTypes = ['buffs', 'imms', 'profs', 'statmods', 'states', 'maybe'] as const;

export type EffType = (typeof EffTypes)[number];

export const EffSources = ['timed', 'equipped'] as const;

export type EffSource = (typeof EffSources)[number];

export class Effs {
  public effs: Record<EffType, Eff[]> = {
    buffs: [],
    imms: [],
    profs: [],
    statmods: [],
    states: [],
    maybe: [],
  };

  public groups: Record<EffType, EffKey[]> = {
    buffs: [],
    imms: [100, 101, 206, 293, 308, 310, 318, 324, 367, 208],
    profs: [233],
    statmods: [33, 34, 35, 36, 37, 189, 166, 173],
    states: [328],
    maybe: [106, 360],
  };

  public static effsIgnored: EffKey[] = [
    7, 8, 9, 14, 41, 42, 50, 51, 52, 53, 59, 65, 66, 84, 85, 90, 91, 92, 103, 114, 135, 138, 139,
    140, 141, 142, 153, 154, 155, 156, 158, 169, 170, 174, 177, 184, 186, 187, 215, 240, 265, 267,
    271, 275, 276, 277, 282, 283, 287, 290, 291, 293, 295, 296, 309, 313, 315, 327, 330, 336,
  ];

  public static effsGrouped: number[] = [83, 102];

  constructor(private baseTimed: bigint, private baseEquipped: bigint) {
    // Empty
  }

  private printed: boolean = false;

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

      const id: EffKey = handlers.memread.memReadNumber(
        effPtr + BigInt(0x8 + 0x8),
        'UINT32',
      ) as EffKey;

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');

      if (_.includes(Effs.effsIgnored, id)) {
        continue;
      }

      const eff: Eff = EffFactory.create(id, effPtr, source);

      let added: boolean = false;

      for (let j: number = 0; j < EffTypes.length; j++) {
        const effType: EffType = EffTypes[j];

        if (_.includes(this.groups[effType], id)) {
          this.effs[effType].push(eff);

          added = true;

          break;
        }
      }

      if (!added) {
        this.effs.buffs.push(eff);
      }
    }

    if (!this.printed) {
      _.each(EffTypes, (effType: EffType): void => {
        console.log('***', effType);
        _.each(this.effs[effType], (eff: Eff): void => {
          eff.summary();
        });
      });

      this.printed = true;
    }
  }
}
