import { ResBam } from '../../../chitin/res/impl/bam/res-bam';
import { ResSpl } from '../../../chitin/res/impl/res-spl';
import { handlers } from '../../../handlers';
import { effTable } from '../../../tables/eff';

export abstract class Eff {
  // Memory fields

  public school: number;

  public secondaryType: number;

  public res: string;

  public res2: string;

  public res3: string;

  public resSource: string;

  public param1: number;

  public param2: number;

  public param3: number;

  public param4: number;

  public param5: number;

  // Custom fields

  public image: string;

  public size: Electron.Size;

  constructor(public id: number, protected base: bigint) {
    this.school = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x44), 'UINT32');

    this.secondaryType = handlers.memread.memReadNumber(base + BigInt(0x8 + 0xc8), 'INT32');

    this.res = handlers.memread.memReadString(base + BigInt(0x8 + 0x28));

    this.res2 = handlers.memread.memReadString(base + BigInt(0x8 + 0x68));

    this.res3 = handlers.memread.memReadString(base + BigInt(0x8 + 0x70));

    this.resSource = handlers.memread.memReadString(base + BigInt(0x8 + 0x8c));

    this.param1 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x14), 'INT32');

    this.param2 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x58), 'INT32');

    this.param3 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x5c), 'INT32');

    this.param4 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x60), 'INT32');

    this.param5 = handlers.memread.memReadNumber(base + BigInt(0x8 + 0x64), 'INT32');

    this.imageSet();
  }

  private imageSet(): void {
    const resBam: ResBam = handlers.chitin.ress.BAM[
      (handlers.chitin.ress.SPL[this.resSource] as ResSpl)?.bam
    ] as ResBam;

    if (!resBam) {
      return;
    }

    resBam.image().then((imageBuf: Buffer): void => {
      this.image = imageBuf.toString('base64');
    });

    this.size = resBam.size;
  }

  public summary(): void {
    console.log(
      `${effTable[this.id]} ${this.param1} ${this.param2} ${this.param3} ${this.param4} ${
        this.param5
      }`
    );
  }
}
