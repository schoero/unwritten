import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BooleanType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedBooleanTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertBooleanTypeInline(ctx: MarkupRenderContexts, booleanType: BooleanType): ConvertedBooleanTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Boolean] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Boolean]);

  return link ?? encapsulatedName;

}
