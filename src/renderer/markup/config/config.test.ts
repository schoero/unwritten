import { describe, expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertClassEntityForDocumentation } from "unwritten:renderer:markup/ast-converter/entities/index";
import {
  convertStringLiteralTypeInline,
  convertStringTypeInline
} from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";

import type { StringLiteralType, StringType } from "unwritten:interpreter:type-definitions/types";
import type { Testable } from "unwritten:type-definitions/utils";


scope("Renderer", "Config", () => {

  describe("typeEncapsulation", async () => {

    const stringType: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    const ctx = createRenderContext();

    {

      const convertedStringType = convertStringTypeInline(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).toBe("string");
      });

    }

    {

      ctx.config.renderConfig.html.typeEncapsulation = ["`", "`"];

      const convertedStringType = convertStringTypeInline(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should be possible to change the encapsulation", () => {
        expect(renderedStringType).toBe("`string`");
      });

    }

  });


  describe("stringLiteralTypeEncapsulation", async () => {

    const stringLiteralType: Testable<StringLiteralType> = {
      kind: TypeKind.StringLiteral,
      name: "string",
      value: "test"
    };

    const ctx = createRenderContext();

    ctx.config.renderConfig.html.stringLiteralEncapsulation = false;

    {

      const convertedStringType = convertStringLiteralTypeInline(ctx, stringLiteralType as StringLiteralType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).toBe("test");
      });

    }

    {

      ctx.config.renderConfig.html.typeEncapsulation = ["`", "`"];
      ctx.config.renderConfig.html.stringLiteralEncapsulation = ['"', '"'];

      const convertedStringType = convertStringLiteralTypeInline(ctx, stringLiteralType as StringLiteralType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should be possible to change the encapsulation", () => {
        expect(renderedStringType).toBe('`"test"`');
      });

    }

  });

  describe("externalTypes", async () => {

    const stringType: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    const ctx = createRenderContext();

    ctx.config.externalTypes = {
      [TypeKind.String]: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean"
    };

    {

      const convertedStringType = convertStringTypeInline(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).toBe(`<a href="${ctx.config.externalTypes[TypeKind.String]}">string</a>`);
      });

    }

  });

  describe("renderPrivateMembers", async () => {

    {

      const testFileContent = ts`
        export class Class {
          private constructor() {}
          private property: number = 1;
          private method(): void {}
        }
      `;

      const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "Class")!;
      const classEntity = createClassEntity(compilerContext, symbol);

      const ctx = createRenderContext();

      {
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

        it("should not have any private members when disabled", () => {
          expect(constructSignatures).toBeFalsy();
          expect(properties).toBeFalsy();
          expect(methods).toBeFalsy();
        });

      }

      ctx.config.renderConfig.html.renderPrivateMembers = true;

      {
        const convertedClassForDocumentation = convertClassEntityForDocumentation(ctx, classEntity);

        const titleNode = convertedClassForDocumentation.children[0];

        const [
          position,
          tags,
          description,
          remarks,
          example,
          see,
          constructSignatures,
          properties,
          methods,
          setters,
          getters
        ] = titleNode.children;

        it("should have private members when enabled", () => {
          expect(constructSignatures && constructSignatures.children).toHaveLength(1);
          expect(properties && properties.children.flat()).toHaveLength(1);
          expect(methods && methods.children.flat()).toHaveLength(1);
        });

      }

    }

  });

});
