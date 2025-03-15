import { DurtypeKey } from '@tables/eff/durtype';
import { Component, ComponentData } from '@views/shared/component';
import { sheetdata } from '@views/sheet/sheetdata';
import Handlebars from 'handlebars';

export type BuffDurationData = ComponentData & {
  duration: string;
};

export class BuffDuration extends Component {
  protected buffDurationData: BuffDurationData;

  constructor(duration: number, durtype: DurtypeKey, time: number, key: number) {
    super();

    const compiled: HandlebarsTemplateDelegate = Handlebars.compile(sheetdata.hbs.buffDuration);

    let durationStr: string[] = [];

    switch (durtype) {
      case 2:
        durationStr.push('♾️');

        break;
      case 4096:
        const secondsTotal: number = Math.round((duration - time) / 15);

        const roundsTotal: number = Math.floor(secondsTotal / 6);

        const turns: number = Math.floor(roundsTotal / 10);

        const rounds: number = roundsTotal % 10;

        const seconds: number = secondsTotal % 6;

        if (turns) {
          durationStr.push(turns + 'T');
        }

        if (turns || rounds) {
          durationStr.push(rounds + 'R');
        }

        durationStr.push(seconds + 1 + 'S');

        break;
      default:
        durationStr.push(durtype + '❓');
        break;
    }

    this.buffDurationData = {
      ...this.componentData,
      title: 'Duration',
      duration: durationStr.join(' '),
    };

    this.html = compiled(this.buffDurationData);
  }
}
