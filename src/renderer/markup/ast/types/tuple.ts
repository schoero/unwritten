import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { renderType } from "quickdoks:renderer/markup/entry-points/types.js";

import type { TupleMemberEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type { TupleType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedTupleType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderTupleType(ctx: RenderContext<MarkupRenderer>, tupleType: TupleType): RenderedTupleType {

  const renderedMembers = tupleType.members.map(member => renderTupleMember(ctx, member));
  const renderedTuple = `[${renderedMembers.join(", ")}]`;

  return renderedTuple;

}


function renderTupleMember(ctx: RenderContext<MarkupRenderer>, tupleMember: TupleMemberEntity): string {

  const renderedType = renderType(ctx, tupleMember.type);

  const renderedName = tupleMember.name ? `${tupleMember.name}: ` : "";
  const renderedOptional = tupleMember.optional ? "?" : "";
  const renderedRest = tupleMember.rest ? "..." : "";
  const renderedRestBrackets = tupleMember.rest ? "[]" : "";
  const renderedTypeWithParentheses = tupleMember.rest &&
    (
      tupleMember.type.kind === TypeKind.Union ||
      tupleMember.type.kind === TypeKind.Intersection
    )
    ? `(${renderedType})`
    : renderedType;

  const renderedMember = [
    renderedName,
    renderedRest,
    renderedTypeWithParentheses,
    renderedRestBrackets,
    renderedOptional
  ].join("");

  return renderedMember;

}
