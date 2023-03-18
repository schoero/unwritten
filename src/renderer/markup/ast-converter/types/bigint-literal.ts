import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedBigIntLiteralType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertBigIntLiteralType(ctx: MarkupRenderContexts, bigIntType: BigIntLiteralType): ConvertedBigIntLiteralType {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const value = bigIntType.value.toString();
  const encapsulatedValue = encapsulate(value, renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
