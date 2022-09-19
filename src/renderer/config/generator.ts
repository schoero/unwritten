import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { error, success } from "../../log/index.js";
import { ConfigWithSchema } from "../../types/config.js";
import { getConfig } from "./index.js";


export function generateConfig() {

  const outputName = ".doc-creator.json";
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
    $schema: "https://raw.githubusercontent.com/schoero/doc-creator/release/schemas/renderer/config.json",
    ...getConfig()
  };

  writeFileSync(outputFilePath, JSON.stringify(config, null, 2));

  success(`Configuration file created at ${outputFilePath}.`);

}