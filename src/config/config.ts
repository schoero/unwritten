import { existsSync, readFileSync } from "node:fs";
import { dirname, parse, resolve } from "node:path";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { defaultJSONRenderConfig } from "unwritten:renderer:json/config/default.js";
import { defaultHTMLRenderConfig, defaultMarkdownRenderConfig } from "unwritten:renderer:markup/config/default.js";
import { findFile } from "unwritten:utils:finder.js";
import { override } from "unwritten:utils:override.js";

import { defaultExternalTypes, defaultInterpreterConfig, defaultOutputPath } from "./default.js";

import type { CompleteConfig, Config } from "unwritten:type-definitions/config.js";
import type { DefaultContext } from "unwritten:type-definitions/context.js";


export async function createConfig(ctx: DefaultContext, configOrPath: Config | string | undefined, output?: string): Promise<CompleteConfig> {

  const defaultConfig = getDefaultConfig();

  let userConfig: Config | undefined;
  let absoluteConfigPath: string | undefined;

  if(typeof configOrPath === "object"){

    userConfig = configOrPath;
    ctx.logger?.log("Using provided unwritten config.");

  } else if(typeof configOrPath === "string"){

    absoluteConfigPath = resolve(configOrPath);

    if(existsSync(absoluteConfigPath) === false){
      throw new Error(`unwritten config file does not exist at ${absoluteConfigPath}`);
    }

  } else if(typeof configOrPath === "undefined"){

    absoluteConfigPath = findFile([
      ".unwritten.json",
      ".unwritten.js",
      ".unwritten.mjs",
      ".unwritten.cjs"
    ], configOrPath);

    if(absoluteConfigPath === undefined){
      ctx.logger?.info("No unwritten.json found, continue using default configuration.");
    } else {
      ctx.logger?.info(`Using unwritten config found at ${ctx.logger.filePath(absoluteConfigPath)}`);
    }

  }

  if(typeof absoluteConfigPath === "string"){
    userConfig = await importFile(absoluteConfigPath);
  }

  const extendedUserConfig = userConfig && await getExtendConfig(userConfig);

  const config = override(defaultConfig, extendedUserConfig);

  if(typeof output === "string"){
    config.outputDir = resolve(dirname(output));
  }

  return config;

}

async function importFile(path: string) {
  if(parse(path).ext === ".json"){
    const importedConfig = readFileSync(path, "utf-8");
    return JSON.parse(importedConfig);
  } else {
    const { default: importFile } = await import(path);
    return importFile;
  }
}

async function getExtendConfig(config: Config): Promise<Config> {

  if(config.extends === undefined){
    return config;
  }

  if(typeof config.extends !== "string"){
    throw new TypeError("\"extends\" property in unwritten config must of type string if provided.");
  }

  let loadedConfig = await importFile(resolve(config.extends));

  if(typeof loadedConfig !== "object" || Array.isArray(loadedConfig)){
    throw new TypeError("The extended unwritten config is not an object.");
  }

  if(typeof loadedConfig.extends === "string"){
    loadedConfig = await getExtendConfig(loadedConfig);
  }

  return override(loadedConfig, config);

}


export function getDefaultConfig(): CompleteConfig {

  const defaultConfig: CompleteConfig = {
    externalTypes: defaultExternalTypes,
    interpreterConfig: defaultInterpreterConfig,
    outputDir: defaultOutputPath,
    renderConfig: {
      [BuiltInRenderers.Markdown]: defaultMarkdownRenderConfig,
      [BuiltInRenderers.HTML]: defaultHTMLRenderConfig,
      [BuiltInRenderers.JSON]: defaultJSONRenderConfig
    }
  };

  return defaultConfig;

}
