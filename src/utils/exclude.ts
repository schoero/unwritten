import { minimatch } from "minimatch";

import { getNameByDeclaration } from "unwritten:interpreter/ast/shared/name";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";

import type { Declaration, Symbol } from "typescript";

import type { InterpreterConfig } from "unwritten:type-definitions/config";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function isExcluded(path: string, name: string = "*", excludedPaths: InterpreterConfig["exclude"]): boolean {

  if(!excludedPaths){
    return false;
  }

  const normalizedExcludedPaths = Array.isArray(excludedPaths)
    ? excludedPaths.reduce<{ [key: string]: string[]; }>((excludePaths, excludePath) => {
      excludePaths[excludePath] = ["*"];
      return excludePaths;
    }, {})
    : excludedPaths;

  return Object.entries(normalizedExcludedPaths)
    .reduce((excludedFromPreviousFile, [excludedPath, excludedNames]) => {

      const fileIsInverted = (excludedPath.match(/^!+/) ?? [""])[0]!.length % 2 !== 0;
      const pathWithoutInverts = excludedPath.replace(/^!+/, "");
      const pathWithoutLeadingSlash = pathWithoutInverts.replace(/^\//, "");
      const prefixedPath = `**/${pathWithoutLeadingSlash}`;
      const fileMatch = minimatch(path, prefixedPath);

      if(!fileMatch){
        return excludedFromPreviousFile;
      }

      const normalizedExcludedNames = Array.isArray(excludedNames) ? excludedNames : [excludedNames];

      const excludedFromName = normalizedExcludedNames
        .reduce<boolean | undefined>((excludedFromPreviousName, excludedName) => {

        const nameIsInverted = (excludedName.match(/^!+/) ?? [""])[0]!.length % 2 !== 0;
        const nameWithoutInverts = excludedName.replace(/^!+/, "");

        if(nameWithoutInverts === "*"){
          return true;
        } else if(nameWithoutInverts === name){
          return !nameIsInverted;
        } else {
          return excludedFromPreviousName;
        }

      }, undefined);

      if(excludedFromName === undefined){
        return excludedFromPreviousFile;
      }

      return fileIsInverted ? !excludedFromName : excludedFromName;

    }, false);

}


function isDeclarationExcluded(ctx: InterpreterContext, declaration: Declaration, name?: string): boolean {

  const position = getPositionByDeclaration(ctx, declaration);
  const excludePaths = ctx.config.interpreterConfig.exclude;
  name ??= getNameByDeclaration(ctx, declaration);

  if(name === undefined || name.startsWith("__")){
    return false;
  }

  return isExcluded(position.file, name, excludePaths);

}


export function isSymbolExcluded(ctx: InterpreterContext, symbol: Symbol, name?: string): boolean {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  if(!declaration){
    return false;
  }

  return isDeclarationExcluded(ctx, declaration, name);

}
