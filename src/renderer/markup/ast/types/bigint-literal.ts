import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderedBigIntLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderBigIntLiteralType(ctx: MarkupRenderContext, bigIntType: BigIntLiteralType): RenderedBigIntLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const value = bigIntType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigIntLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.BigIntLiteral]);

  return link ?? encapsulatedValue;

}
