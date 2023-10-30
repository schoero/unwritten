import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getTranslator } from "unwritten:renderer/markup/utils/translations";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedIntersectionTypeInline,
  ConvertedIntersectionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertIntersectionTypeInline(ctx: MarkupRenderContexts, intersectionType: IntersectionType): ConvertedIntersectionTypeInline {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    translate("intersection"),
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Intersection]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Intersection])
    : encapsulatedType;

}

export function convertIntersectionTypeMultiline(ctx: MarkupRenderContexts, intersectionType: IntersectionType): ConvertedIntersectionTypeMultiline {

  const types = intersectionType.types.map(type => {

    const { inlineType, multilineType } = convertType(ctx, type);

    return createMultilineNode(
      inlineType,
      multilineType
    );

  });

  return createListNode(...types);

}
