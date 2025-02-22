import { Sprite } from '../sprite/sprite';
import { EaTable } from '../tables/ea';
import { RaceTable } from '../tables/race';
import './sheet.scss';

export type SheetAPIOnUpdateParams = { sprite: Sprite; eaTable: EaTable; raceTable: RaceTable };

export type SheetAPIOnUpdateMethod = (params: SheetAPIOnUpdateParams) => void;

export type SheetAPIOnUpdate = (data: SheetAPIOnUpdateMethod) => void;

export type SheetAPIclose = (id: number) => void;

export type SheetAPI = {
  update: SheetAPIOnUpdate;
  close: SheetAPIclose;
};

declare global {
  interface Window {
    sheetAPI: SheetAPI;
  }
}

class SheetRenderer {
  private sprite: Sprite;

  constructor() {
    window.sheetAPI.update((params: SheetAPIOnUpdateParams): void => {
      this.sprite = params.sprite;

      document.getElementById('name').textContent = params.sprite.name;

      document.getElementById('enemyAlly').title = params.eaTable[params.sprite.enemyAlly];

      document.getElementById('hp').textContent = params.sprite.hp.toString();

      document.getElementById('hpMax').textContent = params.sprite.derived.hpMax.toString();

      document.getElementById('race').textContent = params.raceTable[params.sprite.race];
    });

    document.body.addEventListener(
      'click',
      (): void => {
        window.sheetAPI.close(this.sprite.id);
      },
      true
    );
  }
}

new SheetRenderer();
