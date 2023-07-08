import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { CircularType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedCircularTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertCircularTypeInline(ctx: MarkupRenderContexts, circularType: CircularType): ConvertedCircularTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = circularType.name ?? "";
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link ?? encapsulatedName;

}
