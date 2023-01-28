import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { AnyType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedAnyType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderAnyType(ctx: RenderContext<MarkupRenderer>, anyType: AnyType): RenderedAnyType {

  const renderConfig = getRenderConfig(ctx);

  const name = anyType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Any] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Any]);

  return link ?? encapsulatedName;

}
