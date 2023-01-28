import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { NeverType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedNeverType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderNeverType(ctx: RenderContext<MarkupRenderer>, neverType: NeverType): RenderedNeverType {

  const renderConfig = getRenderConfig(ctx);

  const name = neverType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Never] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Never]);

  return link ?? encapsulatedName;

}
