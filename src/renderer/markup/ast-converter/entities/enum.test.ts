import { expect, it } from "vitest";

import { createEnumEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { isParagraphNode, isSectionNode, isTitleNode } from "unwritten:renderer:markup/typeguards/renderer";
import { renderNode } from "unwritten:renderer/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { EnumEntity } from "unwritten:interpreter:type-definitions/entities";


scope("MarkupRenderer", EntityKind.Enum, () => {

  {

    const testFileContent = ts`
      /**
       * Enum description
       *
       * @remarks Enum remarks
       * @example Enum example
       * @deprecated
       * @beta
       */
      export enum Enum {
        /**
         * A description
         *
         * @beta
         */
        A,
        B,
        C
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const enumEntity = createEnumEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedEnumEntityForTableOfContents = convertEnumEntityForTableOfContents(ctx, enumEntity as EnumEntity);
    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity as EnumEntity);

    const titleNode = convertedEnumEntityForDocumentation.title;

    assert(isSectionNode(convertedEnumEntityForDocumentation));
    assert(isTitleNode(titleNode));


    const [
      tags,
      position,
      description,
      remarks,
      example,
      see,
      members
    ] = titleNode.children;

    it("should have a matching name", () => {
      expect(convertedEnumEntityForTableOfContents.children[0]).toBe("Enum");
      expect(titleNode.title).toBe("Enum");
    });

    it("should have a position", () => {
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
    });

    it("should have matching tags", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).toContain("beta");
      expect(renderedTags).toContain("deprecated");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Enum description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Enum remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Enum example");
    });

    it("should have matching members", () => {
      expect(members.children[0]).toStrictEqual(["A", " ", "0", " ", "A description"]);
      expect(members.children[1]).toStrictEqual(["B", " ", "1"]);
      expect(members.children[2]).toStrictEqual(["C", " ", "2"]);
    });

  }

  {

    const testFileContent = ts`
      export enum Enum {
        A = "A",
        B = "B",
        C = "C"
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const enumEntity = createEnumEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity);

    const titleNode = convertedEnumEntityForDocumentation.title;

    assert(isSectionNode(convertedEnumEntityForDocumentation));
    assert(isTitleNode(titleNode));

    const [
      position,
      tags,
      description,
      remarks,
      example,
      see,
      members
    ] = titleNode.children;

    it("should have string literal enumerated members", () => {
      expect(members.children[0]).toStrictEqual(["A", " ", ['"', "A", '"']]);
      expect(members.children[1]).toStrictEqual(["B", " ", ['"', "B", '"']]);
      expect(members.children[2]).toStrictEqual(["C", " ", ['"', "C", '"']]);
    });

  }

});
