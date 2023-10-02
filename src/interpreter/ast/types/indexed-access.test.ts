import { describe, expect, it } from "vitest";

import { interpret } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isTypeAliasEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.IndexedAccess, () => {

  describe("referencing a property in an interface", () => {

    const testFileContent = ts`
      interface Interface {
        prop: string;
      }
      export type IndexedAccess = Interface["prop"];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should have a matching object type", () => {
      assert(indexedAccessType.objectType.kind === TypeKind.TypeReference);
      assert(indexedAccessType.objectType.type?.kind === TypeKind.Interface);
      expect(indexedAccessType.objectType.type.properties).toHaveLength(1);
      expect(indexedAccessType.objectType.type.properties[0].name).toBe("prop");
    });

    it("should have a matching index type", () => {
      expect(indexedAccessType.indexType.kind).toBe(TypeKind.StringLiteral);
    });

    it("should return the type of the property", () => {
      expect(indexedAccessType.type?.kind).toBe(TypeKind.String);
    });

  });

  describe("referencing a property in an anonymous type literal", () => {

    const testFileContent = ts`
      export type IndexedAccess = {
        prop: string;
      }["prop"];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should have a matching object type", () => {
      assert(indexedAccessType.objectType.kind === TypeKind.TypeLiteral);
      expect(indexedAccessType.objectType.properties).toHaveLength(1);
      expect(indexedAccessType.objectType.properties[0].name).toBe("prop");
    });

    it("should have a matching index type", () => {
      expect(indexedAccessType.indexType.kind).toBe(TypeKind.StringLiteral);
    });

    it("should return the type of the property", () => {
      expect(indexedAccessType.type?.kind).toBe(TypeKind.String);
    });

  });

  describe("referencing a property that references another type", () => {

    const testFileContent = ts`
      type Test = string
      interface Interface {
        prop: Test;
      }
      export type IndexedAccess = Interface["prop"];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should return the a type reference", () => {
      assert(indexedAccessType.type?.kind === TypeKind.TypeReference);
      expect(indexedAccessType.type.type?.kind).toBe(TypeKind.String);
    });

  });

  describe("referencing a property that references a type parameter", () => {

    const testFileContent = ts`
      interface Interface<T> {
        prop: T;
      }
      export type IndexedAccess = Interface<string>["prop"];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should return the a type reference", () => {
      assert(indexedAccessType.type?.kind === TypeKind.TypeReference);
      expect(indexedAccessType.type.type?.kind).toBe(TypeKind.String);
    });

  });

  describe("using an union type of string literals as an index type", () => {

    const testFileContent = ts`
      interface Interface {
        prop1: "prop1";
        prop2: "prop2";
      }
      export type IndexedAccess = Interface["prop1" | "prop2"];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should return the a type reference", () => {
      assert(indexedAccessType.type?.kind === TypeKind.Union);
      expect(indexedAccessType.type.types[0]?.kind).toBe(TypeKind.StringLiteral);
      expect(indexedAccessType.type.types[1]?.kind).toBe(TypeKind.StringLiteral);
    });

  });

  describe("using a type reference to an union type of string literals as an index type", () => {

    const testFileContent = ts`
      type IndexType = "prop1" | "prop2";
      interface Interface {
        prop1: "prop1";
        prop2: "prop2";
      }
      export type IndexedAccess = Interface[IndexType];
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const sourceFileEntities = interpret(ctx, fileSymbols);
    const indexedAccessTypeAlias = sourceFileEntities[0].exports.find(s => s.name === "IndexedAccess")!;

    assert(isTypeAliasEntity(indexedAccessTypeAlias));

    const indexedAccessType = indexedAccessTypeAlias.type;

    assert(indexedAccessType.kind === TypeKind.IndexedAccess);

    it("should return the a type reference", () => {
      assert(indexedAccessType.type?.kind === TypeKind.Union);
      expect(indexedAccessType.type.types[0]?.kind).toBe(TypeKind.StringLiteral);
      expect(indexedAccessType.type.types[1]?.kind).toBe(TypeKind.StringLiteral);
    });

  });

});
