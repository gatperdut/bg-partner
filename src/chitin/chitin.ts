import { Bif } from '@chitin/bif';
import { ResImageDefault } from '@chitin/res/image/res-image-default';
import { ResEff } from '@chitin/res/impl/eff/res-eff';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { ResItmHit } from '@chitin/res/impl/itm/res-itm-hit';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResFactory } from '@chitin/res/res-factory';
import { handlers } from '@handlers';
import { ProValue, ProValues } from '@tables/pro';
import { ResextKey, ResextValue, resextTab } from '@tables/resext';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

export class Chitin {
  public bifs: Bif[] = [];

  public ress: Partial<Record<ResextValue, Record<string, Res>>> = {};

  private resFactory: ResFactory = new ResFactory();

  public proValue2Itms: Record<ProValue, ResItm[]> = {} as Record<ProValue, ResItm[]>;

  public resImageDefault: ResImageDefault = new ResImageDefault();

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

      const ext: ResextValue = resextTab[chitin.readInt16LE(resOffset + 0x8) as ResextKey];

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
  }

  public setup(): void {
    this.itmsImage();

    this.splsImage();

    this.proValue2ItmSetup();

    this.itmHitSetup();

    this.effHitSetup();
  }

  private itmsImage(): void {
    _.each(_.values(this.ress.ITM), (resItm: ResItm): void => {
      resItm.resImageSet();
    });
  }

  private splsImage(): void {
    _.each(_.values(this.ress.SPL), (resSpl: ResSpl): void => {
      resSpl.resImageSet();
    });
  }

  private proValue2ItmSetup(): void {
    _.each(ProValues, (proValue: ProValue): void => {
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

  private itmHitSetup(): void {
    _.each(_.values(this.ress.ITM), (resItm: ResItm): void => {
      resItm.resItmHitsDelayed();

      _.each(
        [...resItm.resItmHitsMelee, ...resItm.resItmHitsRanged],
        (resItmHit: ResItmHit): void => {
          resItmHit.resSet();
        },
      );
    });
  }

  private effHitSetup(): void {
    _.each(_.values(this.ress.EFF), (resEff: ResEff): void => {
      resEff.resEffHit.resSet();
    });
  }
}
