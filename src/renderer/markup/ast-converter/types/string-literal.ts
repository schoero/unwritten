import { getRenderConfig } from "unwritten:renderer/utils/config";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { StringLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedStringLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertStringLiteralTypeInline(ctx: MarkupRenderContexts, stringType: StringLiteralType): ConvertedStringLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const value = stringType.value;
  const encapsulatedValue = encapsulate(encapsulate(value, renderConfig.stringLiteralEncapsulation), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
