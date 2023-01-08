import type { RenderContext } from "./context.js";

import type { ExportableEntities } from "quickdoks:compiler:type-definitions/entities.d.js";


export enum BuiltInRenderers {
  HTML = "html",
  Markdown = "markdown"
}

export interface Renderer {
  /** The file extension the renderer generates */
  fileExtension: string;
  /** The name of the render extension */
  name: BuiltInRenderers | string;
  /** The render function */
  render: (context: RenderContext, types: ExportableEntities[]) => string;
}
