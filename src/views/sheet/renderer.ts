import { EaTable } from '../../tables/ea';
import { RaceTable } from '../../tables/race';
import { Abilities } from './abilities/abilities';
import './sheet.scss';
import { SpriteView } from './sprite-view';

export type SheetAPIUpdateParams = {
  templates: Record<string, string>;
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
    document.getElementById('name').innerHTML = params.spriteView.basic.name;

    document.getElementById('enemyAlly').title =
      params.eaTable[params.spriteView.profile.enemyAlly];

    document.getElementById('hp').innerHTML = params.spriteView.basic.hp.toString();

    document.getElementById('hpMax').innerHTML = params.spriteView.derived.hpMax.toString();

    document.getElementById('race').innerHTML = params.raceTable[params.spriteView.profile.race];

    document.getElementById('base').innerHTML = `0x${params.spriteView.base.toString(16)}`;

    document.getElementById('abilities').innerHTML = new Abilities(
      params.templates.abilities,
      params.spriteView
    ).html;
    // document.getElementById(
    //   'str'
    // ).innerHTML = `${params.spriteView.derived.str.toString()} (${params.spriteView.derived.strExc.toString()}%)`;
    // document.getElementById('dex').innerHTML = params.spriteView.derived.dex.toString();
    // document.getElementById('con').innerHTML = params.spriteView.derived.con.toString();
    // document.getElementById('int').innerHTML = params.spriteView.derived.int.toString();
    // document.getElementById('wis').innerHTML = params.spriteView.derived.wis.toString();
    // document.getElementById('cha').innerHTML = params.spriteView.derived.cha.toString();

    document.getElementById(
      'str2'
    ).innerHTML = `${params.spriteView.derivedBonus.str.toString()} (${params.spriteView.derivedBonus.strExc.toString()}%)`;
    document.getElementById('dex2').innerHTML = params.spriteView.derivedBonus.dex.toString();
    document.getElementById('con2').innerHTML = params.spriteView.derivedBonus.con.toString();
    document.getElementById('int2').innerHTML = params.spriteView.derivedBonus.int.toString();
    document.getElementById('wis2').innerHTML = params.spriteView.derivedBonus.wis.toString();
    document.getElementById('cha2').innerHTML = params.spriteView.derivedBonus.cha.toString();

    document.getElementById(
      'str3'
    ).innerHTML = `${params.spriteView.derivedTemp.str.toString()} (${params.spriteView.derivedTemp.strExc.toString()}%)`;
    document.getElementById('dex3').innerHTML = params.spriteView.derivedTemp.dex.toString();
    document.getElementById('con3').innerHTML = params.spriteView.derivedTemp.con.toString();
    document.getElementById('int3').innerHTML = params.spriteView.derivedTemp.int.toString();
    document.getElementById('wis3').innerHTML = params.spriteView.derivedTemp.wis.toString();
    document.getElementById('cha3').innerHTML = params.spriteView.derivedTemp.cha.toString();

    document.getElementById(
      'resistFire'
    ).innerHTML = `${params.spriteView.derived.resistFire.toString()}%`;
    document.getElementById(
      'resistCold'
    ).innerHTML = `${params.spriteView.derived.resistCold.toString()}%`;
    document.getElementById(
      'resistElectricity'
    ).innerHTML = `${params.spriteView.derived.resistElectricity.toString()}%`;
    document.getElementById(
      'resistAcid'
    ).innerHTML = `${params.spriteView.derived.resistAcid.toString()}%`;
    document.getElementById(
      'resistMagic'
    ).innerHTML = `${params.spriteView.derived.resistMagic.toString()}%`;
    document.getElementById(
      'resistPoison'
    ).innerHTML = `${params.spriteView.derived.resistPoison.toString()}%`;
    document.getElementById(
      'resistSlashing'
    ).innerHTML = `${params.spriteView.derived.resistSlashing.toString()}%`;
    document.getElementById(
      'resistCrushing'
    ).innerHTML = `${params.spriteView.derived.resistCrushing.toString()}%`;
    document.getElementById(
      'resistPiercing'
    ).innerHTML = `${params.spriteView.derived.resistPiercing.toString()}%`;
    document.getElementById(
      'resistMissile'
    ).innerHTML = `${params.spriteView.derived.resistMissile.toString()}%`;

    document.getElementById(
      'resistFire2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistFire.toString()}%`;
    document.getElementById(
      'resistCold2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistCold.toString()}%`;
    document.getElementById(
      'resistElectricity2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistElectricity.toString()}%`;
    document.getElementById(
      'resistAcid2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistAcid.toString()}%`;
    document.getElementById(
      'resistMagic2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistMagic.toString()}%`;
    document.getElementById(
      'resistPoison2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistPoison.toString()}%`;
    document.getElementById(
      'resistSlashing2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistSlashing.toString()}%`;
    document.getElementById(
      'resistCrushing2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistCrushing.toString()}%`;
    document.getElementById(
      'resistPiercing2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistPiercing.toString()}%`;
    document.getElementById(
      'resistMissile2'
    ).innerHTML = `${params.spriteView.derivedBonus.resistMissile.toString()}%`;

    document.getElementById(
      'resistFire3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistFire.toString()}%`;
    document.getElementById(
      'resistCold3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistCold.toString()}%`;
    document.getElementById(
      'resistElectricity3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistElectricity.toString()}%`;
    document.getElementById(
      'resistAcid3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistAcid.toString()}%`;
    document.getElementById(
      'resistMagic3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistMagic.toString()}%`;
    document.getElementById(
      'resistPoison3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistPoison.toString()}%`;
    document.getElementById(
      'resistSlashing3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistSlashing.toString()}%`;
    document.getElementById(
      'resistCrushing3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistCrushing.toString()}%`;
    document.getElementById(
      'resistPiercing3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistPiercing.toString()}%`;
    document.getElementById(
      'resistMissile3'
    ).innerHTML = `${params.spriteView.derivedTemp.resistMissile.toString()}%`;

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
