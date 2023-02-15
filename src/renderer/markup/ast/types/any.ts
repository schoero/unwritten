import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { AnyType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { RenderedAnyType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderAnyType(ctx: MarkupRenderContext, anyType: AnyType): RenderedAnyType {

  const renderConfig = getRenderConfig(ctx);

  const name = anyType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link ?? encapsulatedName;

}
