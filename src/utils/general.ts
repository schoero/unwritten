import minimatch from "minimatch";
import { Symbol } from "typescript";

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

export function isPathExcluded(path: string, excludePaths: string[]): boolean {
  return excludePaths.reduce((value, excludePath) => {
    const isInverted = (excludePath.match(/^!+/) ?? [""])[0]!.length % 2 !== 0;
    const pathWithoutInverts = excludePath.replace(/^!+/, "");
    const pathWithoutLeadingSlash = pathWithoutInverts.replace(/^\//, "");
    const prefixedPath = `**/${pathWithoutLeadingSlash}`;
    const result = minimatch(path, prefixedPath);
    return !result ? value : !isInverted;
  }, false);
}
