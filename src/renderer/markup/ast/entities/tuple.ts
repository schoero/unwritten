import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { TupleType } from "unwritten:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}
