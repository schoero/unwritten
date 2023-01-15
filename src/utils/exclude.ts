import { minimatch } from "minimatch";

import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";

import type { Declaration, Symbol } from "typescript";

import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function isSymbolExcluded(ctx: CompilerContext, symbol: Symbol): boolean {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  if(!declaration){
    return false;
  }

  return isDeclarationExcluded(ctx, declaration);

}


function isDeclarationExcluded(ctx: CompilerContext, declaration: Declaration): boolean {

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
