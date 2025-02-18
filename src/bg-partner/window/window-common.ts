export type WindowRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export abstract class WindowCommon {
  public screenSize: Electron.Size;

  public windowRect: WindowRect;

  constructor() {
    this.screenSize = {
      width: 0,
      height: 0,
    };

    this.windowRect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };
  }

  public run(pid: number): void {
    const screenSize: Electron.Size = Electron.screen.getPrimaryDisplay().size;

    this.screenSize.width = screenSize.width;

    this.screenSize.height = screenSize.height;
  }

  public teardown(): void {
    // Empty
  }
}
