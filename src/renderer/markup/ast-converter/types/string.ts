import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { StringType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedStringTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertStringTypeInline(ctx: MarkupRenderContexts, stringType: StringType): ConvertedStringTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.String] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.String]);

  return link ?? encapsulatedName;

}
