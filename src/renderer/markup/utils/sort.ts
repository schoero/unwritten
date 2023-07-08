import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ExportableEntities } from "unwritten:interpreter/type-definitions/entities.js";


export function sortExportableEntities(ctx: MarkupRenderContexts, entities: ExportableEntities[]): ExportableEntities[] {

  const order = ctx.config.renderConfig[ctx.renderer.name].renderOrder;

  return entities.sort((a, b) => {
    const aIndex = order.indexOf(a.kind);
    const bIndex = order.indexOf(b.kind);
    return aIndex - bIndex;
  });

}
