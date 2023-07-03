import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { convertObjectTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { ClassType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedClassType,
  ConvertedClassTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertClassTypeInline(ctx: MarkupRenderContexts, classType: ClassType): ConvertedClassType {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    translate("class", { count: 1 }),
    renderConfig.typeEncapsulation
  );
  return ctx.config.externalTypes[TypeKind.Object]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Object])
    : encapsulatedType;

}

export function convertClassTypeMultiline(ctx: MarkupRenderContexts, classType: ClassType): ConvertedClassTypeMultiline {
  return convertObjectTypeMultiline(ctx, classType);
}
