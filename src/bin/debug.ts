import { readFileSync, writeFileSync } from "node:fs";

import { parse } from "quickdoks:compiler:entry-points/index.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { sortKeys } from "quickdoks:utils:general.js";


export function debug(inputPath: string) {

  const code = _catchErrors("Reading input file", () => readFileSync(inputPath, { encoding: "utf-8" }));
  const { fileSymbol, ctx } = _catchErrors("Compiling input file", () => compile(code));
  const parserOutput = _catchErrors("Parsing file symbol", () => parse(ctx, fileSymbol));

  _writeOutput("parser-output.json", JSON.stringify(parserOutput, sortKeys, 2));

}


function _writeError(name: string, err: Error) {
  _writeOutput("error.json", JSON.stringify({ error: { message: err.message, stack: err.stack }, stage: name }, null, 2));
}

function _writeOutput(name: string, output: string) {
  writeFileSync(`${process.cwd()}/${name}`, `${output}\n`);
}


function _catchErrors<F extends(...args: any) => any>(name: string, callback: F): ReturnType<F> {
  try {
    return callback();
  } catch (err){
    if(err instanceof Error){
      _writeError(name, err);
    }
    throw err;
  }
}
