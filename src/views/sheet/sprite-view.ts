import { Sprite } from '../../sprite/sprite';

type Stripped<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export type SpriteView = Stripped<Sprite>;

export const spriteView = (sprite: Sprite): SpriteView => {
  return {
    ...sprite,
  };
};
