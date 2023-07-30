import type { ID } from "unwritten:interpreter/type-definitions/shared.js";
import type { SourceRegistry } from "unwritten:renderer/markup/registry/registry.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function createTestRegistry(ctx: MarkupRenderContexts, registry?: Partial<SourceRegistry[number]>): SourceRegistry {
  return {
    0: {
      exports: new Set<ID>(),
      links: {},
      name: "index",
      src: "/index.ts",
      ...registry ?? {}
    }
  };
}
