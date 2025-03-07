import _ from 'lodash-es';
import { handlers } from '../../handlers';
import { Eff } from './eff';

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

  public groups: Record<EffType, number[]> = {
    buffs: [],
    imms: [100, 101, 206, 293, 308, 310, 318, 324, 367, 208],
    profs: [233],
    statmods: [33, 34, 35, 36, 37, 189, 166, 173],
    states: [328],
    maybe: [106],
  };

  public static effsIgnored: number[] = [
    14, 41, 53, 66, 114, 135, 138, 140, 141, 142, 169, 170, 184, 215, 240, 271, 287, 291, 295, 296,
    315, 327, 336, 186, 187, 265, 282, 293, 309, 7, 8, 9, 50, 51, 52, 65, 153, 154, 155, 156, 158,
    84, 85, 177, 283, 103, 139, 267, 290, 330, 174, 42, 313, 277, 276, 275, 92, 91, 90, 59,
  ];

  public static effsGrouped: number[] = [102];

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

      const id: number = handlers.memread.memReadNumber(effPtr + BigInt(0x8 + 0x8), 'UINT32');

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');

      if (_.includes(Effs.effsIgnored, id)) {
        continue;
      }

      const eff: Eff = new Eff(id, effPtr, source);

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
