import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { error, log } from "../log/index.js";
import { defaultRenderConfig } from "../renderer/markup/config/default.js";
import { CompleteConfig, Config } from "../types/config.js";
import { BuiltInRenderers } from "../types/renderer.js";
import { findFile } from "../utils/finder.js";
import { override } from "../utils/override.js";
import { defaultCompilerConfig, defaultExternalTypes } from "./default.js";


export function createConfig(configOrPath?: Config | string): CompleteConfig {

  const defaultConfig = _getDefaultConfig();

  let userConfig: Config | undefined;
  let absoluteConfigPath: string | undefined;

  if(typeof configOrPath === "object"){
    userConfig = configOrPath;
    log("Using provided config.");
  } else if(typeof configOrPath === "string"){
    absoluteConfigPath = resolve(configOrPath);

    if(existsSync(absoluteConfigPath) === false){
      throw error(`Config file does not exist at ${absoluteConfigPath}`);
    }

  } else if(typeof configOrPath === "undefined"){

    absoluteConfigPath = findFile(".doc-creator.json", configOrPath);

    if(absoluteConfigPath === undefined){
      log("Using default config.");
    } else {
      log(`Using config found at ${absoluteConfigPath}`);
    }

  }

  if(typeof absoluteConfigPath === "string"){
    const stringifiedConfig = readFileSync(absoluteConfigPath, "utf8");
    try {
      userConfig = JSON.parse(stringifiedConfig);
    } catch (err){
      throw error(`Error parsing config file: ${err} at ${absoluteConfigPath}`);
    }
  }

  if(userConfig === undefined){
    return defaultConfig;
  }

  return override(defaultConfig, userConfig);

}


function _getDefaultConfig(): CompleteConfig {

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