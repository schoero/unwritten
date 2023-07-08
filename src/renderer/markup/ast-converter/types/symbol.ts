import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { SymbolType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedSymbolTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertSymbolTypeInline(ctx: MarkupRenderContexts, symbolType: SymbolType): ConvertedSymbolTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = symbolType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Symbol] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Symbol]);

  return link ?? encapsulatedName;

}
