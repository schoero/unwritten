import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { BigIntLiteralType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedBigIntLiteralType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderBigIntLiteralType(ctx: RenderContext<MarkupRenderer>, bigIntType: BigIntLiteralType): RenderedBigIntLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const value = bigIntType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigIntLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.BigIntLiteral]);

  return link ?? encapsulatedValue;

}
