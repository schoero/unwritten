import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NullType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedNullType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNullType(ctx: MarkupRenderContexts, nullType: NullType): ConvertedNullType {

  const renderConfig = getRenderConfig(ctx);

  const name = nullType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Null] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Null]);

  return link ?? encapsulatedName;

}
