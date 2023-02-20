import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { NumberLiteralType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ConvertedNumberLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertNumberLiteralType(ctx: MarkupRenderContexts, numberType: NumberLiteralType): ConvertedNumberLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const value = numberType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
