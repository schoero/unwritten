import { renderNode } from "unwritten:renderer:html/index.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ItalicNode } from "unwritten:renderer/markup/types-definitions/nodes.js";


export function renderItalicNode(ctx: HTMLRenderContext, italicNode: ItalicNode): string {
  const content = italicNode.children;
  return content === "" ? content : `<i>${renderNode(ctx, content)}</i>`;

}
