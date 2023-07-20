import { reportCompilerDiagnostics } from "unwritten:compiler/shared.js";

import type { CompilerHost, CompilerOptions } from "typescript";

import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function compile(ctx: DefaultContext, code: string, tsconfig?: CompilerOptions) {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { EOL } = ctx.dependencies.os;

  logger?.info("Invoking the TypeScript compiler to compile the provided code...");

  const compilerOptions = getCompilerOptions(ctx, tsconfig);
  const dummyFilePath = "/index.ts";
  const sourceFile = ts.createSourceFile(dummyFilePath, code.trim(), ts.ScriptTarget.Latest);

  const compilerHost: CompilerHost = {
    directoryExists: dirPath => dirPath === "/",
    fileExists: filePath => filePath === dummyFilePath,
    getCanonicalFileName: fileName => fileName,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "node_modules/typescript/lib/lib.esnext.d.ts",
    getDirectories: () => [],
    getNewLine: () => EOL,
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

  void reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}

function getCompilerOptions(ctx: DefaultContext, tsconfig?: CompilerOptions): CompilerOptions {

  const { ts } = ctx.dependencies;
  const { errors, options } = ts.convertCompilerOptionsFromJson(tsconfig, ".");

  void reportCompilerDiagnostics(ctx, errors);

  return options;// ?? getDefaultCompilerOptions();

}
