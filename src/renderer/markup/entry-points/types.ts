import {
  renderAnyType,
  renderArrayType,
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
  renderTemplateLiteralType,
  renderTupleType,
  renderUndefinedType,
  renderUnionType,
  renderUnknownType,
  renderVoidType
} from "unwritten:renderer:markup/ast/types/index.js";
import {
  isAnyType,
  isArrayType,
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
  isTemplateLiteralType,
  isTupleType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:typeguards/types.js";

import type { Types } from "unwritten:compiler:type-definitions/types.d.js";
import type { RenderedTypes } from "unwritten:renderer:markup/types/renderer.js";


export function renderType(ctx: MarkupRenderContext, type: Types): RenderedTypes {

  if(isAnyType(type)){
    return renderAnyType(ctx, type);
  } else if(isArrayType(type)){
    return renderArrayType(ctx, type);
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
  } else if(isTemplateLiteralType(type)){
    return renderTemplateLiteralType(ctx, type);
  } else if(isTupleType(type)){
    return renderTupleType(ctx, type);
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
