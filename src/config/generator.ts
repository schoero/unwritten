import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { getDefaultConfig } from "./index.js";

import type { ConfigWithSchema } from "unwritten:type-definitions/config.js";


export async function generateConfig(path?: string, options?: any) {

  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:logger/node.js");

  const outputName = ".unwritten.json";
  const outputDir = path ? dirname(path) : process.cwd();
  const resolvedOutputDir = resolve(outputDir);
  const resolvedOutputFilePath = resolve(resolvedOutputDir, outputName);

  if(existsSync(resolvedOutputFilePath) === true){
    throw new Error(`Configuration file already exists at ${resolvedOutputFilePath}.`);
  }

  if(existsSync(resolvedOutputDir) === false){
    mkdirSync(resolvedOutputDir, { recursive: true });
  }

  const config = getConfigWithSchema();

  writeFileSync(resolvedOutputFilePath, JSON.stringify(config, null, 2));

  logger?.log(`Configuration file created at ${resolvedOutputFilePath}.`);

}


export function getConfigWithSchema() {
  const config: ConfigWithSchema = {
    $schema: "https://raw.githubusercontent.com/schoero/unwritten/main/schemas/renderer/config.json",
    ...getDefaultConfig()
  };
  return config;
}
