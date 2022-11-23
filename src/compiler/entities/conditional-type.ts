import { ConditionalType as TSConditionalType } from "typescript";

import { isLiteralType } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { ConditionalType, TypeKind, Types } from "../../types/types.js";
import { createTypeByTypeNode } from "./type.js";


export function createConditionalType(ctx: CompilerContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const checkType = createTypeByTypeNode(ctx, root.node.checkType);
  const extendsType = createTypeByTypeNode(ctx, root.node.extendsType);
  const trueType = createTypeByTypeNode(ctx, root.node.trueType);
  const falseType = createTypeByTypeNode(ctx, root.node.falseType);

  const resolvedType = _resolveCondition(checkType, extendsType, trueType, falseType);

  const kind = TypeKind.ConditionalType;

  return {
    checkType,
    extendsType,
    falseType,
    kind,
    resolvedType,
    trueType
  };

}


function _resolveCondition(checkType: Types, extendsType: Types, trueType: Types, falseType: Types): Types {
  if(isLiteralType(checkType) && isLiteralType(extendsType)){
    return checkType.value === extendsType.value ? trueType : falseType;
  }
  return falseType;
}
