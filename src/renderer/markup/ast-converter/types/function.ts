import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedFunctionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionType(ctx: MarkupRenderContexts, functionType: FunctionType): ConvertedFunctionType {

  const renderConfig = getRenderConfig(ctx);

  const name = functionType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Function] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Function]);

  return link ?? encapsulatedName;

}
