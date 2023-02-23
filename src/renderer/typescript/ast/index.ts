import { renderFunctionLikeEntity } from "unwritten:renderer/typescript/ast/entities/function-like.js";
import {
  renderAnyType,
  renderArrayType,
  renderBooleanLiteralType,
  renderIntersectionType,
  renderNeverType,
  renderNullType,
  renderNumberLiteralType,
  renderNumberType,
  renderStringLiteralType,
  renderStringType,
  renderSymbolType,
  renderTupleType,
  renderUndefinedType,
  renderUnionType,
  renderUnknownType,
  renderVoidType
} from "unwritten:renderer/typescript/ast/types/index.js";
import { isFunctionEntity } from "unwritten:typeguards/entities.js";
import {
  isAnyType,
  isArrayType,
  isBooleanLiteralType,
  isIntersectionType,
  isNeverType,
  isNullType,
  isNumberLiteralType,
  isNumberType,
  isStringLiteralType,
  isStringType,
  isSymbolType,
  isTupleType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:typeguards/types.js";

import type { ExportableEntities } from "unwritten:compiler/type-definitions/entities.js";
import type { Types } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderType(ctx: TypeScriptRenderContext, type: Types): string {
  if(isStringType(type)){
    return renderStringType(ctx, type);
  } else if(isStringLiteralType(type)){
    return renderStringLiteralType(ctx, type);
  } else if(isNumberType(type)){
    return renderNumberType(ctx, type);
  } else if(isNumberLiteralType(type)){
    return renderNumberLiteralType(ctx, type);
  } else if(isBooleanLiteralType(type)){
    return renderBooleanLiteralType(ctx, type);
  } else if(isAnyType(type)){
    return renderAnyType(ctx, type);
  } else if(isUndefinedType(type)){
    return renderUndefinedType(ctx, type);
  } else if(isUnknownType(type)){
    return renderUnknownType(ctx, type);
  } else if(isUnionType(type)){
    return renderUnionType(ctx, type);
  } else if(isIntersectionType(type)){
    return renderIntersectionType(ctx, type);
  } else if(isSymbolType(type)){
    return renderSymbolType(ctx, type);
  } else if(isArrayType(type)){
    return renderArrayType(ctx, type);
  } else if(isNullType(type)){
    return renderNullType(ctx, type);
  } else if(isNeverType(type)){
    return renderNeverType(ctx, type);
  } else if(isVoidType(type)){
    return renderVoidType(ctx, type);
  } else if(isTupleType(type)){
    return renderTupleType(ctx, type);
  }

}

export function renderEntity(ctx: TypeScriptRenderContext, entity: ExportableEntities): string {
  if(isFunctionEntity(entity)){
    return renderFunctionLikeEntity(ctx, entity);
  }
}
