import { expect, it } from "vitest";

import { createInterfaceEntity, createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { isAnchorNode, isParagraphNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeReferenceType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      type StringType = string;
      interface Interface {
        prop: string;
      }
      export type PrimitiveType = StringType;
      export type ObjectType = Interface;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const primitiveTypeSymbol = exportedSymbols.find(s => s.name === "PrimitiveType")!;
    const objectTypeSymbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const primitiveTypeAliasEntity = createTypeAliasEntity(compilerContext, primitiveTypeSymbol);
    const objectTypeAliasEntity = createTypeAliasEntity(compilerContext, objectTypeSymbol);

    const ctx = createRenderContext();
    ctx.renderer.initializeExportRegistry(ctx, [primitiveTypeAliasEntity, objectTypeAliasEntity]);

    const { children: convertedPrimitiveTypeReferenceType } = convertTypeForDocumentation(ctx, primitiveTypeAliasEntity.type as TypeReferenceType);
    const { children: convertedObjectTypeReferenceType } = convertTypeForDocumentation(ctx, objectTypeAliasEntity.type as TypeReferenceType);

    it("should render the referenced type, if the target symbol is not exported", () => {
      expect(convertedPrimitiveTypeReferenceType[0].children[0]).toBe("string");
      expect(convertedObjectTypeReferenceType[0].children[0]).toBe("object");
      expect(convertedObjectTypeReferenceType[0].children[1]).toBeDefined();
    });

  }

  {

    const testFileContent = ts`
      export type StringType = string;
      export interface Interface {
        prop: string;
      }
      export type PrimitiveType = StringType;
      export type ObjectType = Interface;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const stringTypeSymbol = exportedSymbols.find(s => s.name === "StringType")!;
    const interfaceSymbol = exportedSymbols.find(s => s.name === "Interface")!;
    const primitiveTypeSymbol = exportedSymbols.find(s => s.name === "PrimitiveType")!;
    const objectTypeSymbol = exportedSymbols.find(s => s.name === "ObjectType")!;

    const stringTypeAliasEntity = createTypeAliasEntity(compilerContext, stringTypeSymbol);
    const interfaceEntity = createInterfaceEntity(compilerContext, interfaceSymbol);
    const primitiveTypeAliasEntity = createTypeAliasEntity(compilerContext, primitiveTypeSymbol);
    const objectTypeAliasEntity = createTypeAliasEntity(compilerContext, objectTypeSymbol);

    const ctx = createRenderContext();

    ctx.renderer.initializeExportRegistry(ctx, [
      stringTypeAliasEntity,
      interfaceEntity,
      primitiveTypeAliasEntity,
      objectTypeAliasEntity
    ]);

    const { children: convertedPrimitiveTypeReferenceType } = convertTypeForDocumentation(ctx, primitiveTypeAliasEntity.type as TypeReferenceType);
    const { children: convertedObjectTypeReferenceType } = convertTypeForDocumentation(ctx, objectTypeAliasEntity.type as TypeReferenceType);

    assert(isParagraphNode(convertedPrimitiveTypeReferenceType[0]));
    assert(isParagraphNode(convertedObjectTypeReferenceType[0]));

    const primitiveParagraphNode = convertedPrimitiveTypeReferenceType[0];
    const objectParagraphNode = convertedObjectTypeReferenceType[0];

    assert(Array.isArray(primitiveParagraphNode.children[0]));
    assert(Array.isArray(objectParagraphNode.children[0]));

    assert(isAnchorNode(primitiveParagraphNode.children[0][0]));
    assert(isAnchorNode(objectParagraphNode.children[0][0]));

    const primitiveAnchorNode = primitiveParagraphNode.children[0][0];
    const objectAnchorNode = objectParagraphNode.children[0][0];

    it("should have the correct name", () => {
      expect(primitiveAnchorNode.name).toBe("StringType");
      expect(objectAnchorNode.name).toBe("Interface");
    });

    it("should link to the actual type", () => {
      expect(primitiveAnchorNode.id).toBe(stringTypeAliasEntity.symbolId);
      expect(objectAnchorNode.id).toBe(interfaceEntity.symbolId);
    });

    it("should not have type arguments", () => {
      expect(primitiveAnchorNode.children).toHaveLength(1);
    });

  }

});
