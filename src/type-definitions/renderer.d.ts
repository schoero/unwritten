import type { ExportableEntities } from "quickdoks:compiler:type-definitions/entities.d.js";

import type { RenderContext } from "./context.js";


export type Renderer = {
  [key: string]: any;
  /** The file extension the renderer generates */
  fileExtension: string;
  /** The name of the render extension */
  name: string;
  /** The render function */
  render: <CustomRenderer extends Renderer>(ctx: RenderContext<CustomRenderer>, entities: ExportableEntities[]) => string;
};
