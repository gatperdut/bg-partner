import fs from 'fs';
import _ from 'lodash-es';
import path from 'path';
import { handlers } from '../handlers';
import { Resext, resextTable } from '../tables/resext';
import { Bif } from './bif';
import { Res } from './res/impl/res';
import { ResItm } from './res/impl/res-itm';
import { ResPro } from './res/impl/res-pro';
import { ResFactory } from './res/res-factory';

export class Chitin {
  public bifs: Bif[] = [];

  public ress: Partial<Record<Resext, Record<string, Res>>> = {};

  private resFactory: ResFactory = new ResFactory();

  constructor() {
    const chitin: Buffer = fs.readFileSync(path.join(handlers.config.obj.path, 'chitin.key'));

    const bifsCount: number = chitin.readInt32LE(0x8);

    const bifsOffset: number = chitin.readInt32LE(0x10);

    for (let i: number = 0; i < bifsCount; i++) {
      const bifOffset: number = bifsOffset + i * 12;

      const bif: Bif = new Bif(chitin, bifOffset);

      this.bifs.push(bif);
    }

    const resCount: number = chitin.readInt32LE(0xc);

    const ressOffset: number = chitin.readInt32LE(0x14);

    for (let i: number = 0; i < resCount; i++) {
      const resOffset: number = ressOffset + i * 14;

      const ext: Resext = resextTable[chitin.readInt16LE(resOffset + 0x8)];

      const resBuffer: Buffer = chitin.subarray(resOffset, resOffset + 14);

      const res: Res = this.resFactory.create(ext, resBuffer, this.bifs);

      if (!res) {
        continue;
      }

      if (!this.ress[ext]) {
        this.ress[ext] = {};
      }

      this.ress[ext][res.name] = res;
    }

    this.linkPro2Itm();
  }

  private linkPro2Itm(): void {
    const resProKeys: string[] = _.keys(this.ress.PRO);

    const resItmKeys: string[] = _.keys(this.ress.ITM);

    for (let pro: number = 0; pro < resProKeys.length; pro++) {
      const resPro: ResPro = this.ress.PRO[resProKeys[pro]] as ResPro;

      for (let itm: number = 0; itm < resItmKeys.length; itm++) {
        const resItm: ResItm = this.ress.ITM[resItmKeys[itm]] as ResItm;

        if (resItm.pro === resPro.name) {
          resPro.resItm = resItm;

          break;
        }
      }
    }
  }
}
