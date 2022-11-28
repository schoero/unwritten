import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { error, success } from "../log/index.js";
import { ConfigWithSchema } from "../types/config.js";
import { getDefaultConfig } from "./index.js";


export function generateConfig() {

  const outputName = ".quickdoks.json";
  const outputDir = resolve(process.cwd());
  const outputFilePath = resolve(outputDir, outputName);

  if(existsSync(outputFilePath) === true){
    throw error(`Configuration file already exists at ${outputFilePath}.`);
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

  success(`Configuration file created at ${outputFilePath}.`);

}
