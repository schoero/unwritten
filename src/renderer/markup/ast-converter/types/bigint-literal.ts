import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedBigIntLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertBigIntLiteralTypeInline(ctx: MarkupRenderContexts, bigIntType: BigIntLiteralType): ConvertedBigIntLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const value = bigIntType.value.toString();
  const encapsulatedValue = encapsulate(value, renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
