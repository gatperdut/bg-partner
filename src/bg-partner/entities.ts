import _ from 'lodash';
import { Entity } from './entity';
import { handlers } from './main';
import { TargetProcess } from './memscan/memscan-common';

export class Entities {
  private entities: Record<number, Entity> = {};

  public run(processHandle: TargetProcess, gameObjectPtrs: bigint[]): void {
    const entities: Entity[] = _.filter(
      _.map(
        gameObjectPtrs,
        (gameObjectPtr: bigint): Entity =>
          new Entity(handlers.window, processHandle, gameObjectPtr, handlers.memread)
      ),
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
