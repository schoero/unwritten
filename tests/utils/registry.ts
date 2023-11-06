import { MAX_ANONYMOUS_ID } from "unwritten:renderer/markup/registry/registry.js";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";


export function attachTestRegistry(ctx: MarkupRenderContexts): void {
  ctx.links = [
    {
      _anonymousId: MAX_ANONYMOUS_ID,
      dst: "index.md",
      id: 0,
      links: new Map(),
      name: "index",
      src: "/index.ts"
    }
  ];
  ctx.currentFile = ctx.links.at(0)!;
}
