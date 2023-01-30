import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { getRenderConfig } from "quickdoks:renderer/markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer/markup/utils/renderer.js";

import type { StringLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { MarkupRenderer, RenderedStringLiteralType } from "quickdoks:renderer/markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.js";


export function renderStringLiteralType(ctx: RenderContext<MarkupRenderer>, stringType: StringLiteralType): RenderedStringLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const value = stringType.value;
  const encapsulatedValue = encapsulate(encapsulate(value, renderConfig.stringLiteralEncapsulation), renderConfig.typeEncapsulation);
  const link = ctx.config.externalTypes[TypeKind.StringLiteral] && ctx.renderer.renderHyperLink(encapsulatedValue, ctx.config.externalTypes[TypeKind.StringLiteral]);

  return link ?? encapsulatedValue;

}
