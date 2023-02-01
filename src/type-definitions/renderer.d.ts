import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.d.js";

import type { RenderContext } from "./context.js";


export type Renderer = {
  [key: string]: any;
  /** The file extension the renderer generates */
  fileExtension: string;
  /** The name of the render extension */
  name: string;
  /** The render function */
  render: (ctx: RenderContext<Renderer>, entities: ExportableEntities[]) => string;
};
