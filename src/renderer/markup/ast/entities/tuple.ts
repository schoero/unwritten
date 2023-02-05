import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { TupleType } from "unwritten:compiler:type-definitions/types.d.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types/renderer.js";


export function renderTupleType(ctx: MarkupRenderContext, type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}
