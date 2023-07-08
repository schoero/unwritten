import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { UndefinedType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedUndefinedTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUndefinedTypeInline(ctx: MarkupRenderContexts, undefinedType: UndefinedType): ConvertedUndefinedTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = undefinedType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Undefined] && createLinkNode(encapsulatedName, ctx.config.externalTypes[TypeKind.Undefined]);

  return link ?? encapsulatedName;

}
