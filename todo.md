* [ ] Read title from package.json
* [ ] Read entry point from package.json
* [ ] Provide "linting" functionality
* [ ] Warn if exported functions are not properly documented
* [ ] Improve mapped type rendering
* [ ] Improve conditional type rendering
* [ ] Render exports keyword in ts renderer
* [ ] Allow multiple entry points
* [ ] Add ability to render to multiple files
  * [ ] Per entry point
  * [ ] Per source file
  * [ ] Per entity
* [ ] Add browser support
* [ ] Finalize API
  * [ ] Renderers
    * [ ] Object that implements the Renderer interface
    * [ ] Path to a file that exports a Renderer
    * [ ] String with the name of a built-in renderer
    * [ ] undefined
  * [ ] tsconfig
    * [ ] tsconfig object
    * [ ] Path to a tsconfig file
    * [ ] undefined
    * [ ] test various finder algorithms and fallback to default config
