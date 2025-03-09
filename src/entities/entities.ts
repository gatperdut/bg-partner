import _ from 'lodash';
import { handlers } from '../handlers';
import { Entity } from './entity';

export class Entities {
  private entities: Record<number, Entity> = {};

  public run(): void {
    const entities: Entity[] = _.filter(
      _.map(
        handlers.memscan.gameObjectPtrs,
        (gameObjectPtr: bigint): Entity => new Entity(gameObjectPtr)
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
    const spriteIds: number[] = _.map(entities, (entity: Entity): number => entity.sprite.basic.id);

    const remove: number[] = [];

    _.each(_.values(this.entities), (entity: Entity): void => {
      if (!spriteIds.includes(entity.sprite.basic.id)) {
        remove.push(entity.sprite.basic.id);
      }
    });

    _.each(remove, (id: number): void => {
      if (this.entities[id]) {
        this.entities[id].teardown();

        delete this.entities[id];
      }
    });
  }

  private entitiesInsert(entities: Entity[]): void {
    _.each(entities, (entity: Entity): void => {
      if (!this.entities[entity.sprite.basic.id]) {
        this.entities[entity.sprite.basic.id] = entity;
      } else {
        this.entities[entity.sprite.basic.id].sprite.base = entity.sprite.base;
      }
    });
  }

  public sheetToggle(point: Electron.Point): void {
    const entity: Entity = _.find(_.values(this.entities), (someEntity: Entity): boolean =>
      someEntity.pointMatch(point)
    );

    entity?.sheetToggle();
  }

  public sheetCloseAll(): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      if (entity.windowValid) {
        entity.sheetToggle();
      }
    });
  }

  public runningToggle(): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.runningToggle();
    });
  }

  public focusChanged(focused: boolean): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.focusChanged(focused);
    });
  }

  public teardown(): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.teardown();
    });

    this.entities = {};
  }
}
