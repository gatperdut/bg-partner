import { ResImageBase } from '@chitin/res/image/res-image-base';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

export class ResImageDefault extends ResImageBase {
  constructor() {
    super();

    const buffer: Buffer = fs.readFileSync(path.join(__dirname, 'buff-question.png'));

    this.base64 = buffer.toString('base64');

    const png: PNG = PNG.sync.read(buffer);

    this.size = {
      width: png.width,
      height: png.height,
    };

    this.loaded = true;
  }
}
