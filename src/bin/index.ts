#!/usr/bin/env node

import { Command } from "commander";

import { description, name, version } from "../utils/package-json.js";
import { debug } from "./debug.js";
import { generate } from "./generate.js";
import { init } from "./init.js";


//-- Create program

const program = new Command();

program
  .name(name)
  .description(description)
  .version(version, "-v, --version");


//-- Add commands

program.command("init")
  .action(init);


program.command("generate")
  .description("Generate documentation")
  .argument("<entryFile>", "The entry file of your project.")
  .option("-t, --tsconfig <path>", `Provide a tsconfig file used to compile your project. ${name} will try to find the tsconfig by itself if no tsconfig.json is provided.`)
  .option("-e, --exclude [path...]", "Exclude a file or directory from the documentation.")
  .option("-c, --config <path>", `Provide a ${name} config used to render the documentation. ${name} will try to find the .${name}.json config by itself if none is provided or uses the default config.`)
  .option("-o, --output <path>", "Specify the output directory and file name. Defaults to ./docs/api based on the current working directory.")
  .option("-r, --renderer <markdown | html | <pathToCustomRenderer>>", "Choose the format of the rendered output.", "markdown")
  .option("-s, --silent", "Disables any console output.")
  .action(generate);


program.command("debug")
  .description("Writes out the parser output to current working directory.")
  .argument("<entryFile>", "The file you want to debug.")
  .action(debug);

program.parse();
