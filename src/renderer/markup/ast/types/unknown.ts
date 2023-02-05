import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { UnknownType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedUnknownType } from "unwritten:renderer:markup/types/renderer.js";


export function renderUnknownType(ctx: MarkupRenderContext, unknownType: UnknownType): RenderedUnknownType {

  const renderConfig = getRenderConfig(ctx);

  const name = unknownType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Unknown] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Unknown]);

  return link ?? encapsulatedName;

}
