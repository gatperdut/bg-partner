import { Derived } from '../sprite/derived';
import { Sprite } from '../sprite/sprite';

export const spriteSanitize = (sprite: Sprite): Sprite => {
  const result: Sprite = {
    // Ignore
    basePtr: null,
    memread: null,
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
    viewportX: sprite.viewportX,
    viewportY: sprite.viewportY,
    scrollX: sprite.scrollX,
    scrollY: sprite.scrollY,
    relativeX: sprite.relativeX,
    relativeY: sprite.relativeY,
    x: sprite.x,
    y: sprite.y,
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
