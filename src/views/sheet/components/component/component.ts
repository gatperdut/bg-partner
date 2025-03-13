export type ComponentData = {
  title: string;
};

export class Component {
  public html: string;

  protected componentData: ComponentData;

  constructor() {
    this.componentData = {
      title: null,
    };
  }
}
