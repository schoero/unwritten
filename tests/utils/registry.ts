import type { LinkRegistry } from "unwritten:renderer/markup/registry/registry.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function createTestRegistry(ctx: MarkupRenderContexts): LinkRegistry {
  return [
    {
      dst: "index.md",
      id: 0,
      links: {},
      name: "index",
      src: "/index.ts"
    }
  ];
}
