import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { BigIntLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedBigIntLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertBigIntLiteralTypeInline(ctx: MarkupRenderContext, bigIntType: BigIntLiteralType): ConvertedBigIntLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = bigIntType.name;
  const value = bigIntType.value.toString();
  const encapsulatedValue = encapsulate(value, renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
