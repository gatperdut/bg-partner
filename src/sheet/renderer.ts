import { Sprite } from '../sprite/sprite';
import { EaTable } from '../tables/ea';
import { RaceTable } from '../tables/race';
import './sheet.scss';

export type SheetAPIUpdateParams = { sprite: Sprite; eaTable: EaTable; raceTable: RaceTable };

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
  private sprite: Sprite;

  private dragging: boolean = false;

  constructor() {
    window.sheetAPI.update((params: SheetAPIUpdateParams): void => {
      this.sprite = params.sprite;

      document.getElementById('name').textContent = params.sprite.name;

      document.getElementById('enemyAlly').title = params.eaTable[params.sprite.enemyAlly];

      document.getElementById('hp').textContent = params.sprite.hp.toString();

      document.getElementById('hpMax').textContent = params.sprite.derived.hpMax.toString();

      document.getElementById('race').textContent = params.raceTable[params.sprite.race];
    });

    document.body.addEventListener(
      'contextmenu',
      (): void => {
        window.sheetAPI.close(this.sprite.id);
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

      window.sheetAPI.move(this.sprite.id, movement);
    });
  }
}

new SheetRenderer();
