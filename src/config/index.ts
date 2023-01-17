import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { BuiltInRenderers } from "quickdoks:renderer/enums/renderer.js";
import { defaultRenderConfig } from "quickdoks:renderer:markup/config/default.js";
import { findFile } from "quickdoks:utils:finder.js";
import { override } from "quickdoks:utils:override.js";

import { defaultCompilerConfig, defaultExternalTypes } from "./default.js";

import type { CompleteConfig, Config } from "quickdoks:type-definitions/config.d.js";
import type { DefaultContext } from "quickdoks:type-definitions/context.d.js";


export async function createConfig(ctx: DefaultContext, configOrPath?: Config | string): Promise<CompleteConfig> {

  const defaultConfig = getDefaultConfig();

  let userConfig: Config | undefined;
  let absoluteConfigPath: string | undefined;

  if(typeof configOrPath === "object"){

    userConfig = configOrPath;
    ctx.logger?.log("Using provided config.");

  } else if(typeof configOrPath === "string"){

    absoluteConfigPath = resolve(configOrPath);

    if(existsSync(absoluteConfigPath) === false){
      throw new Error(`Config file does not exist at ${absoluteConfigPath}`);
    }

  } else if(typeof configOrPath === "undefined"){

    absoluteConfigPath = findFile([
      ".quickdoks.json",
      ".quickdoks.js",
      ".quickdoks.mjs",
      ".quickdoks.cjs"
    ], configOrPath);

    if(absoluteConfigPath === undefined){
      ctx.logger?.log("Using default config.");
    } else {
      ctx.logger?.log(`Using config found at ${absoluteConfigPath}`);
    }

  }

  if(typeof absoluteConfigPath === "string"){
    const { default: importedConfig } = await import(absoluteConfigPath);
    userConfig = importedConfig;
  }

  if(userConfig === undefined){
    return defaultConfig;
  }

  const extendedUserConfig = await getExtendConfig(userConfig);

  return override(defaultConfig, extendedUserConfig);

}


async function getExtendConfig(config: Config): Promise<Config> {

  if(config.extends === undefined){
    return config;
  }

  if(typeof config.extends !== "string"){
    throw new Error(`Config extends property must be a string if it exists.`);
  }

  let { default: loadedConfig } = await import(config.extends);

  if(typeof loadedConfig !== "object" || Array.isArray(loadedConfig)){
    throw new Error(`The extended config is not an object.`);
  }

  if(typeof loadedConfig.extends === "string"){
    loadedConfig = getExtendConfig(loadedConfig);
  }

  return override(loadedConfig, config);

}


export function getDefaultConfig(): CompleteConfig {

  const defaultConfig: CompleteConfig = {
    compilerConfig: defaultCompilerConfig,
    externalTypes: defaultExternalTypes,
    renderConfig: {
      [BuiltInRenderers.Markdown]: defaultRenderConfig,
      [BuiltInRenderers.HTML]: defaultRenderConfig
    }
  };

  return defaultConfig;

}
