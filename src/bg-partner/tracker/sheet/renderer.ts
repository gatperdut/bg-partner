import { Sprite } from '../../sprite';
import './sheet.css';

declare global {
  interface Window {
    sheetAPI: any;
  }
}

class SheetRenderer {
  private sprite: Sprite;

  constructor() {
    window.sheetAPI.onInitialize((sprite: Sprite): void => {
      this.sprite = sprite;

      document.getElementById('name').textContent = sprite.name;
    });

    document.body.addEventListener(
      'click',
      (): void => {
        console.log('sheet close');
        window.sheetAPI.sheetClose(this.sprite.id);
      },
      true
    );
  }
}

new SheetRenderer();
