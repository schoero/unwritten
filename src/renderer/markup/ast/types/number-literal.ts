import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { NumberLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedNumberLiteralType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderNumberLiteralType(ctx: RenderContext<MarkupRenderer>, numberType: NumberLiteralType): RenderedNumberLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const value = numberType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.NumberLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.NumberLiteral]);

  return link ?? encapsulatedValue;

}
