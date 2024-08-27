import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { UndefinedType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedUndefinedTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertUndefinedTypeInline(ctx: MarkupRenderContext, undefinedType: UndefinedType): ConvertedUndefinedTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = undefinedType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Undefined] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Undefined]);

  return link || encapsulatedName;

}
