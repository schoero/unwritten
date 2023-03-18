import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderTupleType } from "unwritten:renderer/typescript/ast/types/tuple.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TupleType } from "unwritten:interpreter/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Tuple, () => {

  {

    // #region simple tuple type

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render tuple types", () => {
      expect(renderedType).to.equal("[string, number]");
    });

  }

  {

    // #region simple tuple type

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          name: "first",
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          name: "second",
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render tuple type members with labels", () => {
      expect(renderedType).to.equal("[first: string, second: number]");
    });

  }

  {

    // #region tuple type with optional members

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          optional: true,
          rest: false,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render optional tuple type members", () => {
      expect(renderedType).to.equal("[string, number?]");
    });

  }

  {

    // #region tuple type with optional members and labels

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          name: "first",
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          name: "second",
          optional: true,
          rest: false,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render optional tuple type members", () => {
      expect(renderedType).to.equal("[first: string, second?: number]");
    });

  }

  {

    // #region tuple type with rest members

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          name: undefined,
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          name: undefined,
          optional: false,
          rest: true,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...number[]]");
    });

  }

  {

    // #region tuple type with union rest members

    const type: Testable<TupleType> = {
      kind: TypeKind.Tuple,
      members: [
        {
          kind: EntityKind.TupleMember,
          name: undefined,
          optional: false,
          rest: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          kind: EntityKind.TupleMember,
          name: undefined,
          optional: false,
          rest: true,
          type: {
            kind: TypeKind.Union,
            types: [
              {
                kind: TypeKind.String,
                name: "string"
              },
              {
                kind: TypeKind.Number,
                name: "number"
              }
            ]
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render union rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...(string | number)[]]");
    });

  }

});
