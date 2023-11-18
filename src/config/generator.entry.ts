import { getDefaultConfig } from "unwritten:config/config";
import { existsSync, mkdirSync, writeFileSync } from "unwritten:platform/file-system/node";
import { absolute, getDirectory, join } from "unwritten:platform/path/node";
import { cwd } from "unwritten:platform/process/node";

import type { ConfigForSchema } from "unwritten:type-definitions/config";
import type { Options } from "unwritten:type-definitions/options";


export async function generateConfig(path?: string, options?: Options) {

  const { logger } = options?.silent ? { logger: undefined } : await import("unwritten:platform/logger/node.js");

  const outputName = ".unwritten.json";
  const outputDir = path ? getDirectory(path) : cwd();
  const resolvedOutputDir = absolute(outputDir);
  const resolvedOutputFilePath = join(resolvedOutputDir, outputName);

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


export function getConfigWithSchema(): ConfigForSchema {
  return {
    $schema: "https://raw.githubusercontent.com/schoero/unwritten/main/schemas/renderer/config.json",
    ...getDefaultConfig()
  };
}
