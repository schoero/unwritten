import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { BooleanType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedBooleanType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderBooleanType(ctx: RenderContext<MarkupRenderer>, booleanType: BooleanType): RenderedBooleanType {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Boolean] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Boolean]);

  return link ?? encapsulatedName;

}
