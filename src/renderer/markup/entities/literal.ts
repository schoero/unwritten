import { MarkupRenderer, RenderedLiteralType } from "quickdoks:renderer:markup/types/renderer.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate } from "quickdoks:renderer:markup/utils/renderer.js";
import { isStringLiteralType } from "quickdoks:typeguards/types.js";
import { RenderContext } from "quickdoks:types:context.js";
import { BigIntLiteralType, BooleanLiteralType, NumberLiteralType, StringLiteralType } from "quickdoks:types:types.js";


export function renderLiteralType(ctx: RenderContext<MarkupRenderer>, type: BigIntLiteralType | BooleanLiteralType | NumberLiteralType | StringLiteralType): RenderedLiteralType {
  const renderConfig = getRenderConfig(ctx);
  if(isStringLiteralType(type)){
    return encapsulate(`${type.value}`, renderConfig.stringLiteralTypeEncapsulation);
  } else {
    return `${type.value.toString()}`;
  }
}
