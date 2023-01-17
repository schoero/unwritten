import type { ExportableEntities } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { BuiltInRenderers } from "quickdoks:renderer/enums/renderer.js";

import type { RenderContext } from "./context.js";


export interface Renderer {
  /** The file extension the renderer generates */
  fileExtension: string;
  /** The name of the render extension */
  name: BuiltInRenderers | string;
  /** The render function */
  render: (context: RenderContext, types: ExportableEntities[]) => string;
}
