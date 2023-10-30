import { expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { renderNode } from "unwritten:renderer/index";
import {
  convertEventPropertyEntityForDocumentation,
  convertEventPropertyEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/event";
import { isAnchorNode, isTitleNode } from "unwritten:renderer:markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


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
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
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
