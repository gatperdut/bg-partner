import _ from 'lodash';
import { Entity } from './entity';
import { TargetProcess } from './mem/mem-common';
import { Memread } from './memread/memread';
import { WindowCommon } from './window/window-common';

export class Entities {
  private entities: Record<number, Entity> = {};

  constructor(private windowHandler: WindowCommon, private memread: Memread) {
    // Empty
  }

  public run(processHandle: TargetProcess, gameObjectPtrs: bigint[]): void {
    const entities: Entity[] = _.filter(
      _.map(gameObjectPtrs, (gameObjectPtr: bigint, index: number): Entity => {
        console.log(index);
        return new Entity(this.windowHandler, processHandle, gameObjectPtr, this.memread);
      }),
      (entity: Entity): boolean => entity.loaded
    );

    this.entitiesRemove(entities);

    this.entitiesInsert(entities);

    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.update();
    });
  }

  private entitiesRemove(entities: Entity[]): void {
    const spriteIds: number[] = _.map(entities, (entity: Entity): number => entity.sprite.id);

    const remove: number[] = [];

    _.each(_.values(this.entities), (entity: Entity): void => {
      if (!spriteIds.includes(entity.sprite.id)) {
        remove.push(entity.sprite.id);
      }
    });

    _.each(remove, (id: number): void => {
      if (this.entities[id]) {
        delete this.entities[id];
      }
    });
  }

  private entitiesInsert(entities: Entity[]): void {
    _.each(entities, (entity: Entity): void => {
      if (!this.entities[entity.sprite.id]) {
        this.entities[entity.sprite.id] = entity;
      } else {
        this.entities[entity.sprite.id].sprite.basePtr = entity.sprite.basePtr;
      }
    });
  }

  public sheetToggle(point: Electron.Point): void {
    const entity: Entity = _.find(_.values(this.entities), (someEntity: Entity): boolean =>
      someEntity.pointMatch(point)
    );

    entity?.sheetToggle();
  }

  public teardown(): void {
    this.entities = {};
  }
}
