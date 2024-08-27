import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedBooleanLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertBooleanLiteralTypeInline(ctx: MarkupRenderContext, booleanType: BooleanLiteralType): ConvertedBooleanLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = booleanType.name;
  const value = booleanType.value.toString();
  const encapsulatedValue = encapsulate(value.toString(), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
