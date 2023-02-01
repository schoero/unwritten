import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NumberType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedNumberType } from "unwritten:renderer:markup/types/renderer.js";


export function renderNumberType(ctx: MarkupRenderContext, numberType: NumberType): RenderedNumberType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Number] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Number]);

  return link ?? encapsulatedName;

}
