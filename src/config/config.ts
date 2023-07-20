import { existsSync, readFileSync } from "unwritten:platform/file-system/node.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { defaultJSONRenderConfig } from "unwritten:renderer:json/config/default.js";
import { defaultHTMLRenderConfig, defaultMarkdownRenderConfig } from "unwritten:renderer:markup/config/default.js";
import { findFile } from "unwritten:utils:finder.js";
import { override } from "unwritten:utils:override.js";

import { defaultExternalTypes, defaultInterpreterConfig, defaultOutputPath } from "./default.js";

import type { CompleteConfig, Config } from "unwritten:type-definitions/config.js";
import type { DefaultContext } from "unwritten:type-definitions/context.js";


export async function createConfig(ctx: DefaultContext, configOrPath: Config | string | undefined, output?: string): Promise<CompleteConfig> {

  const logger = ctx.dependencies.logger;
  const { absolute, getDirectory } = ctx.dependencies.path;

  const defaultConfig = getDefaultConfig();

  let userConfig: Config | undefined;
  let absoluteConfigPath: string | undefined;

  if(typeof configOrPath === "object"){

    userConfig = configOrPath;
    logger?.log("Using provided unwritten config.");

  } else if(typeof configOrPath === "string"){

    absoluteConfigPath = absolute(configOrPath);

    if(existsSync(absoluteConfigPath) === false){
      throw new Error(`unwritten config file does not exist at ${absoluteConfigPath}`);
    }

  } else if(typeof configOrPath === "undefined"){

    absoluteConfigPath = findFile(ctx, [
      ".unwritten.json",
      ".unwritten.js",
      ".unwritten.mjs",
      ".unwritten.cjs"
    ], configOrPath);

    if(absoluteConfigPath === undefined){
      logger?.info("No unwritten.json found, continue using default configuration.");
    } else {
      logger?.info(`Using unwritten config found at ${logger.filePath(absoluteConfigPath)}`);
    }

  }

  if(typeof absoluteConfigPath === "string"){
    userConfig = await importFile(ctx, absoluteConfigPath);
  }

  const extendedUserConfig = userConfig && await getExtendConfig(ctx, userConfig);

  const config = override(defaultConfig, extendedUserConfig);

  if(typeof output === "string"){
    config.outputDir = absolute(getDirectory(output));
  }

  return config;

}

async function importFile(ctx: DefaultContext, path: string) {
  const { path: { getFileExtension } } = ctx.dependencies;

  if(getFileExtension(path) === ".json"){
    const importedConfig = readFileSync(path);
    return JSON.parse(importedConfig);
  } else {
    const { default: importFile } = await import(path);
    return importFile;
  }
}

async function getExtendConfig(ctx: DefaultContext, config: Config): Promise<Config> {

  const {
    path: {
      absolute: resolve
    }
  } = ctx.dependencies;

  if(config.extends === undefined){
    return config;
  }

  if(typeof config.extends !== "string"){
    throw new TypeError("\"extends\" property in unwritten config must of type string if provided.");
  }

  let loadedConfig = await importFile(ctx, resolve(config.extends));

  if(typeof loadedConfig !== "object" || Array.isArray(loadedConfig)){
    throw new TypeError("The extended unwritten config is not an object.");
  }

  if(typeof loadedConfig.extends === "string"){
    loadedConfig = await getExtendConfig(ctx, loadedConfig);
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
