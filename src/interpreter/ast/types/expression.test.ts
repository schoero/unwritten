import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Expression, () => {

  {

    const testFileContent = ts`
      class Base {
      }
      export class Class extends Base {
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse expressions", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.name).toBe("Base");
    });

  }

  {

    const testFileContent = ts`
      export class Base<T> {
        prop: T;
      }
      export class Class extends Base<"Hello"> { }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support type arguments", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.typeArguments).toBeDefined();
      expect(exportedClass.heritage!.typeArguments).toHaveLength(1);
      expect(exportedClass.heritage!.typeArguments![0]!.kind).toBe(TypeKind.StringLiteral);
    });

    it("should resolve type parameters with the supplied type arguments", () => {
      expect(exportedClass.heritage).toBeDefined();
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).toBeDefined();
      expect(exportedClass.heritage!.instanceType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).toBe(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        public memberProp?: string;
      }

      class Base2 {
        static staticProp?: string;
      }

      function getBase() {
        return Math.random() > 0.5 ? Base2 : Base;
      }

      export class Class extends getBase() {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    // TypeScript doesn't support inferring from a union of classes yet
    it.fails("should be able to parse call expressions", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.kind).toBe(TypeKind.Expression);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Union);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Union);
      expect(exportedClass.heritage!.instanceType.types).toHaveLength(2);
      expect(exportedClass.heritage!.staticType.types).toHaveLength(2);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        prop?: string;
      }

      class Base2 {
        prop?: number;
      }

      interface Bases {
        prop?: string | number;
      }

      interface BasesConstructor {
        new (): Bases;
      }

      function getBase(): BasesConstructor {
        return Math.random() >= 0.5 ? Base : Base2;
      }

      export class Class extends getBase() {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse call expressions", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.kind).toBe(TypeKind.Expression);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Interface);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Interface);
      expect(exportedClass.heritage!.instanceType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.staticType.properties).toHaveLength(0);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).toBe(TypeKind.Union);
    });

  }

  {

    const testFileContent = ts`
      class Base<T> {
        prop: T;
      }
      function getBase() {
        return Base;
      }
      export class Class extends getBase()<"test"> {
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to resolve type parameters with the supplied type arguments via an expression", () => {
      expect(exportedClass.heritage).toBeDefined();
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).toBeDefined();
      expect(exportedClass.heritage!.instanceType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).toBe(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        static staticProp: string;
        public memberProp: string = "test";
      }
      function getBase() {
        return Base;
      }
      export class Class extends getBase() {
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should resolve static and member properties when extended via call expression", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.staticType).toBeDefined();
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.staticType.properties).toBeDefined();
      expect(exportedClass.heritage!.staticType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedClass.heritage!.staticType.properties[0].name).toBe("staticProp");

      expect(exportedClass.heritage!.instanceType).toBeDefined();
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).toBeDefined();
      expect(exportedClass.heritage!.instanceType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedClass.heritage!.instanceType.properties[0].name).toBe("memberProp");
    });

  }

  {

    const testFileContent = ts`
      class Base {
        static staticProp: string;
        public memberProp: string = "Test";
      }
      export class Class extends Base {
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should resolve static and member properties when extended directly", () => {
      expect(exportedClass.heritage).toBeDefined();
      expect(exportedClass.heritage!.staticType).toBeDefined();
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.staticType.properties).toBeDefined();
      expect(exportedClass.heritage!.staticType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedClass.heritage!.staticType.properties[0].name).toBe("staticProp");

      expect(exportedClass.heritage!.instanceType).toBeDefined();
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).toBeDefined();
      expect(exportedClass.heritage!.instanceType.properties).toHaveLength(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedClass.heritage!.instanceType.properties[0].name).toBe("memberProp");
    });

  }

});
