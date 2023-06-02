import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {
        constructor() {}
        public property: number = 1;
        public method() {}
        public get getter(): string { return ""; }
        public set setter(value: string) {}
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    const convertedClassForTableOfContents = convertClassEntityForTableOfContents(ctx, classEntity);
    const convertedClassForDocumentation = convertClassEntityForDocumentation(ctx, classEntity);

    const titleNode = convertedClassForDocumentation.children[0];

    const [
      position,
      tags,
      description,
      remarks,
      example,
      constructSignatures,
      properties,
      methods,
      setters,
      getters
    ] = titleNode.children;

    it("should have matching class name", () => {
      expect(convertedClassForTableOfContents.title).toBe("Class");
      expect(titleNode.title).toBe("Class");
    });

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children[0]).not.toBe("");
    });

    it("should have no tags", () => {
      expect(tags).toBe("");
    });

    it("should have one construct signature", () => {
      expect(constructSignatures.children).toHaveLength(1);
    });

    it("should have two properties", () => {
      expect(properties.children).toHaveLength(1);
    });

    it("should have one method signature", () => {
      expect(methods.children).toHaveLength(1);
    });

    it("should have one setter signature", () => {
      expect(setters.children).toHaveLength(1);
    });

    it("should have one getter signature", () => {
      expect(getters.children).toHaveLength(1);
    });

  }

});
