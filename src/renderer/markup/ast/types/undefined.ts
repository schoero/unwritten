import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { UndefinedType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedUndefinedType } from "unwritten:renderer:markup/types/renderer.js";


export function renderUndefinedType(ctx: MarkupRenderContext, undefinedType: UndefinedType): RenderedUndefinedType {

  const renderConfig = getRenderConfig(ctx);

  const name = undefinedType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Undefined] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Undefined]);

  return link ?? encapsulatedName;

}
