import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { SymbolType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedSymbolType } from "unwritten:renderer:markup/types/renderer.js";


export function renderSymbolType(ctx: MarkupRenderContext, symbolType: SymbolType): RenderedSymbolType {

  const renderConfig = getRenderConfig(ctx);

  const name = symbolType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Symbol] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Symbol]);

  return link ?? encapsulatedName;

}
