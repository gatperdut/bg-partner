import Electron from 'electron';
import { Entities } from '../entities';

export abstract class KeyboardCommon {
  constructor(protected entitiesHandler: Entities) {
    // Empty
  }

  protected sheetToggle(): void {
    const point: Electron.Point = Electron.screen.dipToScreenPoint(
      Electron.screen.getCursorScreenPoint()
    );

    this.entitiesHandler.sheetToggle(point);
  }

  public run(): void {
    // Empty
  }
}
