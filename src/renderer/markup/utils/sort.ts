import { getCategoryName } from "./renderer.js";

import type { MarkupRenderer } from "../types/renderer.js";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.d.js";
import type { MarkupRenderConfig } from "unwritten:renderer:markup/types/config.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function sortExportableTypes(ctx: MarkupRenderContext, types: ExportableEntities[]): ExportableEntities[] {

  const order = (ctx.config.renderConfig[ctx.renderer.name] as MarkupRenderConfig).renderOrder?.reduce((acc, category) => {
    const name = getCategoryName(ctx, category);

    acc.push(name);
    return acc;
  }, [] as string[]);

  return types.sort((a, b) => {
    const aName = getCategoryName(ctx, a.kind);
    const bName = getCategoryName(ctx, b.kind);
    const aIndex = order?.indexOf(aName) ?? 0;
    const bIndex = order?.indexOf(bName) ?? 0;
    return aIndex - bIndex;
  });

}
