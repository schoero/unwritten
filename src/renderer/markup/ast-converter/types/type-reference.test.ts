/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import {
  createInterfaceEntity,
  createSourceFileEntity,
  createTypeAliasEntity
} from "unwritten:interpreter/ast/entities/index.js";
import { interpret } from "unwritten:interpreter/ast/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { isAnchorNode, isParagraphNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isVariableEntity } from "unwritten:typeguards/entities.js";
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

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

    const primitiveTypeSymbol = exportedSymbols.find(s => s.name === "PrimitiveType")!;
    const objectTypeSymbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const primitiveTypeAliasEntity = createTypeAliasEntity(compilerContext, primitiveTypeSymbol);
    const objectTypeAliasEntity = createTypeAliasEntity(compilerContext, objectTypeSymbol);

    const sourceFileEntities = fileSymbols.map(fileSymbol => {
      return createSourceFileEntity(compilerContext, fileSymbol);
    });

    const ctx = createRenderContext();
    ctx.renderer.initializeRegistry(ctx, sourceFileEntities);

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

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

    const stringTypeSymbol = exportedSymbols.find(s => s.name === "StringType")!;
    const interfaceSymbol = exportedSymbols.find(s => s.name === "Interface")!;
    const primitiveTypeSymbol = exportedSymbols.find(s => s.name === "PrimitiveType")!;
    const objectTypeSymbol = exportedSymbols.find(s => s.name === "ObjectType")!;

    const stringTypeAliasEntity = createTypeAliasEntity(compilerContext, stringTypeSymbol);
    const interfaceEntity = createInterfaceEntity(compilerContext, interfaceSymbol);
    const primitiveTypeAliasEntity = createTypeAliasEntity(compilerContext, primitiveTypeSymbol);
    const objectTypeAliasEntity = createTypeAliasEntity(compilerContext, objectTypeSymbol);


    const sourceFileEntities = fileSymbols.map(fileSymbol => {
      return createSourceFileEntity(compilerContext, fileSymbol);
    });

    const ctx = createRenderContext();
    ctx.renderer.initializeRegistry(ctx, sourceFileEntities);

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

  {

    const typesModule = ts`
      export interface Test {
        a: string;
      }
    `;

    const indexModule = ts`
      import { Test } from "./types";
      export const test: Test = {
        a: "test"
      }
    `;

    const { ctx: compilerContext, fileSymbols } = compile({
      "/index.ts": indexModule,
      "/types.ts": typesModule
    });

    const sourceFileEntities = interpret(compilerContext, fileSymbols);

    const ctx = createRenderContext(BuiltInRenderers.Markdown);


    const interpretedIndexFile = sourceFileEntities.find(entity => entity.name === "index.ts");
    const interpretedTypesFile = sourceFileEntities.find(entity => entity.name === "types.ts");

    const interpretedVariableEntity = interpretedIndexFile?.exports.find(isVariableEntity);
    const interpretedInterfaceEntity = interpretedTypesFile?.exports.find(entity => entity.name === "Test");

    it("should create a type reference to the symbol in the other file", () => {
      assert(interpretedVariableEntity);
      assert(interpretedVariableEntity.type.kind === TypeKind.TypeReference);
      assert(interpretedVariableEntity.type.target?.kind === EntityKind.Interface);
      expect(interpretedVariableEntity.type.target.symbolId).toBe(interpretedInterfaceEntity?.symbolId);
      expect(interpretedVariableEntity.type.target.position?.file).toBe(interpretedTypesFile?.path);
    });

  }

});
