import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function attachTestRegistry(ctx: MarkupRenderContexts): void {
  ctx.links = [
    {
      _anonymousId: -10,
      dst: "index.md",
      id: 0,
      links: new Map(),
      name: "index",
      src: "/index.ts"
    }
  ];
  ctx.currentFile = ctx.links.at(0)!;
}
