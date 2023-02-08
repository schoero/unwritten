import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { StringType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedStringType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderStringType(ctx: MarkupRenderContext, stringType: StringType): RenderedStringType {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.String] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.String]);

  return link ?? encapsulatedName;

}
