import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { AnyType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedAnyType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertAnyType(ctx: MarkupRenderContexts, anyType: AnyType): ConvertedAnyType {

  const renderConfig = getRenderConfig(ctx);

  const name = anyType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link ?? encapsulatedName;

}
