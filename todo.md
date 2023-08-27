* [ ] Define exports
* [x] Reintegrate link registry
* [ ] Type reference check target types
  * [ ] Exportable entities
  * [ ] Type parameters
  * [ ] Type queries?
  * [ ] Conditional types?
* [x] Allow multiple entry points
  * [x] Via CLI
  * [x] Via API
    * [ ] Auto create from namespace exports (`export * from './other-module.js'`)
    * [x] Shared types should be able to get linked from the other entry points
* [ ] Check if instanceType and staticType are really necessary
* [ ] Parse and render type assertions
* [x] Add event property tags
* [x] Add support for @throws
* [ ] Read title from package.json
* [ ] Read entry point from package.json
* [ ] Provide "linting" functionality
* [ ] Warn if exported functions are not properly documented
* [ ] Improve mapped type rendering
* [ ] Improve conditional type rendering
* [ ] Section separators in markdown are only rendered before the content but not after
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
  * Add jsdoc comments and description to files
* [x] Remove `undefined` from optional types -> Resolved with `strictNullChecks` in tsconfig
* [ ] Auto detect repositories of external packages for external types and link unresolved type to them
* [ ] Link to type parameter possible
* [x] Introduce `typeId` `symbolId`, `declarationId` and `valueDeclarationId`
  * [ ] Figure out how to link references correctly as in markdown id's are generated automatically
    * [ ] If for eg. the type of a parameter references an interface with the name `Interface` and a namespace also contains the an interface with the name `Interface` then the link reference the namespace interface because it would be rendered first.  
* [x] Use convert function in renderer tests
* [x] Render Type alias signature

* [x] Resolve position relative to input file
