import { renderType } from "./type.js";

import type { UnionType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderUnionType(ctx: RenderContext<MarkupRenderer>, type: UnionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" | ");
}
