import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path/posix";

import { parse } from "unwritten:compiler/ast/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { sortKeys } from "unwritten:utils:general.js";


export function debug(inputPath: string, outputDir: string = process.cwd()) {

  const code = catchErrors("Reading input file", outputDir, () => readFileSync(inputPath, { encoding: "utf-8" }));
  const { fileSymbol, ctx } = catchErrors("Compiling input file", outputDir, () => compile(code));
  const parserOutput = catchErrors("Parsing file symbol", outputDir, () => parse(ctx, fileSymbol));

  writeFileSync(`${resolve(outputDir, "output.json")}`, JSON.stringify(parserOutput, sortKeys, 2));

}


function writeError(name: string, outputDir: string, err: Error) {
  writeFileSync(`${resolve(outputDir, "error.json")}`, JSON.stringify({ error: { message: err.message, stack: err.stack }, stage: name }, null, 2));
}

function catchErrors<F extends(...args: any) => any>(name: string, outputDir: string, callback: F): ReturnType<F> {
  try {
    return callback();
  } catch (err){
    if(err instanceof Error){
      writeError(name, outputDir, err);
    }
    throw err;
  }
}
