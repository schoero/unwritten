import { isClassEntity, isModuleEntity, isNamespaceEntity } from "unwritten:typeguards/entities.js";

import type { Entity, ExportableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ID } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export type ExportRegistry = Set<ID>;

export function createExportRegistry(ctx: MarkupRenderContexts, exportedEntities: ExportableEntity[]): void {

  const addEntity = (entities: Entity[]): void => {

    for(const entity of entities){

      if("symbolId" in entity && entity.symbolId !== undefined){
        ctx.renderer.exportRegistry.add(entity.symbolId);
      }

      if(isNamespaceEntity(entity) || isModuleEntity(entity)){
        addEntity(entity.exports);
      }

      if(isClassEntity(entity)){
        addEntity(entity.methods);
        addEntity(entity.properties);
        addEntity(entity.setters);
        addEntity(entity.getters);
      }

    }

  };

  addEntity(exportedEntities);

}

export function isSymbolExported(ctx: MarkupRenderContexts, symbolId: ID): boolean {
  return ctx.renderer.exportRegistry.has(symbolId);
}
