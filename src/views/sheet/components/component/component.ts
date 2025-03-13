import { ComponentsRecord } from '../../../../components/components';

export type ComponentData = {
  title: string;
};

export class Component {
  public html: string;

  protected componentData: ComponentData;

  constructor(protected components: ComponentsRecord) {
    this.componentData = {
      title: null,
    };
  }
}
