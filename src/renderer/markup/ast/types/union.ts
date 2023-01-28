import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";

import type { UnionType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedUnionType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderUnionType(ctx: RenderContext<MarkupRenderer>, unionType: UnionType): RenderedUnionType {
  return unionType.types.map(type => renderType(ctx, type)).join(" | ");
}
