import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NeverType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedNeverTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNeverTypeInline(ctx: MarkupRenderContexts, neverType: NeverType): ConvertedNeverTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = neverType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Never] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Never]);

  return link ?? encapsulatedName;

}
