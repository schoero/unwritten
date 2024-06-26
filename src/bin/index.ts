#!/usr/bin/env node

import { cac } from "cac";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { name, version } from "unwritten:utils/package-json.entry";

import { generate } from "./generate";
import { init } from "./init";


const cli = cac(name);

cli
  .version(version)
  .help();

cli.command("init [path]", "Create a new config file.")
  .alias("i")
  .option("-s, --silent", "Disables any console output.")
  .action(init);

cli.command("<...entryFiles>", "Generate documentation")
  .alias("generate")
  .alias("g")
  .option("-t, --tsconfig <path>", `Provide a tsconfig file used to compile your project. ${name} will try to find the tsconfig by itself if no tsconfig.json is provided.`)
  .option("-c, --config <path>", `Provide a ${name} config used to render the documentation. ${name} will try to find the .${name}.json config by itself if none is provided or uses the default config.`)
  .option("-o, --output <path>", "Specify the output directory. Defaults to ./docs/api based on the current working directory.")
  .option("-r, --renderer <md | html | json | pathToCustomRenderer>", "Choose the format of the rendered output.", { default: BuiltInRenderers.Markdown })
  .option("-s, --silent", "Disables any console output.", { default: false })
  .option("-d, --debug", "Enables verbose logging.", { default: false })
  .action(generate);

cli.parse();
