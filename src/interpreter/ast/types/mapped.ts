import { createTypeParameterEntityByDeclaration } from "unwritten:interpreter/ast/entities/index.js";
import {
  getResolvedTypeByTypeNode,
  getTypeByResolvedAndDeclaredType,
  getTypeByTypeNode
} from "unwritten:interpreter/ast/type.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";

import type { MappedTypeNode } from "typescript";

import type { MappedType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createMappedTypeByTypeNode(ctx: InterpreterContext, typeNode: MappedTypeNode): MappedType {

  const kind = TypeKind.Mapped;
  const typeId = getIdByTypeNode(ctx, typeNode);
  const position = getPositionByDeclaration(ctx, typeNode);
  const optional = typeNode.questionToken !== undefined;
  const readonly = typeNode.readonlyToken !== undefined;
  const resolvedType = getResolvedTypeByTypeNode(ctx, typeNode);
  const type = getTypeByResolvedAndDeclaredType(ctx, resolvedType);
  const typeParameter = createTypeParameterEntityByDeclaration(ctx, typeNode.typeParameter);
  const valueType = typeNode.type && getTypeByTypeNode(ctx, typeNode.type);

  return {
    kind,
    optional,
    position,
    readonly,
    type,
    typeId,
    typeParameter,
    valueType
  };

}
