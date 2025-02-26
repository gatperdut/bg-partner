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

    document.getElementById(
      'str'
    ).textContent = `${params.spriteView.derived.str.toString()} (${params.spriteView.derived.strExc.toString()}%)`;
    document.getElementById('dex').textContent = params.spriteView.derived.dex.toString();
    document.getElementById('con').textContent = params.spriteView.derived.con.toString();
    document.getElementById('int').textContent = params.spriteView.derived.int.toString();
    document.getElementById('wis').textContent = params.spriteView.derived.wis.toString();
    document.getElementById('cha').textContent = params.spriteView.derived.cha.toString();

    document.getElementById(
      'str2'
    ).textContent = `${params.spriteView.derivedBonus.str.toString()} (${params.spriteView.derivedBonus.strExc.toString()}%)`;
    document.getElementById('dex2').textContent = params.spriteView.derivedBonus.dex.toString();
    document.getElementById('con2').textContent = params.spriteView.derivedBonus.con.toString();
    document.getElementById('int2').textContent = params.spriteView.derivedBonus.int.toString();
    document.getElementById('wis2').textContent = params.spriteView.derivedBonus.wis.toString();
    document.getElementById('cha2').textContent = params.spriteView.derivedBonus.cha.toString();

    document.getElementById(
      'str3'
    ).textContent = `${params.spriteView.derivedTemp.str.toString()} (${params.spriteView.derivedTemp.strExc.toString()}%)`;
    document.getElementById('dex3').textContent = params.spriteView.derivedTemp.dex.toString();
    document.getElementById('con3').textContent = params.spriteView.derivedTemp.con.toString();
    document.getElementById('int3').textContent = params.spriteView.derivedTemp.int.toString();
    document.getElementById('wis3').textContent = params.spriteView.derivedTemp.wis.toString();
    document.getElementById('cha3').textContent = params.spriteView.derivedTemp.cha.toString();

    document.getElementById('resistFire').textContent =
      params.spriteView.derived.resistFire.toString();
    document.getElementById('resistCold').textContent =
      params.spriteView.derived.resistCold.toString();
    document.getElementById('resistElectricity').textContent =
      params.spriteView.derived.resistElectricity.toString();
    document.getElementById('resistAcid').textContent =
      params.spriteView.derived.resistAcid.toString();
    document.getElementById('resistMagic').textContent =
      params.spriteView.derived.resistMagic.toString();
    document.getElementById('resistPoison').textContent =
      params.spriteView.derived.resistPoison.toString();
    document.getElementById('resistSlashing').textContent =
      params.spriteView.derived.resistSlashing.toString();
    document.getElementById('resistCrushing').textContent =
      params.spriteView.derived.resistCrushing.toString();
    document.getElementById('resistPiercing').textContent =
      params.spriteView.derived.resistPiercing.toString();
    document.getElementById('resistMissile').textContent =
      params.spriteView.derived.resistMissile.toString();

    document.getElementById('resistFire2').textContent =
      params.spriteView.derivedBonus.resistFire.toString();
    document.getElementById('resistCold2').textContent =
      params.spriteView.derivedBonus.resistCold.toString();
    document.getElementById('resistElectricity2').textContent =
      params.spriteView.derivedBonus.resistElectricity.toString();
    document.getElementById('resistAcid2').textContent =
      params.spriteView.derivedBonus.resistAcid.toString();
    document.getElementById('resistMagic2').textContent =
      params.spriteView.derivedBonus.resistMagic.toString();
    document.getElementById('resistPoison2').textContent =
      params.spriteView.derivedBonus.resistPoison.toString();
    document.getElementById('resistSlashing2').textContent =
      params.spriteView.derivedBonus.resistSlashing.toString();
    document.getElementById('resistCrushing2').textContent =
      params.spriteView.derivedBonus.resistCrushing.toString();
    document.getElementById('resistPiercing2').textContent =
      params.spriteView.derivedBonus.resistPiercing.toString();
    document.getElementById('resistMissile2').textContent =
      params.spriteView.derivedBonus.resistMissile.toString();

    document.getElementById('resistFire3').textContent =
      params.spriteView.derivedTemp.resistFire.toString();
    document.getElementById('resistCold3').textContent =
      params.spriteView.derivedTemp.resistCold.toString();
    document.getElementById('resistElectricity3').textContent =
      params.spriteView.derivedTemp.resistElectricity.toString();
    document.getElementById('resistAcid3').textContent =
      params.spriteView.derivedTemp.resistAcid.toString();
    document.getElementById('resistMagic3').textContent =
      params.spriteView.derivedTemp.resistMagic.toString();
    document.getElementById('resistPoison3').textContent =
      params.spriteView.derivedTemp.resistPoison.toString();
    document.getElementById('resistSlashing3').textContent =
      params.spriteView.derivedTemp.resistSlashing.toString();
    document.getElementById('resistCrushing3').textContent =
      params.spriteView.derivedTemp.resistCrushing.toString();
    document.getElementById('resistPiercing3').textContent =
      params.spriteView.derivedTemp.resistPiercing.toString();
    document.getElementById('resistMissile3').textContent =
      params.spriteView.derivedTemp.resistMissile.toString();

    document.getElementById('saveVsDeath').textContent =
      params.spriteView.derived.saveVsDeath.toString();
    document.getElementById('saveVsWands').textContent =
      params.spriteView.derived.saveVsWands.toString();
    document.getElementById('saveVsPoly').textContent =
      params.spriteView.derived.saveVsPoly.toString();
    document.getElementById('saveVsBreath').textContent =
      params.spriteView.derived.saveVsBreath.toString();
    document.getElementById('saveVsSpell').textContent =
      params.spriteView.derived.saveVsSpell.toString();

    document.getElementById('saveVsDeath2').textContent =
      params.spriteView.derivedBonus.saveVsDeath.toString();
    document.getElementById('saveVsWands2').textContent =
      params.spriteView.derivedBonus.saveVsWands.toString();
    document.getElementById('saveVsPoly2').textContent =
      params.spriteView.derivedBonus.saveVsPoly.toString();
    document.getElementById('saveVsBreath2').textContent =
      params.spriteView.derivedBonus.saveVsBreath.toString();
    document.getElementById('saveVsSpell2').textContent =
      params.spriteView.derivedBonus.saveVsSpell.toString();

    document.getElementById('saveVsDeath3').textContent =
      params.spriteView.derivedTemp.saveVsDeath.toString();
    document.getElementById('saveVsWands3').textContent =
      params.spriteView.derivedTemp.saveVsWands.toString();
    document.getElementById('saveVsPoly3').textContent =
      params.spriteView.derivedTemp.saveVsPoly.toString();
    document.getElementById('saveVsBreath3').textContent =
      params.spriteView.derivedTemp.saveVsBreath.toString();
    document.getElementById('saveVsSpell3').textContent =
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
