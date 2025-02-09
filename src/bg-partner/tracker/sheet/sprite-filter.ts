import { Sprite } from '../../sprite';

export const spriteSanitize = (sprite: Sprite): Sprite => {
  const result: Sprite = {
    // Problematic
    basePtr: null,
    procHandle: null,
    invalid: false,
    basic: null,
    gameAreaPtr: null,
    advanced: null,
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
  };

  return result;
};
