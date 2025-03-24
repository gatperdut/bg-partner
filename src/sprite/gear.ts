import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { handlers } from '@handlers';
import { ItemcatKey } from '@tables/ids/itemcat';
import { SlotKey, SlotKeys } from '@tables/slot';
import _ from 'lodash';

export class Gear {
  public slots: Record<SlotKey, ResItm> = {} as Record<SlotKey, ResItm>;

  public mainhand: ResItm;

  public offhand: ResItm;

  public launcher: ResItm;

  constructor(private base: bigint) {
    // Empty
  }

  public run(): void {
    _.each(SlotKeys, (key: SlotKey, index: number): void => {
      const itmHelperPtr: bigint = handlers.memread.memReadBigint(
        this.base + BigInt(8 * index),
        'ADDR',
      );

      const code = handlers.memread
        .memReadString(itmHelperPtr + BigInt(0x8 + 0x8), 8)
        .toLowerCase();

      this.slots[key] = handlers.chitin.ress.ITM[code] as ResItm;
    });

    const selectedWeapon: SlotKey = handlers.memread.memReadNumber(
      this.base + BigInt(0x0 + 0x138),
      'UINT8',
    ) as SlotKey;

    this.mainhand = this.slots[selectedWeapon];

    if (!this.mainhand.preventsDualwield && this.slots[9]?.melee) {
      this.offhand = this.slots[9];
    }

    let launcherType: ItemcatKey;

    switch (this.mainhand.type) {
      case 0x05:
        launcherType = 0xf;
        break;
      case 0x0e:
        launcherType = 0x12;
        break;
      case 0x1f:
        launcherType = 0x1b;
    }

    for (let i: number = 35; i <= 38; i++) {
      const launcher: ResItm = this.slots[i as SlotKey];

      if (launcher?.type === launcherType) {
        this.launcher = launcher;
      }
    }
  }
}
