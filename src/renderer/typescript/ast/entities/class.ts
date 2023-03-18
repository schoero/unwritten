import { renderPropertyEntity, renderSignatureEntity } from "unwritten:renderer:typescript/ast/entities/index.js";
import { renderExpressionType } from "unwritten:renderer:typescript/ast/types/expression.js";
import { renderSemicolon } from "unwritten:renderer:typescript/utils/keywords.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage
} from "unwritten:renderer:utils/heritage.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";

import type { ClassEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderClassEntity(ctx: TypeScriptRenderContext, classEntity: ClassEntity): string {

  const renderedSemicolon = renderSemicolon(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const renderedName = classEntity.name;
  const renderedHeritage = classEntity.heritage
    ? ` extends ${renderExpressionType(ctx, classEntity.heritage)}`
    : "";

  const properties = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const methods = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const getters = extendClassEntityEntitiesWithHeritage(classEntity, "getters");
  const setters = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const constructors = extendClassEntityConstructorsWithHeritage(classEntity);

  const renderedHeader = `${renderIndentation(ctx)}class ${renderedName}${renderedHeritage} {`;
  ctx.indentation++;

  const renderedConstructor = constructors
    ? constructors.signatures.map(
      constructSignature =>
        `${renderIndentation(ctx)}${renderSignatureEntity(ctx, constructSignature)}${renderedSemicolon}`
    ).join(renderedNewLine)
    : "";

  const renderedMethods = methods.map(
    method =>
      method.signatures.map(
        methodSignature =>
          `${renderIndentation(ctx)}${renderSignatureEntity(ctx, methodSignature)}${renderedSemicolon}`
      ).join(renderedNewLine)
  ).join(`${renderedNewLine}${renderedNewLine}`);

  const renderedProperties = properties.map(
    property =>
      `${renderIndentation(ctx)}${renderPropertyEntity(ctx, property)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedGetters = getters.map(
    getter =>
      getter.signatures.map(
        getterSignature =>
          `${renderIndentation(ctx)}${renderSignatureEntity(ctx, getterSignature)}${renderedSemicolon}`
      ).join(renderedNewLine)
  ).join(`${renderedNewLine}${renderedNewLine}`);

  const renderedSetters = setters.map(
    setter =>
      setter.signatures.map(
        setterSignature =>
          `${renderIndentation(ctx)}${renderSignatureEntity(ctx, setterSignature)}${renderedSemicolon}`
      ).join(renderedNewLine)
  ).join(`${renderedNewLine}${renderedNewLine}`);

  const renderedBody = [
    renderedConstructor,
    renderedProperties,
    renderedMethods,
    renderedGetters,
    renderedSetters
  ].filter(content => content !== "");

  ctx.indentation--;

  const renderedFooter = `${renderIndentation(ctx)}}`;

  return [
    renderedHeader,
    ...renderedBody,
    renderedFooter
  ].join(renderedNewLine);

}
