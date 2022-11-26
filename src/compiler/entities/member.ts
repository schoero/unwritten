import { EnumMember, PropertySignature, Symbol, TypeElement } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Kind, Member } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getModifiersByDeclaration } from "../compositions/modifiers.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { parseSymbol } from "../entry-points/symbol.js";
import { createTypeByDeclaration } from "../entry-points/type.js";
import { parseTypeNode } from "../entry-points/type-node.js";
import { isEnumMemberDeclaration, isPropertySignatureDeclaration, isTypeElement } from "../typeguards/declarations.js";
import { lockSymbol } from "../utils/ts.js";


export const createMemberBySymbol = (ctx: CompilerContext, memberSymbol: Symbol): Member => lockSymbol(ctx, memberSymbol, () => {

  const declaration = memberSymbol.valueDeclaration ?? memberSymbol.getDeclarations()?.[0];

  assert(declaration && (isPropertySignatureDeclaration(declaration) || isEnumMemberDeclaration(declaration) || isTypeElement(declaration)), "Member declaration not found");

  const id = getIdBySymbol(ctx, memberSymbol);
  const name = getNameBySymbol(ctx, memberSymbol);
  const fromDeclaration = createMemberByDeclaration(ctx, declaration);

  return {
    ...fromDeclaration,
    id,
    name
  };

});


export function createMemberByDeclaration(ctx: CompilerContext, declaration: EnumMember | PropertySignature | TypeElement): Member {

  const id = getIdByDeclaration(ctx, declaration);
  // @ts-expect-error - Internal API TODO: Check why this is necessary
  const type = declaration.type ? parseTypeNode(ctx, declaration.type) : createTypeByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const parentSymbol = isEnumMemberDeclaration(declaration) && ctx.checker.getSymbolAtLocation(declaration.parent.name);
  const parent = parentSymbol ? parseSymbol(ctx, parentSymbol) : undefined;
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);
  const optional = "questionToken" in declaration && declaration.questionToken !== undefined;
  const kind = Kind.Member;

  assert(name, "Member name not found");

  return {
    description,
    example,
    id,
    kind,
    modifiers,
    name,
    optional,
    parent,
    position,
    type
  };

}
