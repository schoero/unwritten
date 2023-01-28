import { expect, it } from "vitest";

import { EntityKind } from "quickdoks:compiler/enums/entities.js";
import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderTupleType } from "./tuple.js";

import type { TupleType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.Tuple, () => {

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

    const ctx = createRenderContext();

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

    const ctx = createRenderContext();

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

    const ctx = createRenderContext();

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render optional tuple type members", () => {
      expect(renderedType).to.equal("[string, number?]");
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

    const ctx = createRenderContext();

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

    const ctx = createRenderContext();

    const renderedType = renderTupleType(ctx, type as TupleType);

    it("should be able to render union rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...(string | number)[]]");
    });

  }

});
