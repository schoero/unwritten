import { Symbol, TypeNode, TypeParameter as TSTypeParameter, TypeParameterDeclaration } from "typescript";
import { assert } from "vitest";

import { isTypeParameterDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { TypeKind, TypeParameter } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createTypeByTypeNode } from "./type.js";


export function createTypeParameterBySymbol(ctx: CompilerContext, symbol: Symbol): TypeParameter {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeParameterDeclaration(declaration), "Declaration is not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const constraints = declaration.constraint && createTypeByTypeNode(ctx, declaration.constraint);
  const kind = TypeKind.TypeParameter;

  return {
    constraints,
    id,
    kind,
    name,
    position
  };

}


export function createTypeParameterByDeclaration(ctx: CompilerContext, declaration: TypeParameterDeclaration): TypeParameter {

  const symbol = ctx.checker.getSymbolAtLocation(declaration.name);

  assert(symbol, "Symbol is not found");

  return createTypeParameterBySymbol(ctx, symbol);

}


export function createTypeParameterByType(ctx: CompilerContext, typeParameter: TSTypeParameter): TypeParameter {

  const symbol = typeParameter.getSymbol() ?? typeParameter.aliasSymbol;

  assert(symbol, "Symbol is not found");

  return createTypeParameterBySymbol(ctx, symbol);

}


export function createTypeParameterByTypeNode(ctx: CompilerContext, typeNode: TypeNode): TypeParameter {
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createTypeParameterByType(ctx, type);
}