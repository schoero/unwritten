import { getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { interpretSymbol } from "unwritten:interpreter/ast/symbol";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { isExportableEntity } from "unwritten:typeguards/entities";
import { assert } from "unwritten:utils/general";

import type { Symbol } from "typescript";
import type { ExportableEntity, SourceFileEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createSourceFileEntity = (ctx: InterpreterContext, symbol: Symbol): SourceFileEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const { getFileName } = ctx.dependencies.path;

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration, "Source file symbol has no declaration");

  const exports = ctx.checker.getExportsOfModule(symbol)
    .reduce<ExportableEntity[]>((parsedSymbols, exportedSymbol) => {

      const parsedSymbol = interpretSymbol(ctx, exportedSymbol);

      // don't document unresolved entities
      if(isExportableEntity(parsedSymbol)){
        parsedSymbols.push(parsedSymbol);
      }

      return parsedSymbols;

    }, []);

  const symbolId = getSymbolId(ctx, symbol);
  const path = declaration.getSourceFile().fileName;
  const name = getFileName(path);
  const kind = EntityKind.SourceFile;

  return {
    exports,
    kind,
    name,
    path,
    symbolId
  };

}));
