import { Effs } from '@sprite/effs/effs';
import { Eff } from '@sprite/effs/impl/eff';
import { EffKey } from '@tables/eff';
import { Component, ComponentData } from '@views/shared/component';
import { BuffSingle } from '@views/sheet/components/buffs/buff-single/buff-single';
import { BuffFactory } from '@views/sheet/components/buffs/buffs/buff-factory';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';
import _ from 'lodash';

export type BuffsData = ComponentData & {
  buffSinglesHtml: string[];

  buffGroupsHtml: string[][];

  buffItemsHtml: string[];
};

export class Buffs extends Component {
  constructor(buffs: Eff[], fromItem: boolean, groupsAllow: boolean) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffs);

    const buffSqueezes: string[] = this.buffSqueezesHtml(buffs);

    const buffSinglesHtml: string[] = this.buffSinglesHtml(buffs, fromItem, groupsAllow);

    const buffGroupsHtml: string[][] = this.buffGroupsHtml(buffs, fromItem, groupsAllow);

    const buffItemsHtml: string[] = this.buffItemsHtml(buffs, fromItem);

    const buffsData: BuffsData = {
      ...this.componentData,
      buffSinglesHtml: [...buffSinglesHtml, ...buffSqueezes],
      buffGroupsHtml: buffGroupsHtml,
      buffItemsHtml: buffItemsHtml,
    };

    this.html = compiled(buffsData);
  }

  private buffSqueezesHtml(buffs: Eff[]): string[] {
    const effsSqueezed: Eff[] = _.filter(buffs, (eff: Eff): boolean => eff.squeezed);

    const buffSingles: BuffSingle[] = [];

    const base64s: string[] = [];

    _.each(Effs.effsSqueezes, (effsSqueeze: number[]): void => {
      for (let i: number = 0; i < effsSqueezed.length; i++) {
        if (
          _.includes(effsSqueeze, effsSqueezed[i].key) &&
          !_.includes(base64s, effsSqueezed[i].resImage.base64)
        ) {
          buffSingles.push(BuffFactory.single(effsSqueezed[i]));

          base64s.push(effsSqueezed[i].resImage.base64);
        }
      }
    });

    return _.map(buffSingles, (buffSingle: BuffSingle): string => buffSingle.html);
  }

  private buffSinglesHtml(buffs: Eff[], fromItem: boolean, groupsAllow: boolean): string[] {
    return _.map(
      _.filter(
        buffs,
        (eff: Eff): boolean =>
          !eff.squeezed && (fromItem || eff.ressrcType === 'SPL') && (!eff.grouped || !groupsAllow),
      ),
      (eff: Eff): string => BuffFactory.single(eff).html,
    );
  }

  private buffGroupsHtml(buffs: Eff[], fromItem: boolean, groupsAllow: boolean): string[][] {
    const buffsByCodeByEffKey = _.mapValues(
      _.groupBy(
        _.filter(
          buffs,
          (eff: Eff): boolean =>
            !eff.squeezed && (fromItem || eff.ressrcType === 'SPL') && eff.grouped && groupsAllow,
        ),
        (eff: Eff): string => eff.ressrc.code,
      ),
      (effs: Eff[]): Record<number, Eff[]> => _.groupBy(effs, (eff: Eff): EffKey => eff.key),
    );

    return _.map(_.keys(buffsByCodeByEffKey), (code: string): string[] => {
      return _.map(
        _.keys(buffsByCodeByEffKey[code]).map(Number),
        (effKey: EffKey): string => BuffFactory.group(buffsByCodeByEffKey[code][effKey]).html,
      );
    });
  }

  private buffItemsHtml(buffs: Eff[], fromItem: boolean): string[] {
    const buffItemsByCode: Record<string, Eff[]> = _.groupBy(
      _.filter(buffs, (eff: Eff): boolean => !fromItem && eff.ressrcType === 'ITM'),
      (eff: Eff): string => !eff.squeezed && eff.ressrcParent.code,
    );

    return _.map(
      _.keys(buffItemsByCode),
      (code: string): string => BuffFactory.item(buffItemsByCode[code]).html,
    );
  }
}
