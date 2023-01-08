import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import { createSourceFileEntity } from "./source-file.js";

import type { Symbol } from "typescript";

import type { ModuleEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createModuleEntity(ctx: CompilerContext, symbol: Symbol): ModuleEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);
  const kind = EntityKind.Module;

  return {
    ...fromSourceFile,
    kind
  };

}
