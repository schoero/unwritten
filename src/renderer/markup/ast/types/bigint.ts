import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedBigIntType } from "unwritten:renderer:markup/types/renderer.js";


export function renderBigIntType(ctx: MarkupRenderContext, bigIntType: BigIntType): RenderedBigIntType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigInt] && ctx.renderer.renderHyperLink(ctx, encapsulatedName, ctx.config.externalTypes[TypeKind.BigInt]);

  return link ?? encapsulatedName;

}
