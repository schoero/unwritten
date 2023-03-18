import { getCategoryName } from "./renderer.js";

import type { MarkupRenderContexts } from "../types-definitions/markup.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderConfig } from "unwritten:renderer:markup/types-definitions/config.js";


export function sortExportableEntities(ctx: MarkupRenderContexts, entities: ExportableEntities[]): ExportableEntities[] {

  const order = (ctx.config.renderConfig[ctx.renderer.name] as MarkupRenderConfig).renderOrder?.reduce((acc, category) => {
    const name = getCategoryName(ctx, category);

    acc.push(name);
    return acc;
  }, [] as string[]);

  return entities.sort((a, b) => {
    const aName = getCategoryName(ctx, a.kind);
    const bName = getCategoryName(ctx, b.kind);
    const aIndex = order?.indexOf(aName) ?? 0;
    const bIndex = order?.indexOf(bName) ?? 0;
    return aIndex - bIndex;
  });

}
