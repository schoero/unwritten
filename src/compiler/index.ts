import { EOL } from "node:os";
import { dirname, resolve } from "node:path";

import ts from "typescript";

import { log, warn } from "../log/index.js";
import { findFile } from "../utils/finder.js";


export function compile(entryFilePath: string, tsConfigFilePath?: string) {

  const absoluteEntryFilePath = resolve(entryFilePath);
  const absoluteTSConfigFilePath = tsConfigFilePath !== undefined ? resolve(tsConfigFilePath) : undefined;


  //-- Compile

  const compilerOptions = getCompilerOptions(absoluteEntryFilePath, absoluteTSConfigFilePath);
  const compilerHost = getCompilerHost(compilerOptions);

  log(`Invoking the TypeScript compiler to compile ${absoluteEntryFilePath}...`);

  const program = ts.createProgram([absoluteEntryFilePath], compilerOptions, compilerHost);
  const checker = program.getTypeChecker();


  //-- Report any compiler messages

  reportCompilerDiagnostics(program.getSemanticDiagnostics());

  return { checker, program };

}


function getCompilerHost(compilerOptions: ts.CompilerOptions) {
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(entryFilePath: string, tsConfigFilePath?: string): ts.CompilerOptions {


  //-- Get compiler options from provided tsconfig.json

  {
    if(tsConfigFilePath !== undefined){
      const compilerOptions = _readConfigFile(tsConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find tsconfig via ts.findConfigFile

  {
    const foundTSConfigFilePath = ts.findConfigFile(entryFilePath, ts.sys.fileExists);
    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = _readConfigFile(foundTSConfigFilePath);
      if(compilerOptions !== undefined){
        return compilerOptions;
      }
    }
  }


  //-- Try to find tsconfig via custom finder

  {
    const foundTSConfigFilePath = findFile("tsconfig.json", entryFilePath);
    if(foundTSConfigFilePath !== undefined){
      const compilerOptions = _readConfigFile(foundTSConfigFilePath);
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
        const compilerOptions = _readConfigFile(foundTSConfigFilePath);
        if(compilerOptions !== undefined){
          return compilerOptions;
        }
      }
    }
  }


  //-- Return default compiler options

  warn("No tsconfig found, continue using default compiler options but this may fail...");

  return _getDefaultCompilerOptions();

}


function _readConfigFile(path: string): ts.CompilerOptions | undefined {

  const configFileBasePath = dirname(path);
  const configFile = ts.readConfigFile(path, ts.sys.readFile);

  if(configFile.error !== undefined){
    if(typeof configFile.error.messageText === "string"){
      warn(`Could not read tsconfig.json: ${configFile.error.messageText}`);
    } else {
      warn(`Could not read tsconfig.json: ${configFile.error.messageText.messageText}`);
    }
    return;
  }

  log(`Use tsconfig.json found at ${path}`);

  const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
  return options;

}

function _getDefaultCompilerOptions(): ts.CompilerOptions {
  return {
    ...ts.getDefaultCompilerOptions(),
    allowJs: true
  };
}

export function reportCompilerDiagnostics(diagnostics: readonly ts.Diagnostic[]) {

  if(diagnostics.length > 0){
    for(const diagnostic of diagnostics){
      const message: string = ts.flattenDiagnosticMessageText(diagnostic.messageText, EOL);
      if(diagnostic.file){
        const location: ts.LineAndCharacter = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        const formattedMessage: string =
          `${diagnostic.file.fileName}(${location.line + 1},${location.character + 1}):` +
          ` [TypeScript] ${message}`;

        warn(formattedMessage);
      } else {
        warn(message);
      }
    }
  }

}
