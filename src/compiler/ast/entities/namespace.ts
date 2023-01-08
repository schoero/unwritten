import { createSourceFileEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { NamespaceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createNamespaceBySymbol(ctx: CompilerContext, symbol: Symbol): NamespaceEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);
  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

}
