import koffi from 'koffi';
import { CHAR } from '../../koffi/primitives';

export class HelpersWin32 {
  public CHAR_ARRAY = (length: number) => {
    return koffi.array(CHAR, length, 'Array');
  };
}
