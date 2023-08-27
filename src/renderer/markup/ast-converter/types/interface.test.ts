import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertInterfaceTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    const testFileContent = ts`
      interface Interface {
        (): void;
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string): void;
        /**
         * Event description
         * @eventProperty
         */
        event: string;
      }
      export type Type = Interface;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    assert(isTypeReferenceType(typeAliasEntity.type));

    const type = typeAliasEntity.type.type;
    const ctx = createRenderContext();

    const convertedType = convertInterfaceTypeMultiline(ctx, type as InterfaceType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters,
      events
    ] = convertedType.children;

    it("should have a matching construct signature", () => {
      expect(constructSignatures.children).toHaveLength(1);
      expect(renderNode(ctx, constructSignatures.children[0])).toContain("new ()");
    });

    it("should have a matching call signature", () => {
      expect(callSignatures.children).toHaveLength(1);
      expect(renderNode(ctx, callSignatures.children[0])).toContain("()");
    });

    it("should have a matching properties with matching modifiers", () => {
      expect(properties.children).toHaveLength(2);
      expect(renderNode(ctx, properties.children[0])).toContain("prop");
      expect(renderNode(ctx, properties.children[1])).toContain("funcProp");
      expect(renderNode(ctx, properties.children[1])).toContain("function");
    });

    it("should have a matching method with an overload", () => {
      expect(methods.children).toHaveLength(2);
      expect(renderNode(ctx, methods.children[0])).toContain("method(a)");
      expect(renderNode(ctx, methods.children[0])).toContain("number");
      expect(renderNode(ctx, methods.children[1])).toContain("method(a)");
      expect(renderNode(ctx, methods.children[1])).toContain("string");
    });

    it("should have a matching setter", () => {
      expect(setters.children).toHaveLength(1);
      expect(renderNode(ctx, setters.children[0])).toContain("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(getters.children).toHaveLength(1);
      expect(renderNode(ctx, getters.children[0])).toContain("getter");
    });

    it("should have a matching event", () => {
      expect(events.children).toHaveLength(1);
      expect(renderNode(ctx, events.children[0])).toContain("event");
    });

  }

});
