import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertTupleType } from "unwritten:renderer/markup/ast-converter/types/tuple.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TupleType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


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

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

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

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

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

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

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

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

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

    const convertedType = convertTupleType(ctx, type as TupleType);
    const renderedType = renderNode(ctx, convertedType);

    it("should be able to render union rest tuple type members", () => {
      expect(renderedType).to.equal("[string, ...(string | number)[]]");
    });

  }

});
