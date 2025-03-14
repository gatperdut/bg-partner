import { Entity } from '@entities/entity';
import { handlers } from '@handlers';
import _ from 'lodash';

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

    handlers.timetracker.push(entities[0]);

    if (handlers.timetracker.reloaded) {
      console.log('Reloaded.');

      handlers.timetracker.clear();

      this.entitiesReplace(entities);

      return;
    }

    this.entitiesRemove(entities);

    this.entitiesInsert(entities);

    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.update();
    });
  }

  private entitiesReplace(entities: Entity[]): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.teardown();
    });

    this.entities = {};

    _.each(entities, (entity: Entity): void => {
      this.entities[entity.sprite.basic.id] = entity;
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
