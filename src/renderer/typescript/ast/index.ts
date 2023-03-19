import {
  renderFunctionLikeEntity,
  renderInterfaceEntity,
  renderNamespaceEntity,
  renderTypeAliasEntity,
  renderVariableEntity
} from "unwritten:renderer:typescript/ast/entities/index.js";
import {
  renderAnyType,
  renderArrayType,
  renderBooleanLiteralType,
  renderClassType,
  renderExpressionType,
  renderFunctionType,
  renderInterfaceType,
  renderIntersectionType,
  renderNeverType,
  renderNullType,
  renderNumberLiteralType,
  renderNumberType,
  renderObjectType,
  renderStringLiteralType,
  renderStringType,
  renderSymbolType,
  renderTupleType,
  renderTypeReferenceType,
  renderUndefinedType,
  renderUnionType,
  renderUnknownType,
  renderVoidType
} from "unwritten:renderer:typescript/ast/types/index.js";
import {
  isFunctionEntity,
  isInterfaceEntity,
  isNamespaceEntity,
  isTypeAliasEntity,
  isVariableEntity
} from "unwritten:typeguards/entities.js";
import {
  isAnyType,
  isArrayType,
  isBooleanLiteralType,
  isClassType,
  isExpressionType,
  isFunctionType,
  isInterfaceType,
  isIntersectionType,
  isNeverType,
  isNullType,
  isNumberLiteralType,
  isNumberType,
  isObjectType,
  isStringLiteralType,
  isStringType,
  isSymbolType,
  isTupleType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType,
  isUnknownType,
  isVoidType
} from "unwritten:typeguards/types.js";

import type { ExportableEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


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
  } else if(isTypeReferenceType(type)){
    return renderTypeReferenceType(ctx, type);
  } else if(isExpressionType(type)){
    return renderExpressionType(ctx, type);
  } else if(isInterfaceType(type)){
    return renderInterfaceType(ctx, type);
  } else if(isFunctionType(type)){
    return renderFunctionType(ctx, type);
  } else if(isClassType(type)){
    return renderClassType(ctx, type);
  } else if(isObjectType(type)){
    return renderObjectType(ctx, type);
  }

}

export function renderEntity(ctx: TypeScriptRenderContext, entity: ExportableEntities): string {

  if(isFunctionEntity(entity)){
    return renderFunctionLikeEntity(ctx, entity);
  } else if(isVariableEntity(entity)){
    return renderVariableEntity(ctx, entity);
  } else if(isTypeAliasEntity(entity)){
    return renderTypeAliasEntity(ctx, entity);
  } else if(isInterfaceEntity(entity)){
    return renderInterfaceEntity(ctx, entity);
  } else if(isNamespaceEntity(entity)){
    return renderNamespaceEntity(ctx, entity);
  }

}
