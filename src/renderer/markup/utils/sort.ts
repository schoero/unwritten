import { RenderContext } from "../../../types/context.js";
import { ExportableTypes } from "../../../types/types.js";
import { MarkupRenderConfig } from "../types/config.js";
import { getCategoryName } from "./renderer.js";


export function sortExportableTypes(ctx: RenderContext, types: ExportableTypes[]): ExportableTypes[] {

  const { config } = ctx;

  const order = (config.renderConfig[ctx.renderer] as MarkupRenderConfig).renderOrder?.reduce((acc, category) => {
    const name = getCategoryName(category);

    acc.push(name);
    return acc;
  }, [] as string[]);

  return types.sort((a, b) => {
    const aName = getCategoryName(a.kind);
    const bName = getCategoryName(b.kind);
    const aIndex = order?.indexOf(aName) ?? 0;
    const bIndex = order?.indexOf(bName) ?? 0;
    return aIndex - bIndex;
  });

}
