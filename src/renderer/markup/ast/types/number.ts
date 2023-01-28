import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { NumberType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedNumberType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderNumberType(ctx: RenderContext<MarkupRenderer>, numberType: NumberType): RenderedNumberType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Number] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Number]);

  return link ?? encapsulatedName;

}
