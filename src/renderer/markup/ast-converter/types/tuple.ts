import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertTagsForType } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedTupleTypeInline,
  ConvertedTupleTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTupleTypeInline(ctx: MarkupRenderContexts, tupleType: TupleType): ConvertedTupleTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    "tuple",
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Tuple]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Tuple])
    : encapsulatedType;

}


export function convertTupleTypeMultiline(ctx: MarkupRenderContexts, tupleType: TupleType): ConvertedTupleTypeMultiline {

  const members = tupleType.members.map(member => convertTupleMember(ctx, member));

  return createListNode(
    ...members
  );

}


function convertTupleMember(ctx: MarkupRenderContexts, tupleMemberEntity: TupleMemberEntity) {

  const convertedName = tupleMemberEntity.name ?? "";
  const convertedDescription = tupleMemberEntity.description ?? "";
  const convertedTags = convertTagsForType(ctx, tupleMemberEntity);

  const { inlineType, multilineType } = convertType(ctx, tupleMemberEntity.type);

  return createMultilineNode(
    spaceBetween(
      convertedName,
      inlineType,
      convertedTags,
      convertedDescription
    ),
    multilineType ?? ""
  );

}
