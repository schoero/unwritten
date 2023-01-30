import { createTypeParameterEntity } from "unwritten:compiler:entities";
import { parseTypeNode } from "unwritten:compiler:entry-points/type-node.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdBySymbol, getIdByTypeNode } from "unwritten:compiler:mixins/id.js";
import { getPositionByDeclaration } from "unwritten:compiler:mixins/position.js";
import { isMappedTypeNode, isTypeNode, isUnionTypeNode } from "unwritten:compiler:typeguards/type-nodes.js";
import { lockType } from "unwritten:compiler:utils/ts.js";
import { isLiteralType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { ObjectType, TypeNode } from "typescript";

import type { MappedTypeMemberEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { MappedType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export const createMappedTypeByType = (ctx: CompilerContext, type: ObjectType): MappedType => lockType(ctx, type, () => {

  const symbol = type.symbol;
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isTypeNode(declaration) && isMappedTypeNode(declaration), "Mapped type must have a declaration");

  const id = getIdBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const optional = declaration.questionToken !== undefined;
  const readonly = declaration.readonlyToken !== undefined;
  const typeParameter = createTypeParameterEntity(ctx, declaration.typeParameter);
  const kind = TypeKind.Mapped;

  assert(declaration.type, "Mapped type must have a type");
  assert(declaration.typeParameter.constraint && isUnionTypeNode(declaration.typeParameter.constraint), "Mapped type must have a union constraint");

  const members = declaration.typeParameter.constraint.types.map(keyTypeNode => parseMember(ctx, keyTypeNode, declaration.type!));

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


function parseMember(ctx: CompilerContext, keyTypeNode: TypeNode, valueTypeNode: TypeNode): MappedTypeMemberEntity {

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
