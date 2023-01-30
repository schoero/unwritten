import { createSourceFileEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { NamespaceEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createNamespaceEntity(ctx: CompilerContext, symbol: Symbol): NamespaceEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);
  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

}
