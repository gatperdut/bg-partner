import { Derived } from '../../sprite/derived';
import { Sprite } from '../../sprite/sprite';

export const spriteSanitize = (sprite: Sprite): Sprite => {
  const result: Sprite = {
    // Ignore
    basePtr: null,
    invalid: false,
    basic: null,
    gameAreaAddr: null,
    advanced: null,
    screen: null,
    // Basic
    type: sprite.type,
    canBeSeen: sprite.canBeSeen,
    id: sprite.id,
    hp: sprite.hp,
    viewport: {
      width: sprite.viewport.width,
      height: sprite.viewport.height,
    },
    scroll: {
      x: sprite.scroll.x,
      y: sprite.scroll.y,
    },
    relative: {
      x: sprite.relative.x,
      y: sprite.relative.y,
    },
    pos: {
      x: sprite.pos.x,
      y: sprite.pos.y,
    },
    name: sprite.name,
    resref: sprite.resref,
    // Advanced
    enemyAlly: sprite.enemyAlly,
    race: sprite.race,
    // Derived
    derived: derivedFilter(sprite.derived),
    derivedBonus: derivedFilter(sprite.derivedBonus),
    derivedTemp: derivedFilter(sprite.derivedTemp),
  };

  return result;
};

const derivedFilter = (derived: Derived): Derived => {
  return {
    hpMax: derived.hpMax,
  };
};
