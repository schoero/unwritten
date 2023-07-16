import { dirname, resolve } from "node:path";

import ts from "typescript";

import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler/shared.js";
import { findFile } from "unwritten:utils:finder.js";

import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function compile(ctx: DefaultContext, entryFilePaths: string[], tsConfigOrFilePath?: ts.CompilerOptions | string) {

  const resolvedEntryFilePaths = entryFilePaths.map(entryFilePath => resolve(entryFilePath));

  const tsConfigOrResolvedFilePath = typeof tsConfigOrFilePath === "string"
    ? resolve(tsConfigOrFilePath)
    : tsConfigOrFilePath;


  //-- Compile

  const compilerOptions = getCompilerOptions(ctx, resolvedEntryFilePaths, tsConfigOrResolvedFilePath);
  const compilerHost = getCompilerHost(compilerOptions);

  if(ctx.logger){
    const formattedFileNames = resolvedEntryFilePaths.map(
      entryFilePath => `${ctx.logger?.filePath(entryFilePath)}`
    );
    ctx.logger.info("Invoking the TypeScript compiler to compile", formattedFileNames);
  }

  const program = ts.createProgram(resolvedEntryFilePaths, compilerOptions, compilerHost);
  const checker = program.getTypeChecker();


  //-- Report any compiler messages

  void reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}


function getCompilerHost(compilerOptions: ts.CompilerOptions) {
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(ctx: DefaultContext, entryFilePaths: string[], tsConfigOrFilePath?: ts.CompilerOptions | string): ts.CompilerOptions {


  //-- Use provided compiler options

  if(typeof tsConfigOrFilePath === "object"){
    ctx.logger?.info("Using provided compiler options");
    const { errors, options } = ts.convertCompilerOptionsFromJson(tsConfigOrFilePath, ".");
    void reportCompilerDiagnostics(ctx, errors);
    return options;
  }


  //-- Get compiler options from provided tsconfig.json

  if(typeof tsConfigOrFilePath === "string"){
    const compilerOptions = readConfigFile(ctx, tsConfigOrFilePath);
    if(compilerOptions !== undefined){
      return compilerOptions;
    }
  }


  //-- Try to find tsconfig via ts.findConfigFile

  {
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => ts.findConfigFile(entryFilePath, ts.sys.fileExists)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find tsconfig via custom finder

  {
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => findFile("tsconfig.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find project root by searching package.json via custom finder

  {
    const foundPackageJsonFilePath = entryFilePaths.map(
      entryFilePath => findFile("package.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundPackageJsonFilePath !== undefined){
      const foundTSConfigFilePath = ts.findConfigFile(foundPackageJsonFilePath, ts.sys.fileExists);
      if(foundTSConfigFilePath !== undefined){
        const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
        if(compilerOptions !== undefined){
          return compilerOptions;
        }
      }
    }
  }


  //-- Return default compiler options

  ctx.logger?.warn("No tsconfig found, continue using default compiler options but this may fail...");

  return getDefaultCompilerOptions();

}


function readConfigFile(ctx: DefaultContext, path: string): ts.CompilerOptions | undefined {

  const configFileBasePath = dirname(path);
  const configFile = ts.readConfigFile(path, ts.sys.readFile);

  if(configFile.error !== undefined){
    if(typeof configFile.error.messageText === "string"){
      ctx.logger?.warn(`Could not read tsconfig.json: ${configFile.error.messageText}`);
    } else {
      ctx.logger?.warn(`Could not read tsconfig.json: ${configFile.error.messageText.messageText}`);
    }
    return;
  }

  ctx.logger?.info(`Using tsconfig.json at ${ctx.logger.filePath(path)}`);

  const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
  return options;

}
