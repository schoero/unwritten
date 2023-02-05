import { TypeKind } from "unwritten:compiler:enums/types.js";
import { renderType } from "unwritten:renderer/markup/ast/index.js";

import type { TupleMemberEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TupleType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedTupleType } from "unwritten:renderer:markup/types/renderer.js";


export function renderTupleType(ctx: MarkupRenderContext, tupleType: TupleType): RenderedTupleType {

  const renderedMembers = tupleType.members.map(member => renderTupleMember(ctx, member));
  const renderedTuple = `[${renderedMembers.join(", ")}]`;

  return renderedTuple;

}


function renderTupleMember(ctx: MarkupRenderContext, tupleMember: TupleMemberEntity): string {

  const renderedType = renderType(ctx, tupleMember.type);

  const renderedName = tupleMember.name ? `${tupleMember.name}: ` : "";
  const renderedOptional = tupleMember.optional ? "?" : "";
  const renderedRest = tupleMember.rest ? "..." : "";
  const renderedRestBrackets = tupleMember.rest ? "[]" : "";
  const restNeedsParentheses = tupleMember.type.kind === TypeKind.Union || tupleMember.type.kind === TypeKind.Intersection;
  const renderedTypeWithParentheses = tupleMember.rest && restNeedsParentheses
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
