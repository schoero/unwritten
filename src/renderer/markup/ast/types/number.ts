import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { NumberType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedNumberType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderNumberType(ctx: RenderContext<MarkupRenderer>, numberType: NumberType): RenderedNumberType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Number] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Number]);

  return link ?? encapsulatedName;

}
