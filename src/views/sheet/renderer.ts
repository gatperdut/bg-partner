import { Hbs } from '@views/shared/comphbs';
import { SpriteView } from '@views/shared/stripped';
import { Buffs } from '@views/sheet/components/buffs/buffs/buffs';
import '@views/sheet/sheet.scss';
import { sheetdata } from '@views/sheet/sheetdata';
import _ from 'lodash';
import tippy, { Instance } from 'tippy.js';

// sheet.setup
export type SheetAPISetupParams = {
  hbs: Hbs;
};

export type SheetAPISetupMethod = (params: SheetAPISetupParams) => void;

export type SheetAPISetup = (data: SheetAPISetupMethod) => void;

// sheet.move
export type SheetAPIMove = (id: number, movement: Electron.Point) => void;

// sheet.close
export type SheetAPIClose = (id: number) => void;

// sheet.update
export type SheetAPIUpdateParamsTimetracker = {
  time: number;

  running: boolean;
};

export type SheetAPIUpdateParams = {
  timetracker: SheetAPIUpdateParamsTimetracker;

  spriteView: SpriteView;
};

export type SheetAPIUpdateMethod = (params: SheetAPIUpdateParams) => void;

export type SheetAPIUpdate = (data: SheetAPIUpdateMethod) => void;

export type SheetAPI = {
  setup: SheetAPISetup;
  move: SheetAPIMove;
  close: SheetAPIClose;
  update: SheetAPIUpdate;
};

declare global {
  interface Window {
    sheetAPI: SheetAPI;
  }
}

class SheetRenderer {
  private dragging: boolean = false;

  private tippyInstances: Instance[] = [];

  private runningPrevious: boolean = null;

  constructor() {
    window.sheetAPI.setup((params: SheetAPISetupParams): void => {
      sheetdata.hbs = params.hbs;
    });

    window.sheetAPI.update((params: SheetAPIUpdateParams): void => {
      this.update(params);
    });

    this.setEventListeners();
  }

  private update(params: SheetAPIUpdateParams): void {
    sheetdata.spriteView = params.spriteView;

    sheetdata.timetracker = params.timetracker;

    if (!sheetdata.hbs) {
      return;
    }

    if (_.isNull(this.runningPrevious)) {
      this.updateView(params);

      this.updateRunning(params.timetracker.running);
      if (!params.timetracker.running) {
        this.tippyAttach();
      }
    } else {
      if (params.timetracker.running) {
        this.updateView(params);

        if (!this.runningPrevious) {
          this.tippyDetach();

          this.updateRunning(true);
        }
      } else {
        if (this.runningPrevious) {
          this.tippyAttach();

          this.updateRunning(false);
        }
      }
    }

    this.runningPrevious = params.timetracker.running;
  }

  private updateView(params: SheetAPIUpdateParams): void {
    document.getElementById('name').innerHTML = params.spriteView.basic.name;

    document.getElementById('enemyAlly').title = params.spriteView.profile.enemyAlly;

    document.getElementById('hp').innerHTML = params.spriteView.basic.hp.toString();

    document.getElementById('hpMax').innerHTML = params.spriteView.derived.hpMax.toString();

    document.getElementById('race').innerHTML = params.spriteView.profile.race;

    document.getElementById('base').innerHTML = `0x${params.spriteView.base.toString(16)}`;

    // document.getElementById('abilitiesGroup').innerHTML = new AbilitiesGroup().html;

    // document.getElementById('resistancesGroup').innerHTML = new ResistancesGroup().html;

    // document.getElementById('savesGroup').innerHTML = new SavesGroup().html;

    document.getElementById('buffs').innerHTML = new Buffs().html;
  }

  private updateRunning(running: boolean) {
    if (running) {
      document.body.classList.add('running');

      document.getElementById('running').innerHTML = '▶️';
    } else {
      document.body.classList.remove('running');

      document.getElementById('running').innerHTML = '⏸️';
    }
  }

  private tippyAttach(): void {
    this.tippyInstances = tippy('[data-tippy-content]', {
      allowHTML: true,
      interactive: true,
      trigger: 'click',
      appendTo: document.body,
    });
  }

  private tippyDetach(): void {
    _.each(this.tippyInstances, (instance: Instance): void => {
      instance.destroy();
    });

    this.tippyInstances.length = 0;
  }

  private setEventListeners(): void {
    // I assume these listeners do not need to be removed?
    document.body.addEventListener(
      'contextmenu',
      (): void => {
        window.sheetAPI.close(sheetdata.spriteView.basic.id);
      },
      true,
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

      window.sheetAPI.move(sheetdata.spriteView.basic.id, movement);
    });
  }
}

new SheetRenderer();
