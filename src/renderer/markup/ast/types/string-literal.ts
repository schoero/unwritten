import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { StringLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext, RenderedStringLiteralType } from "unwritten:renderer:markup/types/renderer.js";


export function renderStringLiteralType(ctx: MarkupRenderContext, stringType: StringLiteralType): RenderedStringLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const value = stringType.value;
  const encapsulatedValue = encapsulate(encapsulate(value, renderConfig.stringLiteralEncapsulation), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.StringLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.StringLiteral]);

  return link ?? encapsulatedValue;

}
