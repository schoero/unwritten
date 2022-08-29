import { ExportableEntities } from "./entities.js";
import { CategoryNames } from "./renderer.js";
import { EntityKind } from "./types.js";

export interface Config {
  /** Render configuration. */
  renderConfig?: RenderConfig;
  /** Links to external documentation of primitive types. */
  typeSources?: TypeSources;
}

export interface ConfigWithSchema extends Config {
  $schema: string;
}

export type Encapsulation = [prefix: string, suffix: string];

export type Complete<Config> = {
  [key in keyof Config]-?: Config[key];
};

export interface RenderConfig {

  /**
   * Defines how parameters should be encapsulated in the rendered output.
   */
  parameterEncapsulation?: boolean | Encapsulation;

  /**
   * Defines how properties should be encapsulated in the rendered output.
   */
  propertyEncapsulation?: boolean | Encapsulation;

  /**
   * Defines how type annotations should be encapsulated in the rendered output.
   */
  typeEncapsulation?: boolean | Encapsulation;

  /**
   * Defines how literal type annotations should be encapsulated in the rendered output.
   */
  literalTypeEncapsulation?: boolean | Encapsulation;

  /**
   * Defines whether basic types should be linked to external documentation.
   * @default true
   */
  linkBasicTypesToExternalDocs?: boolean;

  /**
   * Defines how tags like `@beta` or `@deprecated` should be encapsulated in the rendered output.
   */
   tagEncapsulation?: boolean | Encapsulation;

   /**
    * Defines the order in which entities should be rendered.
    */
   renderOrder?: ExportableEntities["kind"][];

   /**
    * Defines the title of the categories for the rendered entities.
    */
   categoryNames?: CategoryNames;

}

export interface TypeSources {
  [EntityKind.String]?: string;
  [EntityKind.Number]?: string;
  [EntityKind.Boolean]?: string;
  [EntityKind.BigInt]?: string;
  [EntityKind.Object]?: string;
  [EntityKind.Array]?: string;
  [EntityKind.Function]?: string;
  [EntityKind.Symbol]?: string;
  [EntityKind.Undefined]?: string;
  [EntityKind.Null]?: string;
}