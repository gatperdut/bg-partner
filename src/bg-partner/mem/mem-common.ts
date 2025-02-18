export class MemCommon {
  public pid: number;

  public alive: boolean = false;

  protected waitingPrinted: boolean = false;

  public gameObjectPtrs: number[];

  public init(): void {
    // Empty
  }

  protected isProcessAlive(): boolean {
    return false;
  }

  public run(): void {
    // Empty
  }
}
