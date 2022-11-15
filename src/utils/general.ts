import minimatch from "minimatch";
import ts, { Symbol } from "typescript";

import { getPositionByDeclaration } from "../compiler/compositions/position.js";
import { CompilerContext } from "../types/context.js";


export function isSymbolExcluded(ctx: CompilerContext, symbol: Symbol): boolean {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  if(!declaration){
    return false;
  }

  const position = getPositionByDeclaration(ctx, declaration);
  const excludePaths = ctx.config.compilerConfig.exclude;

  return isPathExcluded(position.file, excludePaths);

}


export function isSymbolExported(ctx: CompilerContext, symbol: Symbol): boolean {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  return (declaration && ts.canHaveModifiers(declaration)
    ? ts.getModifiers(declaration) ?? []
    : []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);

}

export function isPathExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.reduce((_, excludePath) => minimatch(path, excludePath), false);
}
