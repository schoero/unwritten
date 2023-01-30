import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { BigIntType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedBigIntType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderBigIntType(ctx: RenderContext<MarkupRenderer>, bigIntType: BigIntType): RenderedBigIntType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigInt] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.BigInt]);

  return link ?? encapsulatedName;

}
