import { RenderContext } from "./context.js";
import { ExportableTypes } from "./types.js";


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
  render: (context: RenderContext, types: ExportableTypes[]) => string;
}