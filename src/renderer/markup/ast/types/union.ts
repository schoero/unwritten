import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { UnionType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderedUnionType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderUnionType(ctx: MarkupRenderContext, unionType: UnionType): RenderedUnionType {
  return unionType.types.map(type => renderType(ctx, type)).join(" | ");
}
