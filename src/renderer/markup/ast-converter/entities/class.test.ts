import { expect, it } from "vitest";

import { createClassEntity, createSourceFileEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { isAnchorNode, isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
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
        public prop: string;
        public method() {}
        public get getter(): string { return ""; }
        public set setter(value: string) {}
        static staticProp: string;
        protected protectedProp: string;
      }
    `;

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);

    const sourceFileEntities = fileSymbols.map(
      fileSymbol => createSourceFileEntity(compilerContext, fileSymbol)
    );

    const ctx = createRenderContext();
    ctx.renderer.initializeRegistry(ctx, sourceFileEntities);
    ctx.currentFile = sourceFileEntities[0].symbolId;

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

    it("should have a matching title", () => {
      assert(isAnchorNode(convertedClassForTableOfContents[0]));
      expect(convertedClassForTableOfContents[0].name).toBe("Class");
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
      expect(properties.children).toHaveLength(3);
    });

    it("should support all possible modifiers", () => {
      expect(renderNode(ctx, properties.children[0].children[0])).toContain("public");
      expect(renderNode(ctx, properties.children[1].children[0])).toContain("static");
      expect(renderNode(ctx, properties.children[2].children[0])).toContain("protected");
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

  {

    const testFileContent = ts`
      class BaseClass {
      }
      export class Class extends BaseClass {
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);

    const ctx = createRenderContext();

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

    it("should not render implicit constructors", () => {
      expect(constructSignatures.children).toHaveLength(0);
    });

  }

});
