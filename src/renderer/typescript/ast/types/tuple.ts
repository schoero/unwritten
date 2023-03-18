import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderType } from "unwritten:renderer:typescript/ast/index.js";

import type { TupleMemberEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderTupleType(ctx: TypeScriptRenderContext, tupleType: TupleType): string {

  const renderedTypes = tupleType.members.map(
    member => renderTupleMember(ctx, member)
  ).join(", ");

  return `[${renderedTypes}]`;

}

function renderTupleMember(ctx: TypeScriptRenderContext, tupleMemberEntity: TupleMemberEntity): string {

  const renderedType = renderType(ctx, tupleMemberEntity.type);

  const labelQuestionMark = tupleMemberEntity.name && tupleMemberEntity.optional
    ? "?"
    : "";

  const labelWithQuestionMark = tupleMemberEntity.name
    ? `${tupleMemberEntity.name}${labelQuestionMark}: `
    : "";

  const typeQuestionMark = !tupleMemberEntity.name && tupleMemberEntity.optional
    ? "?"
    : "";

  const rest = tupleMemberEntity.rest
    ? "..."
    : "";

  const restBrackets = tupleMemberEntity.rest
    ? "[]"
    : "";

  const restNeedsParentheses = tupleMemberEntity.rest && (
    tupleMemberEntity.type.kind === TypeKind.Union ||
    tupleMemberEntity.type.kind === TypeKind.Intersection
  );

  const renderedTypeWithParentheses = restNeedsParentheses
    ? `(${renderedType})`
    : renderedType;

  return `${rest}${labelWithQuestionMark}${renderedTypeWithParentheses}${restBrackets}${typeQuestionMark}`;

}
