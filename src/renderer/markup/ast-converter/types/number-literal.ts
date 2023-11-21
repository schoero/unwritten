import { getRenderConfig } from "unwritten:renderer/utils/config";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { NumberLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedNumberLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertNumberLiteralTypeInline(ctx: MarkupRenderContext, numberType: NumberLiteralType): ConvertedNumberLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = numberType.name;
  const value = numberType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
