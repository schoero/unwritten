<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/unwritten-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="assets/unwritten-light.svg">
    <img alt="unwritten" src="assets/unwritten.svg">
  </picture>
</div>

---

<div align="center">

  [![GitHub license](https://img.shields.io/github/license/schoero/unwritten?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/unwritten/blob/main/LICENSE)
  [![npm version](https://img.shields.io/npm/v/unwritten?style=flat-square&labelColor=454c5c&color=00AD51)](https://www.npmjs.com/package/unwritten?activeTab=versions)
  [![GitHub issues](https://img.shields.io/github/issues/schoero/unwritten?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/unwritten/issues)
  [![npm weekly downloads](https://img.shields.io/npm/dw/unwritten?style=flat-square&labelColor=454c5c&color=00AD51)](https://www.npmjs.com/package/unwritten?activeTab=readme)
  [![GitHub repo stars](https://img.shields.io/github/stars/schoero/unwritten?style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/unwritten/stargazers)
  [![GitHub workflow status](https://img.shields.io/github/actions/workflow/status/schoero/unwritten/ci.yml?event=push&style=flat-square&labelColor=454c5c&color=00AD51)](https://github.com/schoero/unwritten/actions?query=workflow%3ACI)

</div>

---

unwritten is a cli tool to automatically generate documentation from your JavaScript or TypeScript library by utilizing JSDoc comments and the TypeScript compiler to extract types and relevant information.

> [!WARNING]
>
> This project is at a really early stage and currently under heavy development. It is not feature complete and it may not or only partially work with your project. You have been warned.

## Installation

```sh
npm i unwritten
```

## Usage

```sh
unwritten <path/to/entry-file.ts> [options]
```

## Options

```sh
--output <path/to/output/file-name>     # Specify the output directory and the
-o <path/to/output/file-name>           # file name. Defaults to ./docs/api 
                                        # based on the current working 
                                        # directory.

--tsconfig <path/to/tsconfig.json>      # Provide a tsconfig file used to
-t <path/to/tsconfig.json>              # compile your project. unwritten will
                                        # try to find the tsconfig by itself if
                                        # no tsconfig.json is provided.

--config <path/to/.unwritten.json>      # Provide an unwritten config used to
-c <path/to/.unwritten.json>            # render the documentation. unwritten
                                        # will try to find the .unwritten.json
                                        # config by itself if none is provided
                                        # or uses the default config.

--renderer <md | html | json>           # Choose the format of the rendered 
-r <md | html | json>                   # output. Defaults to `md` for markdown.
                                        # It is also possible to provide a
                                        # custom renderer by providing the path
                                        # to the file that default exports the 
                                        # renderer.

--silent                                # Disables any console output.
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
