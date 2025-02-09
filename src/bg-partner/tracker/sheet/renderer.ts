import { Sprite } from '../../sprite/sprite';
import { EaTable } from '../../tables/ea';
import { RaceTable } from '../../tables/race';
import './sheet.scss';

export type SheetAPIOnInitializeParams = { sprite: Sprite; eaTable: EaTable; raceTable: RaceTable };

export type SheetAPIOnInitializeMethod = (params: SheetAPIOnInitializeParams) => void;

export type SheetAPIOnInitialize = (data: SheetAPIOnInitializeMethod) => void;

export type SheetAPISheetClose = (id: number) => void;

export type SheetAPI = {
  initialize: SheetAPIOnInitialize;
  sheetClose: SheetAPISheetClose;
};

declare global {
  interface Window {
    sheetAPI: SheetAPI;
  }
}

class SheetRenderer {
  private sprite: Sprite;

  constructor() {
    window.sheetAPI.initialize((params: SheetAPIOnInitializeParams): void => {
      this.sprite = params.sprite;

      document.getElementById('name').textContent = params.sprite.name;

      document.getElementById('enemyAlly').title = params.eaTable[params.sprite.enemyAlly];

      document.getElementById('hp').textContent = params.sprite.hp.toString();

      document.getElementById('hpMax').textContent = params.sprite.derivedTemp.hpMax.toString();

      document.getElementById('race').textContent = params.raceTable[params.sprite.race];
    });

    document.body.addEventListener(
      'click',
      () => {
        window.sheetAPI.sheetClose(this.sprite.id);
      },
      true
    );
  }
}

new SheetRenderer();
