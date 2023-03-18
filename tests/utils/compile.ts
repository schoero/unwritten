import { readFileSync } from "node:fs";

import ts from "typescript";

import { reportCompilerDiagnostics } from "unwritten:interpreter/index.js";
import { getDefaultConfig } from "unwritten:config/index.js";
import { override } from "unwritten:utils/override.js";
import { assert } from "unwritten:utils:general.js";

import type { Config } from "unwritten:type-definitions/config.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function compile(code: string, compilerOptions?: ts.CompilerOptions, config?: Config) {

  const dummyFilePath = "/file.ts";
  const sourceFile = ts.createSourceFile(dummyFilePath, code.trim(), ts.ScriptTarget.Latest);

  const compilerHost: ts.CompilerHost = {
    directoryExists: dirPath => dirPath === "/",
    fileExists: filePath => filePath === dummyFilePath,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "node_modules/typescript/lib/lib.esnext.d.ts",
    getDirectories: () => [],
    getNewLine: () => "\n",
    getSourceFile: filePath =>
      filePath === dummyFilePath
        ? sourceFile
        : ts.createSourceFile(filePath, readFileSync(filePath, { encoding: "utf-8" }), ts.ScriptTarget.Latest),
    readFile: filePath => filePath === dummyFilePath ? code : undefined,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => {}
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions ?? { target: ts.ScriptTarget.ES2016 },
    rootNames: [dummyFilePath]
  });


  //-- Report any compiler messages

  reportCompilerDiagnostics({}, program.getSemanticDiagnostics());

  const checker = program.getTypeChecker();


  //-- Get file

  const file = program.getSourceFiles().find(file => file.fileName === dummyFilePath);
  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);
  assert(fileSymbol, "Entry file not found.");


  //-- Create context

  const ctx: CompilerContext = {
    checker,
    config: override(config ?? {}, getDefaultConfig())
  };


  //-- Get exported Symbols

  const exportedSymbols = checker.getExportsOfModule(fileSymbol);

  return { ctx, exportedSymbols, fileSymbol };

}
