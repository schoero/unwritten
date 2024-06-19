import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { NullType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedNullTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertNullTypeInline(ctx: MarkupRenderContext, nullType: NullType): ConvertedNullTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = nullType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Null] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Null]);

  return link || encapsulatedName;

}
