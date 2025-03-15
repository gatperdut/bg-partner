import { Component, ComponentData } from '@views/shared/component';

export type TooltipData = ComponentData;

export class Tooltip extends Component {
  protected tooltipData: TooltipData;

  constructor() {
    super();

    this.tooltipData = {
      ...this.componentData,
    };
  }
}
