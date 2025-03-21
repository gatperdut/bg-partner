import { ResItm } from '@chitin/res/impl/res-itm';
import { handlers } from '@handlers';
import { SlotKey, SlotKeys } from '@tables/slot';
import _ from 'lodash';

export class Gear {
  public slots: Record<SlotKey, ResItm> = {} as Record<SlotKey, ResItm>;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    const selectedWeapon: number = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x138),
      'UINT8',
    );

    _.each(SlotKeys, (key: SlotKey, index: number): void => {
      const itmHelperPtr: bigint = handlers.memread.memReadBigint(
        this.base + BigInt(8 * index),
        'ADDR',
      );

      this.slots[key] = handlers.chitin.ress.ITM[
        handlers.memread.memReadString(itmHelperPtr + BigInt(0x8 + 0x8)).toLowerCase()
      ] as ResItm;
    });

    console.log(this.slots);
  }
}
