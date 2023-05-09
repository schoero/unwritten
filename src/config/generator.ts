import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { getDefaultConfig } from "./index.js";

import type { ConfigWithSchema } from "unwritten:type-definitions/config.js";


export async function generateConfig(path?: string, options?: any) {

  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:logger/index.js");

  const outputName = ".unwritten.json";
  const outputDir = resolve(process.cwd());
  const outputFilePath = path ? resolve(path) : resolve(outputDir, outputName);

  if(existsSync(outputFilePath) === true){
    throw new Error(`Configuration file already exists at ${outputFilePath}.`);
  }

  if(existsSync(outputDir) === false){
    mkdirSync(outputDir, { recursive: true });
  }

  const config = getConfigWithSchema();

  writeFileSync(outputFilePath, JSON.stringify(config, null, 2));

  logger?.log(`Configuration file created at ${outputFilePath}.`);

}


export function getConfigWithSchema() {
  const config: ConfigWithSchema = {
    $schema: "https://raw.githubusercontent.com/schoero/unwritten/main/schemas/renderer/config.json",
    ...getDefaultConfig()
  };
  return config;
}
