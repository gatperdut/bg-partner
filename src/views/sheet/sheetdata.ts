import { SheetAPIUpdateParamsTimetracker } from '@views/sheet/renderer';
import { SpriteView } from '@views/sheet/sprite-view';
import { ComponentsRecord } from 'src/components/components';

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
