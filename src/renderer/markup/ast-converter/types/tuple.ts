import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";

import type { TupleMemberEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TupleType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedTupleMember,
  ConvertedTupleType
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTupleType(ctx: MarkupRenderContexts, tupleType: TupleType): ConvertedTupleType {

  const convertedMembers = tupleType.members.map(member => convertTupleMember(ctx, member));

  return [
    "[" as const,
    ...convertedMembers,
    "]" as const
  ];

}


function convertTupleMember(ctx: MarkupRenderContexts, tupleMember: TupleMemberEntity): ConvertedTupleMember {

  const renderedType = convertType(ctx, tupleMember.type);

  const renderedName = tupleMember.name ? `${tupleMember.name}: ` : "";
  const renderedOptional = tupleMember.optional ? "?" : "";
  const renderedRest = tupleMember.rest ? "..." : "";
  const renderedRestBrackets = tupleMember.rest ? "[]" : "";
  const restNeedsParentheses = tupleMember.rest &&
    (
      tupleMember.type.kind === TypeKind.Union ||
      tupleMember.type.kind === TypeKind.Intersection
    );


  return [
    renderedName,
    renderedRest,
    restNeedsParentheses ? "(" as const : "" as const,
    renderedType,
    renderedOptional,
    restNeedsParentheses ? ")" as const : "" as const,
    renderedRestBrackets
  ];

}
