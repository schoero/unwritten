import { isStringLiteralType } from "../../../typeguards/types.js";
import { RenderContext } from "../../../types/context.js";
import { BigIntLiteralType, BooleanLiteralType, NumberLiteralType, StringLiteralType } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { getRenderConfig } from "../utils/config.js";
import { encapsulate } from "../utils/renderer.js";


export function renderLiteralType(ctx: RenderContext<MarkupRenderer>, type: BigIntLiteralType | BooleanLiteralType | NumberLiteralType | StringLiteralType) {
  const renderConfig = getRenderConfig(ctx);
  if(isStringLiteralType(type)){
    return encapsulate(`"${type.value}"`, renderConfig.stringLiteralTypeEncapsulation);
  } else {
    return `${type.value}`;
  }
}
