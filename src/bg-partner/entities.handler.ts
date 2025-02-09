import _ from 'lodash';
import { Entity } from './entity';
import { HANDLE_PTR_TYPE } from './koffi/defs/handles';
import { RECT_TYPE } from './koffi/defs/structs/rect';
import { WindowHandler } from './window.handler';

export class EntitiesHandler {
  private entities: Record<number, Entity> = {};

  public trackersShown: boolean = false;

  constructor(private windowHandler: WindowHandler) {
    // Empty
  }

  public run(processHandle: HANDLE_PTR_TYPE, gameObjectPtrs: number[], rect: RECT_TYPE): void {
    const entities: Entity[] = _.filter(
      _.map(
        gameObjectPtrs,
        (gameObjectPtr: number): Entity =>
          new Entity(this, this.windowHandler, processHandle, gameObjectPtr, rect)
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
        this.entities[id].teardown();

        delete this.entities[id];
      }
    });
  }

  private entitiesInsert(entities: Entity[]): void {
    _.each(entities, (entity: Entity): void => {
      if (!this.entities[entity.sprite.id]) {
        this.entities[entity.sprite.id] = entity;

        entity.createTracker(this.trackersShown);
      } else {
        this.entities[entity.sprite.id].sprite.basePtr = entity.sprite.basePtr;
      }
    });
  }

  public hideTrackers(): void {
    if (this.trackersShown) {
      _.each(_.values(this.entities), (entity: Entity): void => {
        entity.hideTracker();
      });

      this.trackersShown = false;
    }
  }

  public toggleTrackers(): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      if (this.trackersShown) {
        entity.hideTracker();
      } else {
        entity.showTracker();
      }
    });

    this.trackersShown = !this.trackersShown;
  }

  public teardown(): void {
    _.each(_.values(this.entities), (entity: Entity): void => {
      entity.teardown();
    });

    this.entities = {};
  }
}
