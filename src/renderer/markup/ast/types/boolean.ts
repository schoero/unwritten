import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BooleanType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedBooleanType } from "unwritten:renderer:markup/types/renderer.js";


export function renderBooleanType(ctx: MarkupRenderContext, booleanType: BooleanType): RenderedBooleanType {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Boolean] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Boolean]);

  return link ?? encapsulatedName;

}
