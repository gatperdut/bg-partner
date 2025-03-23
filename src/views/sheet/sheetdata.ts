import { ResImageDefault } from '@chitin/res/image/res-image-default';
import { Hbs } from '@views/shared/hbsreg';
import { SpriteView } from '@views/shared/stripped';
import { SheetAPIUpdateParamsTimetracker } from '@views/sheet/renderer';

export type Sheetdata = {
  hbs: Hbs;

  resImageDefault: ResImageDefault;

  sprite: SpriteView;

  timetracker: SheetAPIUpdateParamsTimetracker;
};

export const sheetdata: Sheetdata = {
  hbs: null,
  resImageDefault: null,
  sprite: null,
  timetracker: null,
};
