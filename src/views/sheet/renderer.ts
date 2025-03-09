import tippy from 'tippy.js';
import 'tippy.js/themes/material.css';
import { ComponentsRecord } from '../../components/components';
import { EaTab } from '../../tables/ea';
import { RaceTable } from '../../tables/race';
import { Buffs } from './components/buffs/buffs/buffs';
import './sheet.scss';
import { SpriteView } from './sprite-view';

// sheet.setup
export type SheetAPISetupParams = {
  components: ComponentsRecord;
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
  eaTab: EaTab;
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
  private spriteView: SpriteView;

  private components: ComponentsRecord;

  private dragging: boolean = false;

  private updatable: boolean = true;

  constructor() {
    window.sheetAPI.setup((params: SheetAPISetupParams): void => {
      this.components = params.components;
    });

    window.sheetAPI.update((params: SheetAPIUpdateParams): void => {
      this.spriteView = params.spriteView;

      this.components && this.update(params);
    });

    this.setEventListeners();
  }

  private update(params: SheetAPIUpdateParams): void {
    if (!this.updatable) {
      return;
    }

    document.getElementById('name').innerHTML = params.spriteView.basic.name;

    document.getElementById('enemyAlly').title = params.eaTab[params.spriteView.profile.enemyAlly];

    document.getElementById('hp').innerHTML = params.spriteView.basic.hp.toString();

    document.getElementById('hpMax').innerHTML = params.spriteView.derived.hpMax.toString();

    document.getElementById('race').innerHTML = params.raceTable[params.spriteView.profile.race];

    document.getElementById('base').innerHTML = `0x${params.spriteView.base.toString(16)}`;

    // document.getElementById('abilitiesGroup').innerHTML = new AbilitiesGroup(
    //   this.components,
    //   params
    // ).html;

    // document.getElementById('resistancesGroup').innerHTML = new ResistancesGroup(
    //   this.components,
    //   params
    // ).html;

    // document.getElementById('savesGroup').innerHTML = new SavesGroup(this.components, params).html;

    document.getElementById('buffs').innerHTML = new Buffs(this.components, params).html;

    tippy('[data-tippy-content]', {
      allowHTML: true,
      // trigger: 'click',
      theme: 'material',
    });

    this.updatable = false;
  }

  private setEventListeners(): void {
    // I assume these listeners do not need to be removed?
    document.body.addEventListener(
      'contextmenu',
      (): void => {
        window.sheetAPI.close(this.spriteView.basic.id);
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

      window.sheetAPI.move(this.spriteView.basic.id, movement);
    });
  }
}

new SheetRenderer();
