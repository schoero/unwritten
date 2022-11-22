import { RenderContext } from "../../../types/context.js";
import { UnionType } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderType } from "./type.js";


export function renderUnionType(ctx: RenderContext<MarkupRenderer>, type: UnionType) {
  return type.types.map(type => renderType(ctx, type, false)).join(" | ");
}
