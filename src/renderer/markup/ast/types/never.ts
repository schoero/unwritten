import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NeverType } from "unwritten:compiler:type-definitions/types.js";
import type { RenderedNeverType } from "unwritten:renderer:markup/types/renderer.js";


export function renderNeverType(ctx: MarkupRenderContext, neverType: NeverType): RenderedNeverType {

  const renderConfig = getRenderConfig(ctx);

  const name = neverType.name;
  const encapsulatedName = encapsulate(name, renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.Never] && ctx.renderer.renderHyperLink(encapsulatedName, ctx.config.externalTypes[TypeKind.Never]);

  return link ?? encapsulatedName;

}
