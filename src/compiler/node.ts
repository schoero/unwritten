import { EOL } from "node:os";
import { dirname, resolve } from "node:path";

import ts from "typescript";

import { getDefaultCompilerOptions, reportCompilerDiagnostics } from "unwritten:compiler/shared.js";
import { findFile } from "unwritten:utils:finder.js";

import type { DefaultContext } from "unwritten:type-definitions/context.d.js";


export function compile(ctx: DefaultContext, entryFilePath: string, tsConfigOrFilePath?: ts.CompilerOptions | string) {

  const absoluteEntryFilePath = resolve(entryFilePath);
  const tsConfigOrAbsoluteFilePath = typeof tsConfigOrFilePath === "string" ? resolve(tsConfigOrFilePath) : tsConfigOrFilePath;


  //-- Compile

  const compilerOptions = getCompilerOptions(ctx, absoluteEntryFilePath, tsConfigOrAbsoluteFilePath);
  const compilerHost = getCompilerHost(compilerOptions);

  ctx.logger?.info(`Invoking the TypeScript compiler to compile ${absoluteEntryFilePath}...`);

  const program = ts.createProgram([absoluteEntryFilePath], compilerOptions, compilerHost);
  const checker = program.getTypeChecker();


  //-- Report any compiler messages

  reportCompilerDiagnostics(ctx, program.getSemanticDiagnostics());

  return { checker, program };

}


function getCompilerHost(compilerOptions: ts.CompilerOptions) {
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(ctx: DefaultContext, entryFilePath: string, tsConfigOrFilePath?: ts.CompilerOptions | string): ts.CompilerOptions {


  //-- Use provided compiler options

  if(typeof tsConfigOrFilePath === "object"){
    ctx.logger?.info("Use provided compiler options");
    const { options, errors } = ts.convertCompilerOptionsFromJson(tsConfigOrFilePath, ".");
    reportCompilerDiagnostics(ctx, errors, EOL);
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
    const foundTSConfigFilePath = ts.findConfigFile(entryFilePath, ts.sys.fileExists);
    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find tsconfig via custom finder

  {
    const foundTSConfigFilePath = findFile("tsconfig.json", entryFilePath);
    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find project root by searching package.json via custom finder

  {
    const foundPackageJsonFilePath = findFile("package.json", entryFilePath);
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

  ctx.logger?.info(`Use tsconfig.json found at ${path}`);

  const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
  return options;

}
