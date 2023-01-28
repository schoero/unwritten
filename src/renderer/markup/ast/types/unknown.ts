import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { UnknownType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedUnknownType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderUnknownType(ctx: RenderContext<MarkupRenderer>, unknownType: UnknownType): RenderedUnknownType {

  const renderConfig = getRenderConfig(ctx);

  const name = unknownType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Unknown] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Unknown]);

  return link ?? encapsulatedName;

}
