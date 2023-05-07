import { createPropertyEntity, createTypeParameterEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { interpretTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";

import type { MappedTypeNode } from "typescript";

import type { MappedType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createMappedTypeByTypeNode(ctx: InterpreterContext, typeNode: MappedTypeNode): MappedType {

  const kind = TypeKind.Mapped;
  const typeId = getIdByTypeNode(ctx, typeNode);
  const position = getPositionByDeclaration(ctx, typeNode);
  const optional = typeNode.questionToken !== undefined;
  const readonly = typeNode.readonlyToken !== undefined;

  const tsType = ctx.checker.getTypeFromTypeNode(typeNode);
  const tsProperties = tsType.getProperties();

  const typeParameter = createTypeParameterEntity(ctx, typeNode.typeParameter);
  const properties = tsProperties.map(property => createPropertyEntity(ctx, property));
  const valueType = typeNode.type && interpretTypeNode(ctx, typeNode.type);

  return {
    kind,
    optional,
    position,
    properties,
    readonly,
    typeId,
    typeParameter,
    valueType
  };

}
