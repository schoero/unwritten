import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { UnionType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedUnionType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderUnionType(ctx: RenderContext<MarkupRenderer>, unionType: UnionType): RenderedUnionType {
  return unionType.types.map(type => renderType(ctx, type)).join(" | ");
}
