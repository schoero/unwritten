import { getIdBySymbol } from "unwritten:compiler/ast/shared/id.js";
import { getNameBySymbol } from "unwritten:compiler/ast/shared/name.js";
import { createSignatureEntity } from "unwritten:compiler:entities";
import {
  isCallSignatureDeclaration,
  isConstructSignatureDeclaration,
  isFunctionLikeDeclaration,
  isMethodSignatureDeclaration
} from "unwritten:compiler:typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "unwritten:compiler:utils/filter.js";
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
} from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createFunctionLikeEntity<Kind extends FunctionLikeEntityKinds>(ctx: CompilerContext, symbol: Symbol, kind: Kind): InferFunctionLikeEntityKind<Kind> {

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

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);

  return <InferFunctionLikeEntityKind<Kind>>{
    id,
    kind,
    name,
    signatures
  };

}
