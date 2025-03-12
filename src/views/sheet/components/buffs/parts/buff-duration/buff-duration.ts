import Handlebars from 'handlebars';
import { ComponentsRecord } from '../../../../../../components/components';
import { Eff } from '../../../../../../sprite/effs/impl/eff';

export type BuffDurationData = {
  duration: number;
};

export class BuffDuration {
  public html: string;

  constructor(components: ComponentsRecord, eff: Eff, time: number) {
    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(components.buffDuration);

    const duration: number = Math.round((eff.duration - time) / 15);

    const buffDurationData: BuffDurationData = {
      duration: duration,
    };

    this.html = compiled(buffDurationData);
  }
}
