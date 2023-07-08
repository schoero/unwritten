import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedTupleMember,
  ConvertedTupleTypeInline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTupleTypeInline(ctx: MarkupRenderContexts, tupleType: TupleType): ConvertedTupleTypeInline {

  const convertedMembers = convertTupleMembers(ctx, tupleType.members);

  return [
    "[" as const,
    ...convertedMembers,
    "]" as const
  ];

}


function convertTupleMembers(ctx: MarkupRenderContexts, tupleMemberEntities: TupleMemberEntity[]): ConvertedTupleMember[] {

  const convertedMembers = tupleMemberEntities.map((member, index) => {
    if(index === 0){
      return convertTupleMember(ctx, member);
    } else {
      return [
        ", ",
        ...convertTupleMember(ctx, member)
      ];
    }
  });

  return convertedMembers;

}

function convertTupleMember(ctx: MarkupRenderContexts, tupleMemberEntity: TupleMemberEntity): ConvertedTupleMember {

  const { inlineType } = convertType(ctx, tupleMemberEntity.type);

  const renderedName = tupleMemberEntity.name ? `${tupleMemberEntity.name}: ` : "";
  const renderedOptional = tupleMemberEntity.optional ? "?" : "";
  const renderedRest = tupleMemberEntity.rest ? "..." : "";
  const renderedRestBrackets = tupleMemberEntity.rest ? "[]" : "";
  const restNeedsParentheses = tupleMemberEntity.rest &&
    (
      tupleMemberEntity.type.kind === TypeKind.Union ||
      tupleMemberEntity.type.kind === TypeKind.Intersection
    );


  return [
    renderedName,
    renderedRest,
    restNeedsParentheses ? "(" as const : "" as const,
    inlineType,
    renderedOptional,
    restNeedsParentheses ? ")" as const : "" as const,
    renderedRestBrackets
  ];

}
