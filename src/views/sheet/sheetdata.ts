import { Hbs } from '@views/shared/hbsreg';
import { SpriteView } from '@views/shared/stripped';
import { SheetAPIUpdateParamsTimetracker } from '@views/sheet/renderer';

export type Sheetdata = {
  hbs: Hbs;

  spriteView: SpriteView;

  timetracker: SheetAPIUpdateParamsTimetracker;
};

export const sheetdata: Sheetdata = {
  hbs: null,
  spriteView: null,
  timetracker: null,
};
