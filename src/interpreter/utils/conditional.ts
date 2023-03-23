import * as ts from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


function getMappedTypeResolvedType(ctx: InterpreterContext, mappedType: ts.MappedTypeNode): ts.Type {
  const extendsType = mappedType.typeParameter.constraint;
  const trueType = ctx.checker.getTypeFromTypeNode(mappedType.trueType);
  const falseType = ctx.checker.getTypeFromTypeNode(mappedType.falseType);

  const trueConstraint = ctx.checker.getTypeAtLocation(ts.createTypeReferenceNode("true"));
  const falseConstraint = ctx.checker.getTypeAtLocation(ts.createTypeReferenceNode("false"));

  const trueCondition = ctx.checker.getTypePredicateOfConditionalType(trueType);
  const falseCondition = ctx.checker.getTypePredicateOfConditionalType(falseType);

  const trueBranchType = trueCondition?.kind === ts.TypePredicateKind.Boolean && trueCondition?.type === trueConstraint
    ? extendsType
    : trueType;

  const falseBranchType = falseCondition?.kind === ts.TypePredicateKind.Boolean && falseCondition?.type === falseConstraint
    ? extendsType
    : falseType;

  return ctx.checker.getUnionType([trueBranchType, falseBranchType]);
}
