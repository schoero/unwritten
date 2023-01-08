import { renderType } from "./type.js";

import type { TupleType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.name !== undefined ? `${type.name}: ` : "";
    return `${label}${renderType(ctx, type, false)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}
