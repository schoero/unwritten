import type { MarkupRenderer } from "../types/renderer.js";

import type { RenderContext } from "quickdoks:type-definitions/context.js";


function attachRegistry(ctx: RenderContext<MarkupRenderer>) {
  if(ctx.renderer._linkRegistry !== undefined){
    return;
  }
  ctx.renderer._linkRegistry = new Map<string, (number | string)[]>();
}

function getRegistry(ctx: RenderContext<MarkupRenderer>) {
  attachRegistry(ctx);
  return ctx.renderer._linkRegistry!;
}

export function createAnchor(ctx: RenderContext<MarkupRenderer>, name: string, id: number | string): string {

  const registry = getRegistry(ctx);

  if(registry.has(name)){
    const idArray = registry.get(name)!;
    const idIndex = idArray.indexOf(id);
    if(idIndex === -1){
      idArray.push(id);
      registry.set(name, idArray);
    }
  } else {
    registry.set(name, [id]);
  }

  return getAnchor(name, id);

}


function getAnchor(ctx: RenderContext<MarkupRenderer>, name: string, id: number | string): string {

  const registry = getRegistry(ctx);

  if(!registry.has(name)){
    return name;
  }

  const idArray = registry.get(name)!;
  const idIndex = idArray.indexOf(id);

  if(idIndex === -1){
    return name;
  }

  return idIndex <= 0 ? name : `${name}-${idIndex}`;

}
