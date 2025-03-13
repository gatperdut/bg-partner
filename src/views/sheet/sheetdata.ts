import { ComponentsRecord } from '../../components/components';
import { SheetAPIUpdateParamsTimetracker } from './renderer';
import { SpriteView } from './sprite-view';

export type Sheetdata = {
  components: ComponentsRecord;

  spriteView: SpriteView;

  timetracker: SheetAPIUpdateParamsTimetracker;
};

export const sheetdata: Sheetdata = {
  components: null,
  spriteView: null,
  timetracker: null,
};
