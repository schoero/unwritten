<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/unwritten-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/unwritten-light.svg">
    <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="assets/unwritten.svg">
</picture>
</div>

---

<div align="center">
  <a href="https://github.com/schoero/unwritten/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/npm/l/unwritten?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/unwritten">
    <img alt="Version" src="https://img.shields.io/npm/v/unwritten?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
  <a href="https://github.com/schoero/unwritten/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues-raw/schoero/unwritten?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/unwritten">
    <img alt="Downloads" src="https://img.shields.io/npm/dw/unwritten?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
  <a href="https://github.com/schoero/unwritten/stargazers">
    <img alt="Downloads" src="https://img.shields.io/github/stars/schoero/unwritten?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
  <a href="https://github.com/schoero/unwritten/actions?query=workflow%3ACI">
    <img alt="CI" src="https://img.shields.io/github/workflow/status/schoero/unwritten/CI?labelColor=454c5c&color=00AD51&&style=flat-square">
  </a>
</div>

---

A cli tool that auto generates documentation from your JavaScript or TypeScript project by utilizing TSDoc or JSDoc comments.

> WARNING: This project is at a really early stage and currently under heavy development. It is not feature complete and it may not or only partially work with your project. You have been warned.

## Installation

```sh
npm i unwritten
```

## Usage

```sh
unwritten generate <path/to/entry-file.ts> [options]
```

## Options

```sh
--output <path/to/output/file-name>     # Specify the output directory and file-
-o <path/to/output/file-name>           # name. Defaults to ./docs/api based on
                                        # the current working directory.

--tsconfig <path/to/tsconfig.json>      # Provide a tsconfig file used to
-t <path/to/tsconfig.json>              # compile your project. unwritten will
                                        # try to find the tsconfig by itself if
                                        # no tsconfig.json is provided.

--config <path/to/.unwritten.json>      # Provide a unwritten config used to
-c <path/to/.unwritten.json>            # render the documentation. unwritten
                                        # will try to find the .unwritten.json
                                        # config by itself if none is provided
                                        # or uses the default config.

--renderer <markdown | html>            # Choose the format of the rendered 
-r <markdown | html>                    # output. Defaults to markdown.

--silent                                # Disables the output.
-s

--version                               # Returns the installed unwritten
-v                                      # version.
```

## Configuration

You can configure how your documentation will be rendered using a configuration file. The simplest way to create such a configuration file is by using the following command:

```sh
unwritten init
```

This will create a `.unwritten.json` file in the current working directory with the default configuration. You can change or remove any of the options in the configuration file.
