import { ObjectType, TypeNode } from "typescript";
import { assert } from "vitest";

import { isLiteralType } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { Kind, MappedType, MappedTypeMember } from "../../types/types.js";
import { getIdBySymbol, getIdByTypeNode } from "../compositions/id.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { parseTypeNode } from "../entry-points/type-node.js";
import { isMappedTypeNode, isTypeNode, isUnionTypeNode } from "../typeguards/type-nodes.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createMappedTypeByType(ctx: CompilerContext, type: ObjectType): MappedType {

  const symbol = type.symbol;
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isTypeNode(declaration) && isMappedTypeNode(declaration), "Mapped type must have a declaration");

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const readonly = declaration.readonlyToken !== undefined;
  const typeParameter = createTypeParameterByDeclaration(ctx, declaration.typeParameter);
  const kind = Kind.MappedType;

  assert(declaration.type, "Mapped type must have a type");
  assert(declaration.typeParameter.constraint && isUnionTypeNode(declaration.typeParameter.constraint), "Mapped type must have a union constraint");

  const members = declaration.typeParameter.constraint.types.map(keyTypeNode => _parseMember(ctx, keyTypeNode, declaration.type!));

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


function _parseMember(ctx: CompilerContext, keyTypeNode: TypeNode, valueTypeNode: TypeNode): MappedTypeMember {

  const keyType = parseTypeNode(ctx, keyTypeNode);
  const valueType = parseTypeNode(ctx, valueTypeNode);
  const id = getIdByTypeNode(ctx, keyTypeNode);
  const kind = Kind.MappedTypeMember;

  assert(isLiteralType(keyType), "Mapped type key must be a literal type");

  return {
    id,
    keyType,
    kind,
    valueType
  };

}

// export function createMappedTypeByTypeNode(ctx: CompilerContext, typeNode: MappedTypeNode): MappedType {

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
