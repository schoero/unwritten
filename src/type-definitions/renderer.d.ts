import type { ExportableEntities } from "unwritten:interpreter/type-definitions/entities.js";

import type { RenderContext } from "./context.js";


export interface Renderer {
  /** The file extension the renderer generates */
  fileExtension: `.${string}`;
  /** The name of the render extension */
  name: string;
  /** The render function */
  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => string;
}
