import { createSignatureEntity } from "quickdoks:compiler:entities";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { isFunctionLikeDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { functionOverloadDeclarationFilter } from "quickdoks:compiler:utils/filter.js";
import { assert } from "quickdoks:utils/general.js";

import type { Symbol } from "typescript";

import type {
  FunctionLikeEntityKinds,
  InferFunctionLikeEntityKind
} from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createFunctionLikeEntity<Kind extends FunctionLikeEntityKinds>(ctx: CompilerContext, symbol: Symbol, kind: Kind): InferFunctionLikeEntityKind<Kind> {

  const declarations = symbol.declarations?.filter(isFunctionLikeDeclaration)
    .filter(declaration => functionOverloadDeclarationFilter(ctx, declaration, symbol)) ?? [];

  const signatures = declarations.map(declaration => {
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
