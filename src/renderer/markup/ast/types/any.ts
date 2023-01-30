import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { AnyType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedAnyType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderAnyType(ctx: RenderContext<MarkupRenderer>, anyType: AnyType): RenderedAnyType {

  const renderConfig = getRenderConfig(ctx);

  const name = anyType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link ?? encapsulatedName;

}
