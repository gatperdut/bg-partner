import { EntitiesHandler } from '../entities.handler';

export abstract class KeyboardCommon {
  constructor(protected entitiesHandler: EntitiesHandler) {
    // Empty
  }

  protected sheetToggle(): void {
    const point: Electron.Point = Electron.screen.dipToScreenPoint(
      Electron.screen.getCursorScreenPoint()
    );

    this.entitiesHandler.sheetToggle(point);
  }

  protected run(): void {
    // Empty
  }
}
