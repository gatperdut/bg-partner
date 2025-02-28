import Handlebars from 'handlebars';
import { SpriteView } from '../sprite-view';

export class Abilities {
  public html: string;

  constructor(template: any, private spriteView: SpriteView) {
    const compiled = Handlebars.compile(template);

    this.html = compiled(spriteView);
  }
}
