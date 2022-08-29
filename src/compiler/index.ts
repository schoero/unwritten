import { EOL } from "node:os";
import { dirname, resolve } from "node:path";

import ts, { CompilerOptions } from "typescript";

import { error, log, warn } from "../log/index.js";
import { createContext } from "./context/index.js";


export function compile(entryFilePath: string, tsConfigFilePath?: string) {

  const absoluteEntryFilePath = resolve(entryFilePath);
  const absoluteTSConfigFilePath = tsConfigFilePath !== undefined ? resolve(tsConfigFilePath) : undefined;


  //-- Compile

  const compilerOptions = getCompilerOptions(absoluteEntryFilePath, absoluteTSConfigFilePath);
  const compilerHost = getCompilerHost(compilerOptions);

  log(`Invoking the TypeScript compiler to compile ${absoluteEntryFilePath}...`);

  const program = ts.createProgram([absoluteEntryFilePath], compilerOptions, compilerHost);
  const checker = program.getTypeChecker();


  //-- Set compiler context

  createContext(program, checker);


  //-- Report any compiler messages

  reportCompilerDiagnostics(program.getSemanticDiagnostics());

  return program;

}


function getCompilerHost(compilerOptions: CompilerOptions) {
  return ts.createCompilerHost(compilerOptions, true);
}


function getCompilerOptions(entryFilePath: string, tsConfigFilePath?: string): CompilerOptions {


  //-- Get compiler options from provided tsconfig.json

  if(tsConfigFilePath !== undefined){

    const configFileBasePath = dirname(tsConfigFilePath);
    const configFile = ts.readConfigFile(tsConfigFilePath, ts.sys.readFile);

    if(configFile.error !== undefined){
      throw error(`Error reading tsconfig.json: ${configFile.error.messageText}.`);
    } else {
      log(`Using tsconfig.json at ${tsConfigFilePath}`);
    }

    const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
    return options;

  }


  //-- Try to find tsconfig

  const foundTSConfigFilePath = ts.findConfigFile(entryFilePath, ts.sys.fileExists);

  if(foundTSConfigFilePath !== undefined){

    const configFileBasePath = dirname(foundTSConfigFilePath);
    const configFile = ts.readConfigFile(foundTSConfigFilePath, ts.sys.readFile);

    if(configFile.error !== undefined){
      throw error(`Error reading tsconfig.json: ${configFile.error.messageText}`);
    } else {
      log(`Using tsconfig.json found at ${foundTSConfigFilePath}`);
    }

    const options = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configFileBasePath).options;
    return options;

  }


  //-- Return default compiler options

  warn("No tsconfig found, continue using default compiler options but this may fail...");

  return ts.getDefaultCompilerOptions();

}


export function reportCompilerDiagnostics(diagnostics: ReadonlyArray<ts.Diagnostic>) {

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