import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedBooleanLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertBooleanLiteralTypeInline(ctx: MarkupRenderContexts, booleanType: BooleanLiteralType): ConvertedBooleanLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const value = booleanType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
