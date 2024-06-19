import { TypeKind } from "unwritten:interpreter/enums/type";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { BigIntType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedBigIntTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertBigIntTypeInline(ctx: MarkupRenderContext, bigIntType: BigIntType): ConvertedBigIntTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.BigInt] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.BigInt]);

  return link || encapsulatedName;

}
