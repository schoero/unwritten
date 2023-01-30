import { TypeKind } from "unwritten:compiler/enums/types.js";
import { renderType } from "unwritten:renderer/markup/entry-points/types.js";

import type { TupleMemberEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { TupleType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedTupleType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


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
