import { EaTable } from '../../tables/ea';
import { RaceTable } from '../../tables/race';
import './sheet.scss';
import { SpriteView } from './sprite-view';

export type SheetAPIUpdateParams = {
  spriteView: SpriteView;
  eaTable: EaTable;
  raceTable: RaceTable;
};

export type SheetAPIUpdateMethod = (params: SheetAPIUpdateParams) => void;

export type SheetAPIMove = (id: number, movement: Electron.Point) => void;

export type SheetAPIUpdate = (data: SheetAPIUpdateMethod) => void;

export type SheetAPIClose = (id: number) => void;

export type SheetAPI = {
  move: SheetAPIMove;
  update: SheetAPIUpdate;
  close: SheetAPIClose;
};

declare global {
  interface Window {
    sheetAPI: SheetAPI;
  }
}

class SheetRenderer {
  private sprite: SpriteView;

  private dragging: boolean = false;

  constructor() {
    window.sheetAPI.update((params: SheetAPIUpdateParams): void => {
      this.sprite = params.spriteView;

      this.update(params);
    });

    this.setEventListeners();
  }

  private update(params: SheetAPIUpdateParams): void {
    document.getElementById('name').textContent = params.spriteView.basic.name;

    document.getElementById('enemyAlly').title =
      params.eaTable[params.spriteView.profile.enemyAlly];

    document.getElementById('hp').textContent = params.spriteView.basic.hp.toString();

    document.getElementById('hpMax').textContent = params.spriteView.derived.hpMax.toString();

    document.getElementById('race').textContent = params.raceTable[params.spriteView.profile.race];
  }

  private setEventListeners(): void {
    // I assume these listeners do not need to be removed?
    document.body.addEventListener(
      'contextmenu',
      (): void => {
        window.sheetAPI.close(this.sprite.basic.id);
      },
      true
    );

    document.addEventListener('mousedown', (): void => {
      this.dragging = true;
    });

    document.addEventListener('mouseup', (): void => {
      this.dragging = false;
    });

    document.addEventListener('mousemove', (event: MouseEvent): void => {
      if (!this.dragging) {
        return;
      }

      const movement: Electron.Point = {
        x: event.movementX,
        y: event.movementY,
      };

      window.sheetAPI.move(this.sprite.basic.id, movement);
    });
  }
}

new SheetRenderer();
