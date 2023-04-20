import { expect, it } from "vitest";

import { createClassEntity, createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isParagraphNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("MarkupRenderer", EntityKind.Property, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        /**
         * Property description
         * @remarks Property remarks
         * @example Property example
         */
        readonly prop?: string;
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const propertyEntity = interfaceEntity.properties[0];
    const ctx = createRenderContext();

    const convertedPropertyForSignature = convertPropertyEntityForSignature(ctx, propertyEntity);
    const convertedPropertyForDocumentation = convertPropertyEntityForDocumentation(ctx, propertyEntity);

    const [
      tags,
      type,
      description,
      remarks,
      example
    ] = convertedPropertyForDocumentation.children;

    it("should have a matching name", () => {
      expect(convertedPropertyForSignature.children).to.equal("prop");
      expect(convertedPropertyForDocumentation.title).to.equal("prop");
    });

    it("should have a matching type", () => {
      expect(isParagraphNode(type)).to.equal(true);
      const renderedType = renderNode(ctx, type.children);
      expect(renderedType).to.equal("string");
    });

    it("should have an optional tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.contain("optional");
    });

    it("should have a readonly modifier tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.contain("readonly");
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Property description");
    });

    it("should have a matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Property remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Property example");
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        public publicProperty: undefined;
        private privateProperty: undefined;
        static staticProperty: undefined;
        readonly readonlyProperty: undefined;
        accessor accessorProperty: undefined;
        #nativePrivateProperty: undefined;
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedPropertiesForDocumentation = classEntity.properties.map(
      propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity)
    );

    const modifiers = convertedPropertiesForDocumentation.map(
      convertedPropertyForDocumentation =>
        convertedPropertyForDocumentation.children[0].children[1]
    );

    it("should render the public modifier", () => {
      expect(modifiers[0]).to.include("public");
    });

    it("should render the private modifier", () => {
      expect(modifiers[1]).to.include("private");
    });

    it("should render the static modifier", () => {
      expect(modifiers[2]).to.include("static");
    });

    it("should render the readonly modifier", () => {
      expect(modifiers[3]).to.include("readonly");
    });

    it("should render the accessor as get and set modifiers", () => {
      expect(modifiers[4]).to.include("get");
      expect(modifiers[4]).to.include("set");
    });

    it("should render the native private modifier", () => {
      expect(modifiers[5]).to.include("private");
    });

  }

});
