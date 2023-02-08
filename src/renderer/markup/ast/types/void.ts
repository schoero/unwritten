import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { VoidType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedVoidType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderVoidType(ctx: MarkupRenderContext, voidType: VoidType): RenderedVoidType {

  const renderConfig = getRenderConfig(ctx);

  const name = voidType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Void] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Void]);

  return link ?? encapsulatedName;

}
