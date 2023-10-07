import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { VoidType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedVoidTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertVoidTypeInline(ctx: MarkupRenderContexts, voidType: VoidType): ConvertedVoidTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = voidType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Void] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Void]);

  return link || encapsulatedName;

}
