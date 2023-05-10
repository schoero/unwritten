import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NumberType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedNumberType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNumberType(ctx: MarkupRenderContexts, numberType: NumberType): ConvertedNumberType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Number] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Number]);

  return link ?? encapsulatedName;

}
