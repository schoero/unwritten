import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { SymbolType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedSymbolTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertSymbolTypeInline(ctx: MarkupRenderContexts, symbolType: SymbolType): ConvertedSymbolTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = symbolType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Symbol] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Symbol]);

  return link || encapsulatedName;

}
