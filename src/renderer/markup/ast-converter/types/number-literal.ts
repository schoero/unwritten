import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NumberLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedNumberLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNumberLiteralTypeInline(ctx: MarkupRenderContexts, numberType: NumberLiteralType): ConvertedNumberLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const value = numberType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
