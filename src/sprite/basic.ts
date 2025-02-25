export class Basic {
  public type: number;

  public canBeSeen: number;

  public id: number;

  public gameAreaAddr: bigint;

  public hp: number;

  public viewport: Electron.Size = { width: null, height: null };

  public scroll: Electron.Point = { x: null, y: null };

  public relative: Electron.Point = { x: null, y: null };

  public pos: Electron.Point = { x: null, y: null };

  public name: string;

  public resref: string;

  constructor(base: bigint) {
    // Empty
  }

  public run() {
    // Empty
  }
}
