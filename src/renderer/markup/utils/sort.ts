import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ExportableEntity } from "unwritten:interpreter/type-definitions/entities.js";


export function sortExportableEntities(ctx: MarkupRenderContexts, entities: ExportableEntity[]): ExportableEntity[] {

  const order = ctx.config.renderConfig[ctx.renderer.name].renderOrder;

  return entities.sort((a, b) => {
    const aIndex = order.indexOf(a.kind);
    const bIndex = order.indexOf(b.kind);
    return aIndex - bIndex;
  });

}
