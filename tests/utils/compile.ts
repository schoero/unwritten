import { readFileSync } from "node:fs";

import ts from "typescript";
import { assert } from "vitest";

import { ExportedSymbols } from "../../src/compiler/exported-symbols/index.js";
import { reportCompilerDiagnostics } from "../../src/compiler/index.js";
import { createConfig } from "../../src/config/index.js";
import { disableLog } from "../../src/log/index.js";
import { Config } from "../../src/types/config.js";
import { CompilerContext } from "../../src/types/context.js";


export function compile(content: string, compilerOptions?: ts.CompilerOptions, config?: Config) {

  const dummyFilePath = "/file.ts";
  const sourceFile = ts.createSourceFile(dummyFilePath, content, ts.ScriptTarget.Latest);

  const compilerHost: ts.CompilerHost = {
    directoryExists: dirPath => dirPath === "/",
    fileExists: filePath => filePath === dummyFilePath,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "node_modules/typescript/lib/lib.esnext.d.ts",
    getDirectories: () => [],
    getNewLine: () => "\n",
    getSourceFile: filePath => filePath === dummyFilePath ? sourceFile : ts.createSourceFile(filePath, readFileSync(filePath, { encoding: "utf-8" }), ts.ScriptTarget.Latest),
    readFile: filePath => filePath === dummyFilePath ? content : undefined,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => { }
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions ?? { target: ts.ScriptTarget.ES2016 },
    rootNames: [dummyFilePath]
  });


  //-- Report any compiler messages

  reportCompilerDiagnostics(program.getSemanticDiagnostics());

  const checker = program.getTypeChecker();


  //-- Disable log

  disableLog();


  //-- Get file

  const file = program.getSourceFiles().find(file => file.fileName === dummyFilePath);
  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);
  assert(fileSymbol, "Entry file not found.");


  //-- Create context

  const ctx: CompilerContext = {
    checker,
    config: createConfig(config)
  };

  ctx.exportedSymbols = new ExportedSymbols(ctx, fileSymbol);


  //-- Get exported Symbols

  const exportedSymbols = checker.getExportsOfModule(fileSymbol);

  return { ctx, exportedSymbols, fileSymbol };

}
