import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { StringType } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedStringType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertStringType(ctx: MarkupRenderContexts, stringType: StringType): ConvertedStringType {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.String] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.String]);

  return link ?? encapsulatedName;

}
