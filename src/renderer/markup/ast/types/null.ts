import { TypeKind } from "unwritten:compiler/enums/types.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";

import type { NullType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedNullType } from "unwritten:renderer/markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";


export function renderNullType(ctx: RenderContext<MarkupRenderer>, nullType: NullType): RenderedNullType {

  const renderConfig = getRenderConfig(ctx);

  const name = nullType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Null] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Null]);

  return link ?? encapsulatedName;

}
