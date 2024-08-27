import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { AnyType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedAnyTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertAnyTypeInline(ctx: MarkupRenderContext, anyType: AnyType): ConvertedAnyTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = anyType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link || encapsulatedName;

}
