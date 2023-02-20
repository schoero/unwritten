import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BooleanType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedBooleanType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertBooleanType(ctx: MarkupRenderContexts, booleanType: BooleanType): ConvertedBooleanType {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Boolean] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Boolean]);

  return link ?? encapsulatedName;

}
