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
      window.eyeAPI.open(this.sprite.id);
    });

    window.eyeAPI.initialize((sprite: Sprite): void => {
      this.sprite = sprite;
    });
  }
}

new EyeRenderer();
