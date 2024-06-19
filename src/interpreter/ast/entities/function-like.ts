import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { createSignatureEntity } from "unwritten:interpreter:ast/entities/index";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isFunctionLikeDeclaration,
  isMethodSignatureDeclaration
} from "unwritten:interpreter:typeguards/declarations";
import { functionOverloadDeclarationFilter } from "unwritten:interpreter:utils/filter";
import { assert } from "unwritten:utils/general";

import type { Symbol } from "typescript";

import type {
  FunctionLikeEntityKinds,
  InferFunctionLikeEntityKind
} from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createFunctionLikeEntity = <Kind extends FunctionLikeEntityKinds>(ctx: InterpreterContext, symbol: Symbol, kind: Kind): InferFunctionLikeEntityKind<Kind> => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const declarations = symbol.declarations?.flatMap(declaration => isFunctionLikeDeclaration(ctx, declaration) ||
    isCallSignatureDeclaration(ctx, declaration) ||
    isConstructSignatureDeclaration(ctx, declaration) ||
    isMethodSignatureDeclaration(ctx, declaration)
    ? declaration
    : []);

  const signatureDeclarations = declarations?.filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol));

  const signatures = signatureDeclarations?.map(declaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(declaration);
    assert(signature, "FunctionLike signature is not found");
    return createSignatureEntity(ctx, signature, signatureKindMap[kind]);
  });

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return <InferFunctionLikeEntityKind<Kind>>{
    kind,
    name,
    signatures,
    symbolId
  };

}));

const signatureKindMap = {
  [EntityKind.Function]: EntityKind.FunctionSignature,
  [EntityKind.Method]: EntityKind.MethodSignature,
  [EntityKind.Setter]: EntityKind.SetterSignature,
  [EntityKind.Getter]: EntityKind.GetterSignature,
  [EntityKind.Constructor]: EntityKind.ConstructSignature
} as const;
