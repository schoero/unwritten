import type { ExportableEntity } from "unwritten:interpreter/type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";


export function sortExportableEntities(ctx: MarkupRenderContext, entities: ExportableEntity[]): ExportableEntity[] {

  const order = ctx.config.renderConfig[ctx.renderer.name].renderOrder;

  return entities.sort((a, b) => {
    const aIndex = order.indexOf(a.kind);
    const bIndex = order.indexOf(b.kind);
    return aIndex - bIndex;
  });

}
