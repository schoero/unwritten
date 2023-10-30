import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { defaultJSONRenderConfig } from "unwritten:renderer:json/config/default";
import { defaultHTMLRenderConfig, defaultMarkdownRenderConfig } from "unwritten:renderer:markup/config/default";
import { findFile } from "unwritten:utils:finder";
import { override } from "unwritten:utils:override";

import { defaultExternalTypes, defaultInterpreterConfig, defaultOutputPath } from "./default";

import type { CompleteConfig, Config } from "unwritten:type-definitions/config";
import type { DefaultContext } from "unwritten:type-definitions/context";


const CONFIG_NAMES = [
  ".unwritten.json",
  ".unwritten.js",
  ".unwritten.mjs",
  ".unwritten.cjs"
];

export async function createConfig(ctx: DefaultContext, configOrPath: Config | string | undefined, output?: string): Promise<CompleteConfig> {

  const logger = ctx.dependencies.logger;
  const { absolute, getDirectory } = ctx.dependencies.path;
  const { existsSync } = ctx.dependencies.fs;

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

    absoluteConfigPath = findFile(ctx, CONFIG_NAMES, configOrPath);

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

  const { getFileExtension } = ctx.dependencies.path;
  const { readFileSync } = ctx.dependencies.fs;

  if(getFileExtension(path) === ".json"){
    const importedConfig = readFileSync(path);
    return JSON.parse(importedConfig);
  } else {
    const { default: importFile } = await import(path);
    return importFile;
  }

}

async function getExtendConfig(ctx: DefaultContext, config: Config): Promise<Config> {

  const { cwd } = ctx.dependencies.process;
  const { join } = ctx.dependencies.path;
  const { existsSync } = ctx.dependencies.fs;

  if(config.extends === undefined){
    return config;
  }

  if(typeof config.extends !== "string"){
    throw new TypeError("\"extends\" property in unwritten config must of type string if provided.");
  }

  let loadedConfig: Config | undefined;

  // Load via direct import
  if(existsSync(config.extends)){
    loadedConfig = await importFile(ctx, config.extends);
  }

  // Load via package.json main property
  if(loadedConfig === undefined){
    const packageJsonPath = findFile(ctx, "package.json", join(cwd(), "node_modules", "/", config.extends, "/"));
    const packageJson = packageJsonPath && await importFile(ctx, packageJsonPath);

    if(packageJson?.main !== undefined){
      loadedConfig = await importFile(ctx, join(cwd(), "node_modules", "/", config.extends, "/", packageJson.main));
    }
  }

  // Load via finder
  if(loadedConfig === undefined){
    const foundConfigPath = findFile(ctx, CONFIG_NAMES, join(cwd(), "node_modules", "/", config.extends, "/"));

    if(foundConfigPath !== undefined){
      loadedConfig = await importFile(ctx, foundConfigPath);
    }
  }

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
