import _ from 'lodash-es';
import { handlers } from '../../handlers';
import { effTable } from '../../tables/eff';
import { EffFactory } from './eff-factory';
import { Eff } from './impl/eff';

export class Effs {
  public effs: Eff[] = [];

  private effFactory: EffFactory = new EffFactory();

  // TODO we include State_Set_State here because we deal with it separately.
  public invalidRegex: RegExp =
    /^(Graphics|Script|Colour|Overlay|Stat_Magical|State_Set_State|Use_EFF_File|Text)|Sound_Effect$/;

  constructor(private base: bigint) {
    // Empty
  }

  private printed: boolean = false;

  public run(): void {
    this.effs.length = 0;

    const count: number = handlers.memread.memReadNumber(this.base + BigInt(0x18), 'INT32');

    let nodePtr: bigint = handlers.memread.memReadBigint(this.base + BigInt(0x8), 'ADDR');

    for (let i: number = 0; i < count; i++) {
      const effPtr: bigint = handlers.memread.memReadBigint(nodePtr + BigInt(0x10), 'ADDR');

      const id: number = handlers.memread.memReadNumber(effPtr + BigInt(0x8 + 0x8), 'UINT32');

      nodePtr = handlers.memread.memReadBigint(nodePtr, 'ADDR');

      if (this.invalid(id)) {
        continue;
      }

      const eff: Eff = this.effFactory.create(id, effPtr);

      this.effs.push(eff);
    }

    if (!this.printed) {
      _.each(this.effs, (eff: Eff): void => {
        eff.summary();
      });

      this.printed = true;
    }
  }

  public invalid(id: number): boolean {
    return this.invalidRegex.test(effTable[id]);
  }
}
