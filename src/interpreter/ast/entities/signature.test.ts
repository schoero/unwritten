import { expect, it } from "vitest";

import { createClassEntity, createFunctionEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import { createInterfaceEntity } from "./interface";


scope("Interpreter", "Signature", () => {

  {

    const testFileContent = ts`
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse a signature", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
      expect(exportedFunction.signatures).toBeDefined();
      expect(exportedFunction.signatures).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Function description
       * @example Function example
       */
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have one signature", () => {
      expect(exportedFunction.signatures).toHaveLength(1);
    });

    it("should have a matching kind", () => {
      expect(exportedFunction.signatures[0].kind).toBe(EntityKind.FunctionSignature);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0].description).toHaveLength(1);
      assert(isJSDocText(exportedFunction.signatures[0].description![0]));
      expect(exportedFunction.signatures[0].description![0].text).toBe("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0].example).toHaveLength(1);
      assert(isJSDocText(exportedFunction.signatures[0].example![0].content[0]));
      expect(exportedFunction.signatures[0].example![0].content[0].text).toBe("Function example");
    });

    it("should have a matching position", () => {
      expect(exportedFunction.signatures[0].position).toStrictEqual({
        column: 0,
        file: "/index.ts",
        line: 5
      });
    });

    it("should have a return type which is a boolean", () => {
      expect(exportedFunction.signatures[0].returnType.kind).toBe(TypeKind.Boolean);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(){}
      export interface InterfaceSymbol {
        (): void;
        new (): void;
        get getter(): void;
        methodSignature(): void;
        set setter(value: string);
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const functionSymbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const interfaceSymbol = exportedSymbols.find(s => s.name === "InterfaceSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, functionSymbol);
    const exportedInterface = createInterfaceEntity(ctx, interfaceSymbol);

    it("should be able to handle all kinds of signatures", () => {
      expect(exportedFunction.signatures).toHaveLength(1);
      expect(exportedInterface.callSignatures).toHaveLength(1);
      expect(exportedInterface.constructSignatures).toHaveLength(1);
      expect(exportedInterface.methodSignatures).toHaveLength(1);
      expect(exportedInterface.setterSignatures).toHaveLength(1);
      expect(exportedInterface.getterSignatures).toHaveLength(1);
    });

    it("should have a 'declarationId' for each signature", () => {
      expect(exportedFunction.signatures[0].declarationId).toBeDefined();
      expect(exportedInterface.callSignatures[0].declarationId).toBeDefined();
      expect(exportedInterface.constructSignatures[0].declarationId).toBeDefined();
      expect(exportedInterface.methodSignatures[0].declarationId).toBeDefined();
      expect(exportedInterface.setterSignatures[0].declarationId).toBeDefined();
      expect(exportedInterface.getterSignatures[0].declarationId).toBeDefined();
    });

    it("should have the correct kind for each signature", () => {
      expect(exportedFunction.signatures[0].kind).toBe(EntityKind.FunctionSignature);
      expect(exportedInterface.callSignatures[0].kind).toBe(EntityKind.CallSignature);
      expect(exportedInterface.constructSignatures[0].kind).toBe(EntityKind.ConstructSignature);
      expect(exportedInterface.methodSignatures[0].kind).toBe(EntityKind.MethodSignature);
      expect(exportedInterface.setterSignatures[0].kind).toBe(EntityKind.SetterSignature);
      expect(exportedInterface.getterSignatures[0].kind).toBe(EntityKind.GetterSignature);
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol<T>(value: T): T {
        return value;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to handle type parameters", () => {
      expect(exportedFunction.signatures[0].typeParameters).toHaveLength(1);
    });

    it("should link the function parameter to the type parameter", () => {
      assert(exportedFunction.signatures[0].parameters![0].type.kind === TypeKind.TypeReference);
      assert(exportedFunction.signatures[0].parameters![0].type.type?.kind === TypeKind.TypeParameter);
      expect(exportedFunction.signatures[0].parameters![0].type.target!).toEqual(exportedFunction.signatures[0].typeParameters![0]);
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        public publicMethod() {}
        private privateMethod() {}
        static staticMethod() {}
        private static privateStaticMethod() {}
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    const publicMethod = exportedClass.methods.find(m => m.name === "publicMethod")!;
    const privateMethod = exportedClass.methods.find(m => m.name === "privateMethod")!;
    const staticMethod = exportedClass.methods.find(m => m.name === "staticMethod")!;
    const privateStaticMethod = exportedClass.methods.find(m => m.name === "privateStaticMethod")!;

    it("should support modifiers", () => {
      expect(publicMethod.signatures.find(signature => signature.name === "publicMethod")!.modifiers).toContain("public");
      expect(privateMethod.signatures.find(signature => signature.name === "privateMethod")!.modifiers).toContain("private");
      expect(staticMethod.signatures.find(signature => signature.name === "staticMethod")!.modifiers).toContain("static");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).toContain("private");
      expect(privateStaticMethod.signatures.find(signature => signature.name === "privateStaticMethod")!.modifiers).toContain("static");
    });

  }

  {

    const testFileContent = ts`
      type Test = string;
      export function test(): Test {
        return "test";
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should return the declared type if available", () => {
      assert(exportedFunction.signatures[0].returnType.kind === TypeKind.TypeReference);
      expect(exportedFunction.signatures[0].returnType.name).toBe("Test");
    });

  }

});
