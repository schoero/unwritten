import {
  renderAnyType,
  renderBigIntLiteralType,
  renderBigIntType,
  renderBooleanLiteralType,
  renderBooleanType,
  renderNeverType,
  renderNullType,
  renderNumberLiteralType,
  renderNumberType,
  renderStringLiteralType,
  renderStringType,
  renderSymbolType,
  renderUndefinedType,
  renderUnionType,
  renderUnknownType,
  renderVoidType
} from "quickdoks:renderer:markup/ast/types/index.js";
import {
  isAnyType,
  isBigIntLiteralType,
  isBigIntType,
  isBooleanLiteralType,
  isBooleanType,
  isNeverType,
  isNullType,
  isNumberLiteralType,
  isNumberType,
  isStringLiteralType,
  isStringType,
  isSymbolType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "quickdoks:typeguards/types.js";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer, RenderedTypes } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderType(ctx: RenderContext<MarkupRenderer>, type: Types): RenderedTypes {

  if(isAnyType(type)){
    return renderAnyType(ctx, type);
  } else if(isBigIntLiteralType(type)){
    return renderBigIntLiteralType(ctx, type);
  } else if(isBigIntType(type)){
    return renderBigIntType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return renderBooleanLiteralType(ctx, type);
  } else if(isBooleanType(type)){
    return renderBooleanType(ctx, type);
  } else if(isNeverType(type)){
    return renderNeverType(ctx, type);
  } else if(isNullType(type)){
    return renderNullType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return renderNumberLiteralType(ctx, type);
  } else if(isNumberType(type)){
    return renderNumberType(ctx, type);
  } else if(isStringLiteralType(type)){
    return renderStringLiteralType(ctx, type);
  } else if(isStringType(type)){
    return renderStringType(ctx, type);
  } else if(isSymbolType(type)){
    return renderSymbolType(ctx, type);
  } else if(isUndefinedType(type)){
    return renderUndefinedType(ctx, type);
  } else if(isUnionType(type)){
    return renderUnionType(ctx, type);
  } else if(isUnknownType(type)){
    return renderUnknownType(ctx, type);
  } else if(isVoidType(type)){
    return renderVoidType(ctx, type);
  }

  throw new Error(`Unknown type: ${type.kind}`);

}
