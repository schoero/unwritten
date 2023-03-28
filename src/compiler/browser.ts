import ts from "typescript";

import { reportCompilerDiagnostics } from "unwritten:compiler/shared.js";

import type { DefaultContext } from "unwritten:type-definitions/context.d.js";


export function compile(ctx: DefaultContext, code: string, tsconfig?: ts.CompilerOptions) {

  ctx.logger?.info("Invoking the TypeScript compiler to compile the provided code...");

  const compilerOptions = getCompilerOptions(ctx, tsconfig);
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
        : undefined,
    readFile: filePath => filePath === dummyFilePath ? code : undefined,
    useCaseSensitiveFileNames: () => true,
    writeFile: () => {}
  };

  const program = ts.createProgram({
    host: compilerHost,
    options: compilerOptions,
    rootNames: [dummyFilePath]
  });

  const checker = program.getTypeChecker();


  //-- Report any compiler messages

  reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}

function getCompilerOptions(ctx: DefaultContext, tsconfig?: ts.CompilerOptions): ts.CompilerOptions {

  const { options, errors } = ts.convertCompilerOptionsFromJson(tsconfig, ".");

  reportCompilerDiagnostics(ctx, errors);

  return options;// ?? getDefaultCompilerOptions();

}
