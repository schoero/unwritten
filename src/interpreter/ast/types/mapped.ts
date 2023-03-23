import { createPropertyEntity, createTypeParameterEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isMappedTypeNode, isTypeNode, isUnionTypeNode } from "unwritten:interpreter/typeguards/type-nodes.js";
import { parseTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdBySymbol, getIdByTypeNode } from "unwritten:interpreter:ast/shared/id.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { lockType } from "unwritten:interpreter:utils/ts.js";
import { isLiteralType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { MappedTypeNode, ObjectType, TypeNode } from "typescript";

import type { MappedType } from "unwritten:interpreter/type-definitions/types.js";
import type { MappedTypeMemberEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createMappedTypeByTypeNode(ctx: InterpreterContext, typeNode: MappedTypeNode): MappedType {

  const id = getIdByTypeNode(ctx, typeNode);
  const position = getPositionByDeclaration(ctx, typeNode);
  const optional = typeNode.questionToken !== undefined;
  const readonly = typeNode.readonlyToken !== undefined;
  const typeParameter = createTypeParameterEntity(ctx, typeNode.typeParameter);
  const kind = TypeKind.Mapped;

  assert(typeNode.type, "Mapped type must have a type");
  assert(typeNode.typeParameter.constraint && isUnionTypeNode(typeNode.typeParameter.constraint), "Mapped type must have a union constraint");

  const members = typeNode.typeParameter.constraint.types.map(keyTypeNode => parseMember(ctx, keyTypeNode, typeNode.type!));

  return {
    id,
    kind,
    members,
    optional,
    position,
    readonly,
    typeParameter
  };

}

export const createMappedType = (ctx: InterpreterContext, type: ObjectType): MappedType => lockType(ctx, type, () => {

  const symbol = type.symbol;
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isTypeNode(declaration) && isMappedTypeNode(declaration), "Mapped type must have a declaration");

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const readonly = declaration.readonlyToken !== undefined;
  const typeParameter = createTypeParameterEntity(ctx, declaration.typeParameter);
  const kind = TypeKind.Mapped;

  // assert(declaration.type, "Mapped type must have a type");
  // assert(declaration.typeParameter.constraint && isUnionTypeNode(declaration.typeParameter.constraint), "Mapped type must have a union constraint");

  const props = type.getProperties();
  const members = props.map(property => createPropertyEntity(ctx, property));

  // const members = declaration.typeParameter.constraint.types.map(keyTypeNode => parseMember(ctx, keyTypeNode, declaration.type!));

  // const id = getIdByType(ctx, type);
  // const position = getPositionByType(ctx, type);
  // const optional = false;
  // const readonly = false;

  // const kind = TypeKind.Mapped;

  // const typeParameter = parseType(ctx, type.typeParameter);

  // const properties = type.getProperties();
  // const members = properties.map(property => {

  //   const keyType = parseType(ctx, property.links.keyType);
  //   const mappedType = parseType(ctx, property.links.mappedType);
  //   const nameType = parseType(ctx, property.links.nameType);

  //   const type = ctx.checker.getTypeAtLocation(property);


  //   return {
  //     keyType,
  //     mappedType
  //   };

  // });

  return {
    id,
    kind,
    members,
    optional,
    position,
    readonly,
    typeParameter
  };

});


function parseMember(ctx: InterpreterContext, keyTypeNode: TypeNode, valueTypeNode: TypeNode): MappedTypeMemberEntity {

  const keyType = parseTypeNode(ctx, keyTypeNode);
  const valueType = parseTypeNode(ctx, valueTypeNode);
  const id = getIdByTypeNode(ctx, keyTypeNode);
  const kind = EntityKind.MappedTypeMember;

  assert(isLiteralType(keyType), "Mapped type key must be a literal type");

  return {
    id,
    keyType,
    kind,
    valueType
  };

}

// export function createMappedTypeByTypeNode(ctx: InterpreterContext, typeNode: MappedTypeNode): MappedType {

//   const tp = ctx.checker.getTypeFromTypeNode(typeNode);

//   const id = getIdByTypeNode(ctx, typeNode);
//   const position = getPositionByNode(ctx, typeNode);
//   const typeParameter = createTypeParameterByDeclaration(ctx, typeNode.typeParameter);
//   const type = typeNode.type && createTypeByTypeNode(ctx, typeNode.type);
//   const kind = TypeKind.MappedType;

//   return {
//     id,
//     kind,
//     position,
//     type,
//     typeParameter
//   };

// }
