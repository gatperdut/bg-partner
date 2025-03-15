export type ComponentData = {
  title: string;
};

export abstract class Component {
  public html: string;

  protected componentData: ComponentData;

  constructor() {
    this.componentData = {
      title: null,
    };
  }
}
