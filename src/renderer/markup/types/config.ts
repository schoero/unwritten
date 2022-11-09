import { Types } from "../../../types/types.js";
import { CategoryNames } from "./renderer.js";


export interface MarkupRenderConfig {

  /**
    * Defines the title of the categories for the rendered entities.
    */
  categoryNames?: CategoryNames;

  /**
   * Defines how parameters should be encapsulated in the rendered output.
   */
  parameterEncapsulation?: Encapsulation | false;

  /**
   * Defines how properties should be encapsulated in the rendered output.
   */
  propertyEncapsulation?: Encapsulation | false;

  /**
    * Defines the order in which entities should be rendered.
    */
  renderOrder?: Types["kind"][];
  /**
   * Defines how string literal type annotations should be encapsulated in the rendered output.
   */
  stringLiteralTypeEncapsulation?: Encapsulation | false;

  /**
   * Defines how tags like `@beta` or `@deprecated` should be encapsulated in the rendered output.
   */
  tagEncapsulation?: Encapsulation | false;

  /**
   * Defines how type annotations should be encapsulated in the rendered output.
   */
  typeEncapsulation?: Encapsulation | false;

}

export type Encapsulation = [prefix: string, suffix: string];
