import { ComponentsRecord } from '../../components/components';
import { EaTable } from '../../tables/ea';
import { RaceTable } from '../../tables/race';
import { AbilitiesGroup } from './components/abilities-group/abilities-group';
import { ResistancesGroup } from './components/resistances-group/resistances-group';
import './sheet.scss';
import { SpriteView } from './sprite-view';

// sheet.setup
export type SheetAPISetupParams = {
  componentsRecord: ComponentsRecord;
};

export type SheetAPISetupMethod = (params: SheetAPISetupParams) => void;

export type SheetAPISetup = (data: SheetAPISetupMethod) => void;

// sheet.move
export type SheetAPIMove = (id: number, movement: Electron.Point) => void;

// sheet.close
export type SheetAPIClose = (id: number) => void;

// sheet.update
export type SheetAPIUpdateParams = {
  spriteView: SpriteView;
  eaTable: EaTable;
  raceTable: RaceTable;
};

export type SheetAPIUpdateMethod = (params: SheetAPIUpdateParams) => void;

export type SheetAPIUpdate = (data: SheetAPIUpdateMethod) => void;

export type SheetAPI = {
  setup: SheetAPISetup;
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

  private components: ComponentsRecord;

  private dragging: boolean = false;

  constructor() {
    window.sheetAPI.setup((params: SheetAPISetupParams): void => {
      this.components = params.componentsRecord;
    });

    window.sheetAPI.update((params: SheetAPIUpdateParams): void => {
      this.sprite = params.spriteView;

      this.components && this.update(params);
    });

    this.setEventListeners();
  }

  private update(params: SheetAPIUpdateParams): void {
    document.getElementById('name').innerHTML = params.spriteView.basic.name;

    document.getElementById('enemyAlly').title =
      params.eaTable[params.spriteView.profile.enemyAlly];

    document.getElementById('hp').innerHTML = params.spriteView.basic.hp.toString();

    document.getElementById('hpMax').innerHTML = params.spriteView.derived.hpMax.toString();

    document.getElementById('race').innerHTML = params.raceTable[params.spriteView.profile.race];

    document.getElementById('base').innerHTML = `0x${params.spriteView.base.toString(16)}`;

    document.getElementById('abilitiesGroup').innerHTML = new AbilitiesGroup(
      this.components,
      params.spriteView
    ).html;

    document.getElementById('resistancesGroup').innerHTML = new ResistancesGroup(
      this.components,
      params.spriteView
    ).html;

    document.getElementById('saveVsDeath').innerHTML =
      params.spriteView.derived.saveVsDeath.toString();
    document.getElementById('saveVsWands').innerHTML =
      params.spriteView.derived.saveVsWands.toString();
    document.getElementById('saveVsPoly').innerHTML =
      params.spriteView.derived.saveVsPoly.toString();
    document.getElementById('saveVsBreath').innerHTML =
      params.spriteView.derived.saveVsBreath.toString();
    document.getElementById('saveVsSpell').innerHTML =
      params.spriteView.derived.saveVsSpell.toString();

    document.getElementById('saveVsDeath2').innerHTML =
      params.spriteView.derivedBonus.saveVsDeath.toString();
    document.getElementById('saveVsWands2').innerHTML =
      params.spriteView.derivedBonus.saveVsWands.toString();
    document.getElementById('saveVsPoly2').innerHTML =
      params.spriteView.derivedBonus.saveVsPoly.toString();
    document.getElementById('saveVsBreath2').innerHTML =
      params.spriteView.derivedBonus.saveVsBreath.toString();
    document.getElementById('saveVsSpell2').innerHTML =
      params.spriteView.derivedBonus.saveVsSpell.toString();

    document.getElementById('saveVsDeath3').innerHTML =
      params.spriteView.derivedTemp.saveVsDeath.toString();
    document.getElementById('saveVsWands3').innerHTML =
      params.spriteView.derivedTemp.saveVsWands.toString();
    document.getElementById('saveVsPoly3').innerHTML =
      params.spriteView.derivedTemp.saveVsPoly.toString();
    document.getElementById('saveVsBreath3').innerHTML =
      params.spriteView.derivedTemp.saveVsBreath.toString();
    document.getElementById('saveVsSpell3').innerHTML =
      params.spriteView.derivedTemp.saveVsSpell.toString();
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
