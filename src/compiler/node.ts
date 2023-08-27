import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler/shared.js";
import { findFile } from "unwritten:utils:finder.js";

import type { CompilerOptions } from "typescript";

import type { DefaultContext } from "unwritten:type-definitions/context.js";


export function compile(ctx: DefaultContext, entryFilePaths: string[], tsConfigOrFilePath?: CompilerOptions | string) {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { absolute } = ctx.dependencies.path;

  const absoluteEntryFilePaths = entryFilePaths.map(entryFilePath => absolute(entryFilePath));

  const tsConfigOrResolvedFilePath = typeof tsConfigOrFilePath === "string"
    ? absolute(tsConfigOrFilePath)
    : tsConfigOrFilePath;


  //-- Compile

  const compilerOptions = getCompilerOptions(ctx, absoluteEntryFilePaths, tsConfigOrResolvedFilePath);
  const compilerHost = getCompilerHost(ctx, compilerOptions);

  if(logger){
    const formattedFileNames = absoluteEntryFilePaths.map(
      entryFilePath => `${logger.filePath(entryFilePath)}`
    );
    logger.info("Invoking the TypeScript compiler to compile", formattedFileNames);
  }

  const program = ts.createProgram(absoluteEntryFilePaths, compilerOptions, compilerHost);
  const checker = program.getTypeChecker();


  //-- Report any compiler messages

  void reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}


function getCompilerHost(ctx: DefaultContext, compilerOptions: CompilerOptions) {
  const ts = ctx.dependencies.ts;
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(ctx: DefaultContext, entryFilePaths: string[], tsConfigOrFilePath?: CompilerOptions | string): CompilerOptions {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { existsSync } = ctx.dependencies.fs;

  // Use provided compiler options
  if(typeof tsConfigOrFilePath === "object"){
    logger?.info("Using provided compiler options");
    const { errors, options } = ts.convertCompilerOptionsFromJson(tsConfigOrFilePath, ".");
    void reportCompilerDiagnostics(ctx, errors);
    return options;
  }

  // Get compiler options from provided tsconfig.json
  if(typeof tsConfigOrFilePath === "string"){
    const compilerOptions = readConfigFile(ctx, tsConfigOrFilePath);
    if(compilerOptions !== undefined){
      return compilerOptions;
    }
  }

  // Try to find tsconfig via ts.findConfigFile
  {
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => ts.findConfigFile(entryFilePath, existsSync)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }

  // Try to find tsconfig via custom finder
  {
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => findFile(ctx, "tsconfig.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }

  // Try to find project root by searching package.json via custom finder
  {
    const foundPackageJsonFilePath = entryFilePaths.map(
      entryFilePath => findFile(ctx, "package.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundPackageJsonFilePath !== undefined){
      const foundTSConfigFilePath = ts.findConfigFile(foundPackageJsonFilePath, existsSync);
      if(foundTSConfigFilePath !== undefined){
        const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
        if(compilerOptions !== undefined){
          return compilerOptions;
        }
      }
    }
  }

  // Return default compiler options
  logger?.warn("No tsconfig found, continue using default compiler options but this may fail...");

  return getDefaultCompilerOptions(ctx);

}


function readConfigFile(ctx: DefaultContext, path: string): CompilerOptions | undefined {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { getDirectory } = ctx.dependencies.path;
  const { readFileSync } = ctx.dependencies.fs;

  const configFileBasePath = getDirectory(path);
  const configFile = ts.readConfigFile(path, readFileSync);

  if(configFile.error !== undefined){
    if(typeof configFile.error.messageText === "string"){
      logger?.warn(`Could not read tsconfig.json: ${configFile.error.messageText}`);
    } else {
      logger?.warn(`Could not read tsconfig.json: ${configFile.error.messageText.messageText}`);
    }
    return;
  }

  logger?.info(`Using tsconfig.json at ${logger.filePath(path)}`);

  const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
  return options;

}
