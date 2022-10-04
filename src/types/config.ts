
export interface Config {
  /** Compiler configuration. */
  compilerConfig?: CompilerConfig;
  /** Links to external documentation of native types. */
  externalTypes?: ExternalTypes;
  /** Render configuration. */
  renderConfig?: RenderConfig;
}

export interface ConfigWithSchema extends Config {
  $schema: string;
}

export type Encapsulation = [prefix: string, suffix: string];

export type Complete<Config> = {
  [key in keyof Config]-?: Config[key];
};


export interface CompilerConfig {

  /** An array of excluded directories. */
  exclude?: string[];

}

export interface RenderConfig {


  /**
   * Defines how parameters should be encapsulated in the rendered output.
   */
  parameterEncapsulation?: Encapsulation | boolean;

  /**
   * Defines how properties should be encapsulated in the rendered output.
   */
  propertyEncapsulation?: Encapsulation | boolean;

  /**
    * Defines the title of the categories for the rendered entities.
    */
  // categoryNames?: CategoryNames;
  /**
   * Defines how string literal type annotations should be encapsulated in the rendered output.
   */
  stringLiteralTypeEncapsulation?: Encapsulation | boolean;

  /**
    * Defines the order in which entities should be rendered.
    */
  // renderOrder?: Entities["kind"][];

  /**
   * Defines how tags like `@beta` or `@deprecated` should be encapsulated in the rendered output.
   */
  tagEncapsulation?: Encapsulation | boolean;

  /**
   * Defines how type annotations should be encapsulated in the rendered output.
   */
  typeEncapsulation?: Encapsulation | boolean;

}

export interface ExternalTypes {
  [key: string]: string;
}