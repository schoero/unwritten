import { readFileSync } from "node:fs";

import ts, { ModuleResolutionKind } from "typescript";

import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler:shared.js";
import { getDefaultConfig } from "unwritten:config/index.js";
import { getExportedSymbols } from "unwritten:interpreter/utils/ts.js";
import { override } from "unwritten:utils/override.js";
import { assert } from "unwritten:utils:general.js";

import type { Config } from "unwritten:type-definitions/config.d.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


type CompilerInput = {
  [filePath: string]: string;
};

export function compile(code: CompilerInput | string, compilerOptions?: ts.CompilerOptions, config?: Config) {

  const entryFilePath = "/index.ts";
  const inputFiles = typeof code === "string" ? { [entryFilePath]: code } : code;
  const sourceFiles = Object.entries(inputFiles).reduce<{ [fileName: string]: ts.SourceFile; }>((acc, [fileName, code]) => {
    acc[fileName] = ts.createSourceFile(fileName, code.trim(), ts.ScriptTarget.Latest);
    return acc;
  }, {});

  const compilerHost: ts.CompilerHost = {
    directoryExists: dirPath => dirPath === "/",
    fileExists: filePath => Object.keys(sourceFiles).includes(filePath),
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "node_modules/typescript/lib/lib.esnext.d.ts",
    getDirectories: () => [],
    getNewLine: () => "\n",
    getSourceFile: filePath =>
      filePath in sourceFiles
        ? sourceFiles[filePath]
        : ts.createSourceFile(filePath, readFileSync(filePath, { encoding: "utf-8" }), ts.ScriptTarget.Latest),
    readFile: filePath =>
      filePath in sourceFiles
        ? sourceFiles[filePath].text
        : readFileSync(filePath, { encoding: "utf-8" }),
    useCaseSensitiveFileNames: () => true,
    writeFile: () => {}
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions ?? {
      ...getDefaultCompilerOptions(),
      moduleResolution: ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ESNext
    },
    rootNames: Object.keys(sourceFiles)
  });


  //-- Report any compiler messages

  void reportCompilerDiagnostics({}, program.getSemanticDiagnostics());

  const checker = program.getTypeChecker();


  //-- Get file

  const file = program.getSourceFiles().find(file => file.fileName === entryFilePath);
  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);
  assert(fileSymbol, "Entry file not found.");


  //-- Create context

  const ctx: InterpreterContext = {
    checker,
    config: override(getDefaultConfig(), config)
  };


  //-- Get exported Symbols

  const exportedSymbols = getExportedSymbols(ctx, fileSymbol);

  return { ctx, exportedSymbols, fileSymbol };

}
