import { Component } from '../component/component';

export type TooltipData = {
  // Empty
};

export class Tooltip extends Component {
  protected tooltipData: TooltipData = {};

  constructor() {
    super();
  }
}
