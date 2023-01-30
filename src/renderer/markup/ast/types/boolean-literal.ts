import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { BooleanLiteralType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedBooleanLiteralType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderBooleanLiteralType(ctx: RenderContext<MarkupRenderer>, booleanType: BooleanLiteralType): RenderedBooleanLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const value = booleanType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BooleanLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.BooleanLiteral]);

  return link ?? encapsulatedValue;

}
