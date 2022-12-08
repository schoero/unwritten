import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { TupleType } from "quickdoks:types:types.js";

import { renderType } from "./type.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type, false)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}
