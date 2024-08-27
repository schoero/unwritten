import { TypeKind } from "unwritten:interpreter/enums/type";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { UnknownType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedUnknownTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertUnknownTypeInline(ctx: MarkupRenderContext, unknownType: UnknownType): ConvertedUnknownTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = unknownType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Unknown] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Unknown]);

  return link || encapsulatedName;

}
