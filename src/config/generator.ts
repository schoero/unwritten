import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { Logger } from "quickdoks:logger/index.js";

import { getDefaultConfig } from "./index.js";

import type { ConfigWithSchema } from "quickdoks:type-definitions/config.js";


export function generateConfig() {

  const outputName = ".quickdoks.json";
  const outputDir = resolve(process.cwd());
  const outputFilePath = resolve(outputDir, outputName);

  if(existsSync(outputFilePath) === true){
    throw new Error(`Configuration file already exists at ${outputFilePath}.`);
  }

  if(existsSync(outputDir) === false){
    mkdirSync(outputDir, { recursive: true });
  }


  //-- Add schema to config

  const config: ConfigWithSchema = {
    $schema: "https://raw.githubusercontent.com/schoero/quickdoks/main/schemas/renderer/config.json",
    ...getDefaultConfig()
  };

  writeFileSync(outputFilePath, JSON.stringify(config, null, 2));

  Logger.log(`Configuration file created at ${outputFilePath}.`);

}
