import { EOL } from "node:os";
import { dirname, resolve } from "node:path";

import ts from "typescript";

import { findFile } from "quickdoks:utils:finder.js";

import type { DefaultContext } from "quickdoks:type-definitions/context.d.js";


export function compile(ctx: DefaultContext, entryFilePath: string, tsConfigFilePath?: string) {

  const absoluteEntryFilePath = resolve(entryFilePath);
  const absoluteTSConfigFilePath = tsConfigFilePath !== undefined ? resolve(tsConfigFilePath) : undefined;


  //-- Compile

  const compilerOptions = getCompilerOptions(ctx, absoluteEntryFilePath, absoluteTSConfigFilePath);
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


function getCompilerOptions(ctx: DefaultContext, entryFilePath: string, tsConfigFilePath?: string): ts.CompilerOptions {


  //-- Get compiler options from provided tsconfig.json

  {
    if(tsConfigFilePath !== undefined){
      const compilerOptions = readConfigFile(ctx, tsConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
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

function getDefaultCompilerOptions(): ts.CompilerOptions {
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true
  };
}

export function reportCompilerDiagnostics(ctx: DefaultContext, diagnostics: readonly ts.Diagnostic[]) {

  if(diagnostics.length > 0){
    for(const diagnostic of diagnostics){
      const message: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, EOL);
      if(diagnostic.file){
        const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const formattedMessage: string =
          `${diagnostic.file.fileName}(${location.line + 1},${location.character + 1}):` +
          ` [TypeScript] ${message}`;

        ctx.logger?.warn(formattedMessage);
      } else {
        ctx.logger?.warn(message);
      }
    }
  }

}
