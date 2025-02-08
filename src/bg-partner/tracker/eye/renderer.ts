import { Sprite } from '../../sprite';
import './eye.css';

declare global {
  interface Window {
    trackerAPI: any;
  }
}

class EyeRenderer {
  private eye: HTMLElement = document.getElementById('eye');

  private sprite: Sprite;

  constructor() {
    this.eye.addEventListener('click', (): void => {
      window.trackerAPI.eyeClick(this.sprite.id);
    });

    window.trackerAPI.onInitialize((sprite: Sprite): void => {
      this.sprite = sprite;
    });
  }
}

new EyeRenderer();
