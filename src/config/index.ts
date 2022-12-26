import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { defaultRenderConfig } from "quickdoks:renderer:markup/config/default.js";
import { CompleteConfig, Config } from "quickdoks:type-definitions/config.d..js";
import { findFile } from "quickdoks:utils:finder.js";
import { override } from "quickdoks:utils:override.js";

import { DefaultContext } from "quickdoks:type-definitions/context.d.js";
import { BuiltInRenderers } from "quickdoks:type-definitions/renderer.d.js";

import { defaultCompilerConfig, defaultExternalTypes } from "./default.js";


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
      throw Error(`Config file does not exist at ${absoluteConfigPath}`);
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
    userConfig = (await import(absoluteConfigPath)).default;
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

  let loadedConfig = (await import(config.extends)).default;

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
