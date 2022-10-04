import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { compile } from "compiler/index.js";
import { getEntryFileSymbolFromProgram, parse } from "compiler/parser/index.js";
import { setConfig } from "renderer/config/index.js";
import { getRenderExtension, setRenderExtension } from "renderer/extensions/index.js";
import { render } from "renderer/index.js";
import { disableLog, error, log } from "src/log/index.js";
import { Config } from "src/types/config.js";
import { APIOptions } from "src/types/options.js";
import { findFile } from "src/utils/finder.js";


export async function docCreator(entryFilePath: string, options?: APIOptions) {

  const absoluteEntryFilePath = resolve(entryFilePath);


  //-- Silence output

  if(options?.silent === true){
    disableLog();
  }


  //-- Set renderer extension

  if(options?.renderer === "markdown" || options?.renderer === undefined){
    const markdownRenderExtension = await import("renderer/extensions/markdown.js");

    setRenderExtension(markdownRenderExtension.markdownRenderExtension);
  } else if(options.renderer === "html"){
    const htmlRenderExtension = await import("renderer/extensions/html.js");

    setRenderExtension(htmlRenderExtension.htmlRenderExtension);
  } else if(typeof options.renderer === "object"){
    setRenderExtension(options.renderer);
  }


  //-- Set config

  let absoluteConfigPath: string | undefined;

  if(typeof options?.config === "object"){
    setConfig(options.config);
    log("Using provided config.");
  } else if(typeof options?.config === "string"){
    absoluteConfigPath = resolve(options.config);
    if(existsSync(absoluteConfigPath) === false){
      throw error(`Config file does not exist at ${absoluteConfigPath}`);
    }
  } else if(options?.config === undefined){
    absoluteConfigPath = findFile(".doc-creator.json", absoluteEntryFilePath);
    if(absoluteConfigPath === undefined){
      log("Using default config.");
    } else {
      log(`Using config found at ${absoluteConfigPath}`);
    }
  }

  if(absoluteConfigPath !== undefined){
    const config = readFileSync(absoluteConfigPath, "utf8");
    try {
      const parsedConfig: Config = JSON.parse(config);

      setConfig(parsedConfig);
    } catch (err){
      throw error(`Error parsing config file: ${err} at ${absoluteConfigPath}`);
    }
  }


  //-- Compile, parse and render

  const program = compile(absoluteEntryFilePath, options?.tsconfig);
  const entryFileSymbol = getEntryFileSymbolFromProgram(program);
  const parsedSymbols = parse(entryFileSymbol);
  const renderedSymbols = render(parsedSymbols);


  //-- Write output to file

  const fileExtension = getRenderExtension().fileExtension;
  const outputPath = options?.output ?? `./docs/api${fileExtension}`;
  const absoluteOutputDir = resolve(dirname(outputPath));

  if(existsSync(absoluteOutputDir) === false){
    mkdirSync(absoluteOutputDir, { recursive: true });
  }

  writeFileSync(outputPath, renderedSymbols);

  return parsedSymbols;

}