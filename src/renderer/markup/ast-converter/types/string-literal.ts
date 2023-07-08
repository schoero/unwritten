import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { StringLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedStringLiteralTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertStringLiteralTypeInline(ctx: MarkupRenderContexts, stringType: StringLiteralType): ConvertedStringLiteralTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = stringType.name;
  const value = stringType.value;
  const encapsulatedValue = encapsulate(encapsulate(value, renderConfig.stringLiteralEncapsulation), renderConfig.typeEncapsulation);

  return encapsulatedValue;

}
