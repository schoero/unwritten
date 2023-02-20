import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedBigIntType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertBigIntType(ctx: MarkupRenderContexts, bigIntType: BigIntType): ConvertedBigIntType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigInt] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.BigInt]);

  return link ?? encapsulatedName;

}
