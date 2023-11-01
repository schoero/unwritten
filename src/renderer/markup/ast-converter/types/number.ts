import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { NumberType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedNumberTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertNumberTypeInline(ctx: MarkupRenderContexts, numberType: NumberType): ConvertedNumberTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Number] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Number]);

  return link || encapsulatedName;

}
