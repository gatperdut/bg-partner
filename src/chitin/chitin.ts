import { Bif } from '@chitin/bif';
import { ResImageDefault } from '@chitin/res/image/res-image-default';
import { ResEff } from '@chitin/res/impl/eff/res-eff';
import { ResItm } from '@chitin/res/impl/itm/res-itm';
import { ResItmHit } from '@chitin/res/impl/itm/res-itm-hit';
import { Res } from '@chitin/res/impl/res';
import { ResSpl } from '@chitin/res/impl/res-spl';
import { ResBifFactory } from '@chitin/res/res-bif-factory';
import { ResOverrideFactory } from '@chitin/res/res-override-factory';
import { handlers } from '@handlers';
import { ProValue, ProValues } from '@tables/pro';
import { ResextKey, ResextValue, resextTab } from '@tables/resext';
import fs, { Stats } from 'fs';
import _ from 'lodash';
import path from 'path';

export class Chitin {
  public bifs: Bif[] = [];

  public ress: Partial<Record<ResextValue, Record<string, Res>>> = {};

  private resBifFactory: ResBifFactory = new ResBifFactory();

  private resOverrideFactory: ResOverrideFactory = new ResOverrideFactory();

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

      const res: Res = this.resBifFactory.create(ext, resBuffer, this.bifs);

      this.resAdd(ext, res);
    }

    this.override();
  }

  private override(): void {
    const directory: string = path.join(handlers.config.obj.path, 'override');

    if (!fs.existsSync(directory)) {
      console.log(`The directory ${directory} does not exist.`);

      return;
    }

    const stats: Stats = fs.statSync(directory);

    if (!stats.isDirectory()) {
      console.error(`${directory} is not a directory.`);
      return;
    }

    const exts: ResextValue[] = ['SPL', 'EFF', 'ITM', 'BAM'];

    const filesByResExt = fs
      .readdirSync(directory)
      .reduce((acc: Record<ResextValue, string[]>, file: string): Record<ResextValue, string[]> => {
        const match = file.match(/\.([^.]+)$/);

        if (match.length) {
          const ext: ResextValue = match[1].toUpperCase() as ResextValue;

          if (_.includes(exts, ext)) {
            const key: ResextValue = ext.toUpperCase() as ResextValue;

            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(path.join(directory, file));
          }
        }

        return acc;
      }, {} as Record<ResextValue, string[]>);

    _.each(exts, (ext: ResextValue): void => {
      for (let i: number = 0; i < filesByResExt[ext].length; i++) {
        const file: string = filesByResExt[ext][i];

        const buffer: Buffer = fs.readFileSync(file);

        const res: Res = this.resOverrideFactory.create(ext, path.parse(file).name, buffer);

        console.log('added', file, path.parse(file).name, ext);

        this.resAdd(ext, res);
      }
    });
  }

  private resAdd(ext: ResextValue, res: Res): void {
    if (!res) {
      return;
    }

    if (!this.ress[ext]) {
      this.ress[ext] = {};
    }

    this.ress[ext][res.code] = res;
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
