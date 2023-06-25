import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedBigIntTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertBigIntTypeInline(ctx: MarkupRenderContexts, bigIntType: BigIntType): ConvertedBigIntTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigInt] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.BigInt]);

  return link ?? encapsulatedName;

}
