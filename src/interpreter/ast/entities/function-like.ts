import { createSignatureEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isFunctionLikeDeclaration,
  isMethodSignatureDeclaration
} from "unwritten:interpreter:typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "unwritten:interpreter:utils/filter.js";
import { assert } from "unwritten:utils/general.js";

import type {
  CallSignatureDeclaration,
  ConstructSignatureDeclaration,
  FunctionLikeDeclaration,
  MethodSignature,
  Symbol
} from "typescript";

import type {
  FunctionLikeEntityKinds,
  InferFunctionLikeEntityKind
} from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createFunctionLikeEntity<Kind extends FunctionLikeEntityKinds>(ctx: InterpreterContext, symbol: Symbol, kind: Kind): InferFunctionLikeEntityKind<Kind> {

  const declarations = symbol.declarations?.filter(declaration =>
    isFunctionLikeDeclaration(declaration) ||
      isCallSignatureDeclaration(declaration) ||
      isConstructSignatureDeclaration(declaration) ||
      isMethodSignatureDeclaration(declaration)) as (CallSignatureDeclaration | ConstructSignatureDeclaration | FunctionLikeDeclaration | MethodSignature)[];

  const signatureDeclarations = declarations.filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol));

  const signatures = signatureDeclarations.map(declaration => {
    const signature = ctx.checker.getSignatureFromDeclaration(declaration);
    assert(signature, "FunctionLike signature is not found");
    return createSignatureEntity(ctx, signature);
  });

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return <InferFunctionLikeEntityKind<Kind>>{
    kind,
    name,
    signatures,
    symbolId
  };

}