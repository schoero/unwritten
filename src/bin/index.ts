#!/usr/bin/env node

import { cac } from "cac";

import { name, version } from "unwritten:utils:package-json.js";

import { debug } from "./debug.js";
import { generate } from "./generate.js";
import { init } from "./init.js";


//-- Create program

const cli = cac(name);

cli
  .version(version)
  .help();


//-- Add commands

cli.command("init [path]", "Create a new config file.")
  .action(init);


cli.command("<entryFile>", "Generate documentation")
  .option("-t, --tsconfig <path>", `Provide a tsconfig file used to compile your project. ${name} will try to find the tsconfig by itself if no tsconfig.json is provided.`)
  .option("-e, --exclude <...path>", "Exclude a file or directory from the documentation.")
  .option("-c, --config <path>", `Provide a ${name} config used to render the documentation. ${name} will try to find the .${name}.json config by itself if none is provided or uses the default config.`)
  .option("-o, --output <path>", "Specify the output directory and file name. Defaults to ./docs/api based on the current working directory.")
  .option("-r, --renderer <md | html | json | pathToCustomRenderer>", "Choose the format of the rendered output.")
  .option("-s, --silent", "Disables any console output.")
  .action(generate);


cli.command("debug <entryFile>", "Writes out the parser output to current working directory.")
  .action(debug);

cli.parse();
