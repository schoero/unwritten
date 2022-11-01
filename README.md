# doc-creator

A cli tool that auto generates documentation from your JavaScript or TypeScript project by utilizing TSDoc or JSDoc comments.

> WARNING: This project is at a really early stage and currently under heavy development. It is not feature complete and it may not or only partially work with your project. You have been warned.

## Installation

```sh
npm i doc-creator
```

## Usage

```sh
doc-creator generate <path/to/entry-file.ts> [options]
```

## Options

```sh
--output <path/to/output/file-name>     # Specify the output directory and file-
-o <path/to/output/file-name>           # name. Defaults to ./docs/api based on
                                        # the current working directory.

--tsconfig <path/to/tsconfig.json>      # Provide a tsconfig file used to
-t <path/to/tsconfig.json>              # compile your project. doc-creator will
                                        # try to find the tsconfig by itself if
                                        # no tsconfig.json is provided.

--config <path/to/.doc-creator.json>    # Provide a doc-creator config used to
-c <path/to/.doc-creator.json>          # render the documentation. doc-creator
                                        # will try to find the .doc-creator.json
                                        # config by itself if none is provided
                                        # or uses the default config.

--renderer <markdown | html>            # Choose the format of the rendered 
-r <markdown | html>                    # output. Defaults to markdown.

--silent                                # Disables the output.
-s

--version                               # Returns the installed doc-creator
-v                                      # version.
```

## Configuration

You can configure how your documentation will be rendered using a configuration file. The simplest way to create such a configuration file is by using the following command:

```sh
doc-creator init
```

This will create a `.doc-creator.json` file in the current working directory with the default configuration. You can change or remove any of the options in the configuration file.
