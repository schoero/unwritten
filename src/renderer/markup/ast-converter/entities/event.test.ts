import { expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  convertEventPropertyEntityForDocumentation,
  convertEventPropertyEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/event.js";
import {
  isAnchorNode,
  isPaddedNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", EntityKind.Property, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        /**
         * Event description
         * @remarks Event remarks
         * @example Event example
         * @eventProperty
         */
        event;
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const eventPropertyEntity = interfaceEntity.events[0];
    const ctx = createRenderContext();

    const convertedEventPropertyForSignature = convertEventPropertyEntityForTableOfContents(ctx, eventPropertyEntity);
    const convertedEventPropertyForDocumentation = convertEventPropertyEntityForDocumentation(ctx, eventPropertyEntity);

    const [
      position,
      description,
      remarks,
      example
    ] = convertedEventPropertyForDocumentation.children;

    it("should have a position", () => {
      assert(isPaddedNode(position));
      assert(isSmallNode(position.children[0]));
      expect(position.children[0].children).toBeDefined();
    });

    it("should have a matching name", () => {
      assert(isAnchorNode(convertedEventPropertyForSignature));
      expect(convertedEventPropertyForSignature.children[0]).toBe("event");
      expect(convertedEventPropertyForDocumentation.title).toBe("event");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Event description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Event remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Event example");
    });

  }

});
