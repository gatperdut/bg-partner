import fs from 'fs';
import _ from 'lodash-es';
import path from 'path';
import { handlers } from '../handlers';
import { ProValue, proValues } from '../tables/pro';
import { Resext, resextTable } from '../tables/resext';
import { Bif } from './bif';
import { Res } from './res/impl/res';
import { ResItm } from './res/impl/res-itm';
import { ResFactory } from './res/res-factory';

export class Chitin {
  public bifs: Bif[] = [];

  public ress: Partial<Record<Resext, Record<string, Res>>> = {};

  private resFactory: ResFactory = new ResFactory();

  public proValue2Itms: Record<ProValue, ResItm[]> = {} as Record<ProValue, ResItm[]>;

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

      this.ress[ext][res.code] = res;
    }

    this.proValue2ItmSetup();
  }

  private proValue2ItmSetup(): void {
    _.each(proValues, (proValue: ProValue): void => {
      this.proValue2Itms[proValue] = [];

      _.each(_.values(this.ress.ITM), (resItm: ResItm): void => {
        if (_.includes(resItm.proValues, proValue)) {
          if (!_.includes(this.proValue2Itms[proValue], resItm)) {
            this.proValue2Itms[proValue].push(resItm);
          }
        }
      });
    });
  }
}
