import { renderType } from "unwritten:renderer:markup/entry-points/types.js";

import type { UnionType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedUnionType } from "unwritten:renderer:markup/types/renderer.js";


export function renderUnionType(ctx: MarkupRenderContext, unionType: UnionType): RenderedUnionType {
  return unionType.types.map(type => renderType(ctx, type)).join(" | ");
}
