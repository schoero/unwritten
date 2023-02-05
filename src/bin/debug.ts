import { readFileSync, writeFileSync } from "node:fs";

import { parse } from "unwritten:compiler/ast/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { sortKeys } from "unwritten:utils:general.js";


export function debug(inputPath: string) {

  const code = catchErrors("Reading input file", () => readFileSync(inputPath, { encoding: "utf-8" }));
  const { fileSymbol, ctx } = catchErrors("Compiling input file", () => compile(code));
  const parserOutput = catchErrors("Parsing file symbol", () => parse(ctx, fileSymbol));

  writeOutput("parser-output.json", JSON.stringify(parserOutput, sortKeys, 2));

}


function writeError(name: string, err: Error) {
  writeOutput("error.json", JSON.stringify({ error: { message: err.message, stack: err.stack }, stage: name }, null, 2));
}

function writeOutput(name: string, output: string) {
  writeFileSync(`${process.cwd()}/${name}`, `${output}\n`);
}


function catchErrors<F extends(...args: any) => any>(name: string, callback: F): ReturnType<F> {
  try {
    return callback();
  } catch (err){
    if(err instanceof Error){
      writeError(name, err);
    }
    throw err;
  }
}
