import { Component, ComponentData } from '../component/component';

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
