import { ComponentsRecord } from '../../components/components';
import { SheetAPIUpdateParams } from './renderer';

export type Sheetdata = {
  components: ComponentsRecord;

  params: SheetAPIUpdateParams;
};

export const sheetdata: Sheetdata = {
  components: null,
  params: null,
};
