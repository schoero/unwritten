import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedIntersectionTypeInline,
  ConvertedIntersectionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


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
      multilineType ?? ""
    );

  });

  return createListNode(...types);

}
