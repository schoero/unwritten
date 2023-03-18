import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { UnknownType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedUnknownType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnknownType(ctx: MarkupRenderContexts, unknownType: UnknownType): ConvertedUnknownType {

  const renderConfig = getRenderConfig(ctx);

  const name = unknownType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Unknown] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Unknown]);

  return link ?? encapsulatedName;

}
