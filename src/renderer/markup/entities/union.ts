import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { UnionType } from "quickdoks:type-definitions/types.d.js";

import { renderType } from "./type.js";


export function renderUnionType(ctx: RenderContext<MarkupRenderer>, type: UnionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" | ");
}
