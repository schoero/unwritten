import { isClassEntity, isModuleEntity, isNamespaceEntity } from "unwritten:typeguards/entities.js";

import type { Entity, SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { ID } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export type ExportRegistry = Map<ID, Set<ID>>;

export function initializeExportRegistry(ctx: MarkupRenderContexts, sourceFileEntities: SourceFileEntity[]): void {
  sourceFileEntities.forEach(sourceFileEntity => {
    const set = new Set<ID>();
    ctx.renderer.exportRegistry.set(sourceFileEntity.symbolId, set);
    addEntity(set, sourceFileEntity.exports);
  });
}

function addEntity(set: Set<ID>, entities: Entity[]): void {

  for(const entity of entities){

    if("symbolId" in entity && entity.symbolId !== undefined){
      set.add(entity.symbolId);
    }

    if(isNamespaceEntity(entity) || isModuleEntity(entity)){
      addEntity(set, entity.exports);
    }

    if(isClassEntity(entity)){
      addEntity(set, entity.methods);
      addEntity(set, entity.properties);
      addEntity(set, entity.setters);
      addEntity(set, entity.getters);
    }

  }

}

export function isSymbolExported(ctx: MarkupRenderContexts, symbolId: ID): boolean {
  return Object.values(ctx.renderer.exportRegistry).some(set => set.has(symbolId));
}

export function isSymbolExportedFromSourceFile(ctx: MarkupRenderContexts, sourceFileId: ID, symbolId: ID): boolean {
  return ctx.renderer.exportRegistry.get(sourceFileId)?.has(symbolId) ?? false;
}
