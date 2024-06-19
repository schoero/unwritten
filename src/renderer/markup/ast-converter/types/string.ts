import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { StringType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedStringTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertStringTypeInline(ctx: MarkupRenderContext, stringType: StringType): ConvertedStringTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.String] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.String]);

  return link || encapsulatedName;

}
