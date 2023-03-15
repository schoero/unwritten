import { renderPropertyEntity, renderSignatureEntity } from "unwritten:renderer/typescript/ast/entities/index.js";
import { renderExpressionType } from "unwritten:renderer/typescript/ast/types/expression.js";
import { renderSemicolon } from "unwritten:renderer/typescript/utils/keywords.js";
import {
  extendInterfacePropertiesWithHeritage,
  extendInterfaceSignaturesWithHeritage
} from "unwritten:renderer/utils/heritage.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderInterfaceEntity(ctx: TypeScriptRenderContext, interfaceEntity: InterfaceEntity): string {

  const renderedSemicolon = renderSemicolon(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const renderedName = interfaceEntity.name;
  const renderedHeritages = interfaceEntity.heritage?.map(
    heritage =>
      renderExpressionType(ctx, heritage)
  );

  const renderedHeritage = renderedHeritages && renderedHeritages.length > 0
    ? ` extends ${renderedHeritages.join(", ")}`
    : "";

  const properties = extendInterfacePropertiesWithHeritage(interfaceEntity);
  const methodSignatures = extendInterfaceSignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const getterSignatures = extendInterfaceSignaturesWithHeritage(interfaceEntity, "getterSignatures");
  const setterSignatures = extendInterfaceSignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const constructSignatures = extendInterfaceSignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatures = extendInterfaceSignaturesWithHeritage(interfaceEntity, "callSignatures");

  const renderedHeader = `${renderIndentation(ctx)}interface ${renderedName}${renderedHeritage} {`;
  ctx.indentation++;

  const renderedConstructSignatures = constructSignatures.map(
    constructSignature =>
      `${renderIndentation(ctx)}new ${renderSignatureEntity(ctx, constructSignature)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedCallSignatures = callSignatures.map(
    callSignature =>
      `${renderIndentation(ctx)}${renderSignatureEntity(ctx, callSignature)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedMethodSignatures = methodSignatures.map(
    methodSignature =>
      `${renderIndentation(ctx)}${renderSignatureEntity(ctx, methodSignature)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedProperties = properties.map(
    property =>
      `${renderIndentation(ctx)}${renderPropertyEntity(ctx, property)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedGetters = getterSignatures.map(
    getterSignature =>
      `${renderIndentation(ctx)}${renderSignatureEntity(ctx, getterSignature)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedSetters = setterSignatures.map(
    setterSignature =>
      `${renderIndentation(ctx)}${renderSignatureEntity(ctx, setterSignature)}${renderedSemicolon}`
  ).join(renderedNewLine);

  const renderedBody = [
    renderedConstructSignatures,
    renderedCallSignatures,
    renderedProperties,
    renderedMethodSignatures,
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
