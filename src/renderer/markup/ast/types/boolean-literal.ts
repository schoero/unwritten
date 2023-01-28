import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { BooleanLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedBooleanLiteralType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderBooleanLiteralType(ctx: RenderContext<MarkupRenderer>, booleanType: BooleanLiteralType): RenderedBooleanLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const value = booleanType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BooleanLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.BooleanLiteral]);

  return link ?? encapsulatedValue;

}
