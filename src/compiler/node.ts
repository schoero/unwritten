import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler/shared";
import { findFile } from "unwritten:utils:finder";

import type { CompilerOptions } from "typescript";

import type { DefaultNodeContext } from "unwritten:type-definitions/context";


export function compile(ctx: DefaultNodeContext, entryFilePaths: string[], tsConfigOrFilePath?: CompilerOptions | string) {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { absolute } = ctx.dependencies.path;

  const absoluteEntryFilePaths = entryFilePaths.map(entryFilePath => absolute(entryFilePath));

  const tsConfigOrResolvedFilePath = typeof tsConfigOrFilePath === "string"
    ? absolute(tsConfigOrFilePath)
    : tsConfigOrFilePath;

  // Compile
  const compilerOptions = getCompilerOptions(ctx, absoluteEntryFilePaths, tsConfigOrResolvedFilePath);
  const compilerHost = getCompilerHost(ctx, compilerOptions);

  logger?.stats(ctx, { entryPoints: absoluteEntryFilePaths });

  const program = ts.createProgram(absoluteEntryFilePaths, compilerOptions, compilerHost);
  const checker = program.getTypeChecker();

  // Report any compiler messages
  void reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}


function getCompilerHost(ctx: DefaultNodeContext, compilerOptions: CompilerOptions) {
  const ts = ctx.dependencies.ts;
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(ctx: DefaultNodeContext, entryFilePaths: string[], tsConfigOrFilePath?: CompilerOptions | string): CompilerOptions {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { existsSync } = ctx.dependencies.fs;

  let compilerOptions: CompilerOptions | undefined;
  let tsconfigPath: string | undefined;

  // Use provided compiler options
  if(typeof tsConfigOrFilePath === "object"){
    logger?.stats(ctx, { tsconfig: "provided config" });
    const { errors, options } = ts.convertCompilerOptionsFromJson(tsConfigOrFilePath, ".");
    void reportCompilerDiagnostics(ctx, errors);
    compilerOptions = options;
  }

  // Get compiler options from provided tsconfig.json
  if(typeof tsConfigOrFilePath === "string"){
    const compilerOptionsFromFile = readConfigFile(ctx, tsConfigOrFilePath);
    if(compilerOptionsFromFile !== undefined){
      compilerOptions = compilerOptionsFromFile;
      tsconfigPath = tsConfigOrFilePath;
    }
  }

  // Try to find tsconfig via ts.findConfigFile
  if(compilerOptions === undefined){
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => ts.findConfigFile(entryFilePath, existsSync)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptionsFromFile = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptionsFromFile !== undefined){
        compilerOptions = compilerOptionsFromFile;
        tsconfigPath = foundTSConfigFilePath;
      }
    }
  }

  // Try to find tsconfig via custom finder
  if(compilerOptions === undefined){
    const foundTSConfigFilePath = entryFilePaths.map(
      entryFilePath => findFile(ctx, "tsconfig.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundTSConfigFilePath !== undefined){
      const compilerOptionsFromFile = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptionsFromFile !== undefined){
        compilerOptions = compilerOptionsFromFile;
        tsconfigPath = foundTSConfigFilePath;
      }
    }
  }

  // Try to find project root by searching package.json via custom finder
  if(compilerOptions === undefined){
    const foundPackageJsonFilePath = entryFilePaths.map(
      entryFilePath => findFile(ctx, "package.json", entryFilePath)
    ).filter(tsconfig => !!tsconfig)[0];

    if(foundPackageJsonFilePath !== undefined){
      const foundTSConfigFilePath = ts.findConfigFile(foundPackageJsonFilePath, existsSync);
      if(foundTSConfigFilePath !== undefined){
        const compilerOptionsFromFile = readConfigFile(ctx, foundTSConfigFilePath);
        if(compilerOptionsFromFile !== undefined){
          compilerOptions = compilerOptionsFromFile;
          tsconfigPath = foundTSConfigFilePath;
        }
      }
    }
  }

  if(compilerOptions !== undefined || tsconfigPath !== undefined){
    logger?.stats(ctx, { tsconfig: tsconfigPath });
    return {
      ...compilerOptions,
      noEmit: true
    };
  }

  // Return default compiler options
  logger?.stats(ctx, { tsconfig: "default compiler options" });
  return getDefaultCompilerOptions(ctx);

}

function readConfigFile(ctx: DefaultNodeContext, path: string): CompilerOptions | undefined {

  const ts = ctx.dependencies.ts;
  const logger = ctx.dependencies.logger;
  const { getDirectory } = ctx.dependencies.path;
  const { readFileSync } = ctx.dependencies.fs;

  const configFileBasePath = getDirectory(path);
  const configFile = ts.readConfigFile(path, readFileSync);

  if(configFile.error !== undefined){
    if(typeof configFile.error.messageText === "string"){
      logger?.warn("could not read tsconfig.json:", [configFile.error.messageText]);
    } else {
      logger?.warn("could not read tsconfig.json:", [configFile.error.messageText.messageText]);
    }
    return;
  }

  const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
  return options;

}
