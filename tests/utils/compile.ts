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
    fileExists: filePath => filePath === dummyFilePath,
    directoryExists: dirPath => dirPath === "/",
    getCurrentDirectory: () => "/",
    getDirectories: () => [],
    getCanonicalFileName: fileName => fileName,
    getNewLine: () => "\n",
    getDefaultLibFileName: () => "",
    getSourceFile: filePath => filePath === dummyFilePath ? sourceFile : undefined,
    readFile: filePath => filePath === dummyFilePath ? content : undefined,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => {}
  };

  const program = ts.createProgram({
    options: compilerOptions ?? { target: ts.ScriptTarget.ES2016 },
    rootNames: [dummyFilePath],
    host: compilerHost
  });


  //-- Report any compiler messages

  reportCompilerDiagnostics(program.getSemanticDiagnostics());

  const checker = program.getTypeChecker();

  createContext(program, checker);

  const file = program.getSourceFiles()[0];

  assert(file, "file is not defined");

  const fileSymbol = checker.getSymbolAtLocation(file);

  assert(fileSymbol, "Entry file not found.");

  const exportedSymbols = checker.getExportsOfModule(fileSymbol);


  //-- Set render extension

  setRenderExtension(testRenderExtension);

  return { program, checker, fileSymbol, exportedSymbols };

}
