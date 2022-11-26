import { Program, Symbol } from "typescript";
import { assert } from "vitest";

import { createSourceFileBySymbol } from "../compiler/entities/source-file.js";
import { CompilerContext } from "../types/context.js";
import { ExportableTypes } from "../types/types.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;
}


export function getEntryFileSymbolFromProgram(ctx: CompilerContext, program: Program) {

  const rootFileName = program.getRootFileNames()[0];

  assert(rootFileName, "Root file not found.");

  const entryFile = program.getSourceFile(rootFileName);

  assert(entryFile, `Entry file not found. ${rootFileName}`);

  const entryFileSymbol = ctx.checker.getSymbolAtLocation(entryFile);

  assert(entryFileSymbol, "Entry file symbol not found.");

  return entryFileSymbol;

}
