import { expect, it } from "vitest";

import {
  createClassEntity,
  createInterfaceEntity,
  createVariableEntity
} from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertObjectLiteralTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isAnchorNode,
  isPaddedNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { ObjectLiteralType } from "unwritten:interpreter/type-definitions/types.js";


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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const propertyEntity = interfaceEntity.properties[0];
    const ctx = createRenderContext();

    const convertedPropertyForSignature = convertPropertyEntityForTableOfContents(ctx, propertyEntity);
    const convertedPropertyForDocumentation = convertPropertyEntityForDocumentation(ctx, propertyEntity);

    const [
      tags,
      position,
      type,
      description,
      remarks,
      example
    ] = convertedPropertyForDocumentation.children;

    it("should have a matching name", () => {
      assert(isAnchorNode(convertedPropertyForSignature));
      expect(convertedPropertyForSignature.children[0]).toBe("prop");
      expect(convertedPropertyForDocumentation.title).toBe("prop");
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      assert(isParagraphNode(type.children[0]));
      expect(type.children[0].children[0]).toBe("string");
    });

    it("should have a position", () => {
      assert(isPaddedNode(position));
      assert(isSmallNode(position.children[0]));
      expect(position.children[0].children).toBeDefined();
    });

    it("should have an optional tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).toContain("optional");
    });

    it("should have a readonly modifier tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).toContain("readonly");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Property description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Property remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Property example");
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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedPropertiesForDocumentation = classEntity.properties.map(
      propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity)
    );

    const modifiers = convertedPropertiesForDocumentation.map(
      convertedPropertyForDocumentation => {
        if(convertedPropertyForDocumentation.children[0]){
          return renderNode(ctx, convertedPropertyForDocumentation.children[0].children);
        } else {
          return "";
        }
      }
    );

    it("should render the public modifier", () => {
      expect(modifiers[0]).toContain("public");
    });

    it("should render the private modifier", () => {
      expect(modifiers[1]).toContain("private");
    });

    it("should render the static modifier", () => {
      expect(modifiers[2]).toContain("static");
    });

    it("should render the readonly modifier", () => {
      expect(modifiers[3]).toContain("readonly");
    });

    it("should render the accessor as get and set modifiers", () => {
      expect(modifiers[4]).toContain("get");
      expect(modifiers[4]).toContain("set");
    });

    it("should render the native private modifier", () => {
      expect(modifiers[5]).toContain("private");
    });

  }

  {

    const testFileContent = ts`
      export const obj = {
        /** Property description */
        property: 7,
        /** Method description */
        method() {},
        /** Function property description */
        functionProperty: () => {},
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "obj")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectLiteralTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should render the property name, type and description", () => {
      expect(properties.children[0].children[0]).toContain("property");
      expect(properties.children[0].children[0]).toContain("number");
      expect(properties.children[0].children[0]).toContain("Property description");

      expect(properties.children[1].children[0]).toContain("functionProperty");
      expect(properties.children[1].children[0]).toContain("function");
      expect(properties.children[1].children[0]).toContain("Function property description");
    });

  }

});
