import { MarkupRenderConfig } from "quickdoks:renderer:markup/types/config.js";
import { RenderContext } from "quickdoks:types:context.js";
import { ExportableTypes } from "quickdoks:types:types.js";

import { getCategoryName } from "./renderer.js";


export function sortExportableTypes(ctx: RenderContext, types: ExportableTypes[]): ExportableTypes[] {

  const { config } = ctx;

  const order = (config.renderConfig[ctx.renderer] as MarkupRenderConfig).renderOrder?.reduce((acc, category) => {
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
