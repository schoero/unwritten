import { expect, it } from "vitest";

import { createEnumEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isParagraphNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";
import { assert } from "unwritten:utils/general.js";

import type { EnumEntity } from "unwritten:interpreter:type-definitions/entities.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const enumEntity = createEnumEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedEnumEntityForTableOfContents = convertEnumEntityForTableOfContents(ctx, enumEntity as EnumEntity);
    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity as EnumEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      members
    ] = convertedEnumEntityForDocumentation.children;

    it("should have a matching name", () => {
      expect(convertedEnumEntityForTableOfContents.children[0]).to.equal("Enum");
      expect(convertedEnumEntityForDocumentation.title).to.equal("Enum");
    });

    it("should have a position", () => {
      expect(position).to.not.equal("");
    });

    it("should have matching tags", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).to.include("beta");
      expect(tags.children).to.include("deprecated");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).to.equal("Enum description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).to.equal("Enum remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).to.equal("Enum example");
    });

    it("should have matching members", () => {
      expect(members.children[0]).to.deep.equal(["A", "0", "A description"]);
      expect(members.children[1]).to.deep.equal(["B", "1", ""]);
      expect(members.children[2]).to.deep.equal(["C", "2", ""]);
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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const enumEntity = createEnumEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      members
    ] = convertedEnumEntityForDocumentation.children;

    it("should have string literal enumerated members", () => {
      expect(members.children[0]).to.deep.equal(["A", ['"', "A", '"'], ""]);
      expect(members.children[1]).to.deep.equal(["B", ['"', "B", '"'], ""]);
      expect(members.children[2]).to.deep.equal(["C", ['"', "C", '"'], ""]);
    });

  }

});
