import { RenderContext } from "../../../types/context.js";
import { Tuple } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderType } from "./type.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, type: Tuple) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type, false)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}