import { createTypeParameterEntity } from "quickdoks:compiler:entities";
import { createObjectLikeType } from "quickdoks:compiler:ast/types/object-type.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getModifiersByDeclaration } from "quickdoks:compiler:mixins/modifiers.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isClassDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";
import { isExpressionEntity } from "quickdoks:typeguards/entities.js";
import { assert } from "quickdoks:utils:general.js";

import type { ClassDeclaration, HeritageClause, NodeArray, ObjectType, Symbol } from "typescript";

import type { ExpressionEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { ID } from "quickdoks:compiler:type-definitions/mixins.d.js";
import type { ClassType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createClassType = (ctx: CompilerContext, type: ObjectType): ClassType => lockType(ctx, type, () => {

  const fromInstanceType = createObjectLikeType(ctx, type, TypeKind.ClassType);

  const symbol = type.getSymbol();

  if(symbol === undefined){
    return fromInstanceType;
  }

  const fromSymbol = parseClassSymbol(ctx, symbol);

  const tsStaticType = ctx.checker.getDeclaredTypeOfSymbol(symbol) as ObjectType;
  const fromStaticType = createObjectLikeType(ctx, tsStaticType, TypeKind.ClassType);

  const callSignatures = mergeMembers([fromInstanceType, fromStaticType], "callSignatures");
  const constructSignatures = mergeMembers([fromInstanceType, fromStaticType], "constructSignatures");
  const properties = mergeMembers([fromInstanceType, fromStaticType], "properties");
  const methods = mergeMembers([fromInstanceType, fromStaticType], "methods");
  const getters = mergeMembers([fromInstanceType, fromStaticType], "getters");
  const setters = mergeMembers([fromInstanceType, fromStaticType], "setters");


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


function parseClassSymbol(ctx: CompilerContext, symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isClassDeclaration(declaration), "Class declaration is not found");

  const fromDeclaration = parseClassDeclaration(ctx, declaration);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return {
    ...fromDeclaration,
    id,
    name
  };

}

function parseClassDeclaration(ctx: CompilerContext, declaration: ClassDeclaration) {

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
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

function parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): ExpressionEntity {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpressionEntity)[0];
}


function mergeMembers<Key extends keyof {
  [Key in keyof ClassType as ClassType[Key] extends { id: ID; }[] ? Key : never]: ClassType[Key]
}>(classes: ClassType[], key: Key): ClassType[Key] {
  return classes.reduce<ClassType[Key]>((acc, declaration) => {
    for(const member of declaration[key]){
      if(acc.find(m => m.id === member.id)){
        continue;
      }
      acc.push(member);
    }
    return acc;
  }, []);
}
