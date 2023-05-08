* [ ] Define exports
* [ ] Reintegrate link registry
* [ ] Add event property tags
* [ ] Add support for @throws
* [ ] Read title from package.json
* [ ] Read entry point from package.json
* [ ] Provide "linting" functionality
* [ ] Warn if exported functions are not properly documented
* [ ] Improve mapped type rendering
* [ ] Improve conditional type rendering
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

* [ ] Add `additionalTypes` to `ctx` and render after each entity.
  * [ ] Create integration test for this. Multiple functions that use the same type should only be rendered once.

* [ ] Link to type parameter possible
* [ ] How are type parameters rendered
* [ ] Introduce `typeId` `symbolId`, `declarationId` and `valueDeclarationId`
  * [ ] Figure out how to link references correctly as in markdown id's are generated automatically
    * [ ] If for eg. the type of a parameter references an interface with the name `Interface` and a namespace also contains the an interface with the name `Interface` then the link reference the namespace interface because it would be rendered first.  
* [ ] Use convert function in renderer tests
* [x] Render Type alias signature

* [ ] Resolve position relative to inptut file
  * [ ] Add option to use "absoulte" path based of repo
