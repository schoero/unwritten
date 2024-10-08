import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { BooleanType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedBooleanTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertBooleanTypeInline(ctx: MarkupRenderContext, booleanType: BooleanType): ConvertedBooleanTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Boolean] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Boolean]);

  return link || encapsulatedName;

}
