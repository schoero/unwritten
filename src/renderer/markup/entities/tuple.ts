import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { TupleType } from "quickdoks:type-definitions/types.d.js";

import { renderType } from "./type.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type, false)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}
