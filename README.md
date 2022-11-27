<div align="center">
  <img alt="quickdoks" src="assets/quickdoks.svg">
</div>

---

<div align="center">
  <a href="https://github.com/schoero/quickdoks/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/npm/l/quickdoks?color=brightgreen&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/quickdoks">
    <img alt="Version" src="https://img.shields.io/npm/v/quickdoks?color=brightgreen&style=flat-square">
  </a>
  <a href="https://github.com/schoero/quickdoks/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues-raw/schoero/quickdoks?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/quickdoks">
    <img alt="Downloads" src="https://img.shields.io/npm/dw/quickdoks?style=flat-square">
  </a>
  <a href="https://github.com/schoero/quickdoks/stargazers">
    <img alt="Downloads" src="https://img.shields.io/github/stars/schoero/quickdoks?color=brightgreen&style=flat-square">
  </a>
  <a href="https://github.com/schoero/quickdoks/actions?query=workflow%3ACI">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/schoero/quickdoks/CI?style=flat-square">
  </a>
</div>

---

A cli tool that auto generates documentation from your JavaScript or TypeScript project by utilizing TSDoc or JSDoc comments.

> WARNING: This project is at a really early stage and currently under heavy development. It is not feature complete and it may not or only partially work with your project. You have been warned.

## Installation

```sh
npm i quickdoks
```

## Usage

```sh
quickdoks generate <path/to/entry-file.ts> [options]
```

## Options

```sh
--output <path/to/output/file-name>     # Specify the output directory and file-
-o <path/to/output/file-name>           # name. Defaults to ./docs/api based on
                                        # the current working directory.

--tsconfig <path/to/tsconfig.json>      # Provide a tsconfig file used to
-t <path/to/tsconfig.json>              # compile your project. quickdoks will
                                        # try to find the tsconfig by itself if
                                        # no tsconfig.json is provided.

--config <path/to/.quickdoks.json>      # Provide a quickdoks config used to
-c <path/to/.quickdoks.json>            # render the documentation. quickdoks
                                        # will try to find the .quickdoks.json
                                        # config by itself if none is provided
                                        # or uses the default config.

--renderer <markdown | html>            # Choose the format of the rendered 
-r <markdown | html>                    # output. Defaults to markdown.

--silent                                # Disables the output.
-s

--version                               # Returns the installed quickdoks
-v                                      # version.
```

## Configuration

You can configure how your documentation will be rendered using a configuration file. The simplest way to create such a configuration file is by using the following command:

```sh
quickdoks init
```

This will create a `.quickdoks.json` file in the current working directory with the default configuration. You can change or remove any of the options in the configuration file.
