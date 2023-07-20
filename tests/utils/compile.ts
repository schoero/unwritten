import ts, { ModuleResolutionKind } from "typescript";

import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler:shared.js";
import { getDefaultConfig } from "unwritten:config/config.js";
import { createContext } from "unwritten:interpreter/utils/context.js";
import { readFileSync as readFileSyncOriginal } from "unwritten:platform/file-system/node.js";
import { logger } from "unwritten:platform/logger/node.js";
import os from "unwritten:platform/os/node.js";
import path from "unwritten:platform/path/node.js";
import process from "unwritten:platform/process/node.js";
import { createContext as createDefaultContext } from "unwritten:utils/context.js";
import { override } from "unwritten:utils/override.js";
import * as fs from "unwritten:utils/virtual-fs.js";
import { assert } from "unwritten:utils:general.js";

import type { Config } from "unwritten:type-definitions/config.js";


type CompilerInput = {
  [filePath: string]: string;
};

export function compile(code: CompilerInput | string, compilerOptions?: ts.CompilerOptions, config?: Config) {

  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  const { fs: { existsSync, readFileSync, writeFileSync } } = defaultContext.dependencies;

  const entryFilePath = "/index.ts";
  const inputFiles = typeof code === "string" ? { [entryFilePath]: code } : code;

  if(typeof code === "string"){
    writeFileSync(entryFilePath, code);
  } else {
    Object.entries(code).forEach(([filePath, code]) => {
      writeFileSync(filePath, code);
    });
  }

  const sourceFiles = Object.entries(inputFiles).reduce<{ [fileName: string]: ts.SourceFile; }>((acc, [fileName, code]) => {
    acc[fileName] = ts.createSourceFile(fileName, code.trim(), ts.ScriptTarget.Latest);
    return acc;
  }, {});

  const compilerHost: ts.CompilerHost = {
    directoryExists: dirPath => dirPath === "/",
    fileExists: existsSync,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "node_modules/typescript/lib/lib.esnext.d.ts",
    getDirectories: () => [],
    getNewLine: () => "\n",
    getSourceFile: filePath =>
      filePath in sourceFiles
        ? sourceFiles[filePath]
        : ts.createSourceFile(
          filePath,
          existsSync(filePath)
            ? readFileSync(filePath)
            : readFileSyncOriginal(filePath),
          ts.ScriptTarget.Latest
        ),
    readFile: filePath => {
      return existsSync(filePath)
        ? readFileSync(filePath)
        : readFileSyncOriginal(filePath);
    },
    useCaseSensitiveFileNames: () => true,
    writeFile: writeFileSync
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions ?? {
      ...getDefaultCompilerOptions(defaultContext),
      moduleResolution: ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ESNext
    },
    rootNames: Object.keys(sourceFiles)
  });


  // Report any compiler messages
  void reportCompilerDiagnostics(defaultContext, program.getSemanticDiagnostics());

  // Type checker
  const checker = program.getTypeChecker();

  // Source files
  const compiledSourceFiles = program.getSourceFiles();
  const fileSymbols = compiledSourceFiles.map(
    file => checker.getSymbolAtLocation(file)
  ).filter(sourceFileSymbol => !!sourceFileSymbol) as ts.Symbol[];

  // File
  const file = compiledSourceFiles.find(file => file.fileName === entryFilePath);
  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);
  assert(fileSymbol, "Entry file not found.");

  // Create context
  const ctx = createContext(defaultContext, checker, override(getDefaultConfig(), config));

  // Get exported Symbols
  const exportedSymbols = ctx.checker.getExportsOfModule(fileSymbol);

  return {
    ctx,
    exportedSymbols,
    fileSymbol,
    fileSymbols
  };

}
