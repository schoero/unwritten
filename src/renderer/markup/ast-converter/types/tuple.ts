import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertDescriptionForType } from "unwritten:renderer/markup/ast-converter/shared/description";
import { convertTagsForType } from "unwritten:renderer/markup/ast-converter/shared/tags";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities";
import type { TupleType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTupleTypeInline,
  ConvertedTupleTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTupleTypeInline(ctx: MarkupRenderContext, tupleType: TupleType): ConvertedTupleTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "tuple",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Tuple]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Tuple])
    : encapsulatedType;

}


export function convertTupleTypeMultiline(ctx: MarkupRenderContext, tupleType: TupleType): ConvertedTupleTypeMultiline {

  const members = tupleType.members.map(member => convertTupleMember(ctx, member));

  return createListNode(
    ...members
  );

}


function convertTupleMember(ctx: MarkupRenderContext, tupleMemberEntity: TupleMemberEntity) {

  const name = tupleMemberEntity.name;
  const description = tupleMemberEntity.description && convertDescriptionForType(ctx, tupleMemberEntity.description);

  const tags = convertTagsForType(ctx, tupleMemberEntity);

  const { inlineType, multilineType } = convertType(ctx, tupleMemberEntity.type);

  return createMultilineNode(
    spaceBetween(
      name,
      inlineType,
      tags,
      description
    ),
    multilineType
  );

}
