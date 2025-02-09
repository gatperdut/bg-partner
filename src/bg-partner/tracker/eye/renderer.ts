import { Sprite } from '../../sprite';
import './eye.scss';

declare global {
  interface Window {
    eyeAPI: any;
  }
}

class EyeRenderer {
  private sprite: Sprite;

  constructor() {
    document.getElementById('eye').addEventListener('click', (): void => {
      window.eyeAPI.sheetOpen(this.sprite.id);
    });

    window.eyeAPI.onInitialize((sprite: Sprite): void => {
      this.sprite = sprite;
    });
  }
}

new EyeRenderer();
