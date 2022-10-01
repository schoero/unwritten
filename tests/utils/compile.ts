import { readFileSync } from "fs";
import ts from "typescript";
import { assert } from "vitest";

import { createContext } from "../../src/compiler/context/index.js";
import { reportCompilerDiagnostics } from "../../src/compiler/index.js";
import { setRenderExtension } from "../../src/renderer/extensions/index.js";
import { testRenderExtension } from "../../src/renderer/extensions/test.js";


export function compile(content: string, compilerOptions?: ts.CompilerOptions) {

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
    writeFile: () => {}
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions ?? { target: ts.ScriptTarget.ES2016 },
    rootNames: [dummyFilePath]
  });


  //-- Report any compiler messages

  reportCompilerDiagnostics(program.getSemanticDiagnostics());

  const checker = program.getTypeChecker();

  createContext(program, checker);

  const file = program.getSourceFiles().find(file => file.fileName === dummyFilePath);

  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);

  assert(fileSymbol, "Entry file not found.");

  const exportedSymbols = checker.getExportsOfModule(fileSymbol);


  //-- Set render extension

  setRenderExtension(testRenderExtension);

  return { checker, exportedSymbols, fileSymbol, program };

}
