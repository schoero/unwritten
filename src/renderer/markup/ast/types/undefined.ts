import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { UndefinedType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedUndefinedType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderUndefinedType(ctx: RenderContext<MarkupRenderer>, undefinedType: UndefinedType): RenderedUndefinedType {

  const renderConfig = getRenderConfig(ctx);

  const name = undefinedType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Undefined] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Undefined]);

  return link ?? encapsulatedName;

}
