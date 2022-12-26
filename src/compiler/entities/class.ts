import { ClassDeclaration, HeritageClause, NodeArray, ObjectType, Symbol } from "typescript";

import { createObjectTypeByType } from "quickdoks:compiler/shared/object-type.js";
import { lockType } from "quickdoks:compiler/utils/ts.js";
import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:compositions/modifiers.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { isClassDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { isExpression } from "quickdoks:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { ID } from "quickdoks:type-definitions/compositions.d.js";
import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Class, Expression, Kind } from "quickdoks:type-definitions/types.d.js";

import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createClassBySymbol(ctx: CompilerContext, symbol: Symbol): Class {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const tsInstanceType = ctx.checker.getTypeOfSymbolAtLocation(symbol, declaration) as ObjectType;
  const tsStaticType = ctx.checker.getDeclaredTypeOfSymbol(symbol) as ObjectType;

  const fromInstanceType = createClassByType(ctx, tsInstanceType);
  const fromStaticType = createClassByType(ctx, tsStaticType);

  const callSignatures = _mergeMembers([fromInstanceType, fromStaticType], "callSignatures");
  const constructSignatures = _mergeMembers([fromInstanceType, fromStaticType], "constructSignatures");
  const properties = _mergeMembers([fromInstanceType, fromStaticType], "properties");
  const methods = _mergeMembers([fromInstanceType, fromStaticType], "methods");
  const getters = _mergeMembers([fromInstanceType, fromStaticType], "getters");
  const setters = _mergeMembers([fromInstanceType, fromStaticType], "setters");

  const fromSymbol = _parseClassSymbol(ctx, symbol);
  const kind = Kind.Class;

  return {
    ...fromSymbol,
    callSignatures,
    constructSignatures,
    getters,
    kind,
    methods,
    properties,
    setters
  };

}


export const createClassByType = (ctx: CompilerContext, type: ObjectType): Class => lockType(ctx, type, () => {

  const fromInstanceType = createObjectTypeByType(ctx, type, Kind.Class);

  const symbol = type.getSymbol();

  if(symbol === undefined){
    return fromInstanceType;
  }

  const fromSymbol = _parseClassSymbol(ctx, symbol);

  const tsStaticType = ctx.checker.getDeclaredTypeOfSymbol(symbol) as ObjectType;
  const fromStaticType = createObjectTypeByType(ctx, tsStaticType, Kind.Class);

  const callSignatures = _mergeMembers([fromInstanceType, fromStaticType], "callSignatures");
  const constructSignatures = _mergeMembers([fromInstanceType, fromStaticType], "constructSignatures");
  const properties = _mergeMembers([fromInstanceType, fromStaticType], "properties");
  const methods = _mergeMembers([fromInstanceType, fromStaticType], "methods");
  const getters = _mergeMembers([fromInstanceType, fromStaticType], "getters");
  const setters = _mergeMembers([fromInstanceType, fromStaticType], "setters");


  return {
    ...fromSymbol,
    ...fromInstanceType,
    callSignatures,
    constructSignatures,
    getters,
    methods,
    properties,
    setters
  };
});


function _parseClassSymbol(ctx: CompilerContext, symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = _parseClassDeclaration(ctx, declaration);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name
  };

}

function _parseClassDeclaration(ctx: CompilerContext, declaration: ClassDeclaration) {

  const heritage = declaration.heritageClauses && _parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const modifiers = getModifiersByDeclaration(ctx, declaration);

  return {
    description,
    example,
    heritage,
    modifiers,
    position,
    typeParameters
  };

}

function _parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): Expression {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpression)[0];
}


function _mergeMembers<Key extends keyof {
  [Key in keyof Class as Class[Key] extends { id: ID; }[] ? Key : never]: Class[Key]
}>(classes: Class[], key: Key): Class[Key] {
  return classes.reduce<Class[Key]>((acc, declaration) => {
    for(const member of declaration[key]){
      // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
      if(acc.find(m => m.id === member.id)){
        continue;
      }
      // @ts-expect-error - TypeScript limitation https://github.com/microsoft/TypeScript/issues/51182
      acc.push(member);
    }
    return acc;
  }, []);
}
