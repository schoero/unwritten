import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { StringType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedStringType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderStringType(ctx: RenderContext<MarkupRenderer>, stringType: StringType): RenderedStringType {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.String] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.String]);

  return link ?? encapsulatedName;

}
