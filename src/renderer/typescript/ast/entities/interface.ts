import { renderPropertyEntity, renderSignatureEntity } from "unwritten:renderer/typescript/ast/entities/index.js";
import { renderExpressionType } from "unwritten:renderer/typescript/ast/types/expression.js";
import { renderSemicolon } from "unwritten:renderer/typescript/utils/keywords.js";
import { renderIndentation } from "unwritten:renderer/utils/indentation.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { isSignatureEntity } from "unwritten:typeguards/entities.js";

import type { InterfaceEntity, PropertyEntity } from "unwritten:compiler:type-definitions/entities.js";
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

  const properties = extendPropertiesWithHeritage(interfaceEntity);
  const methodSignatures = extendSignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const getterSignatures = extendSignaturesWithHeritage(interfaceEntity, "getterSignatures");
  const setterSignatures = extendSignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const constructSignatures = extendSignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatures = extendSignaturesWithHeritage(interfaceEntity, "callSignatures");

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


function extendPropertiesWithHeritage(interfaceEntity: InterfaceEntity): PropertyEntity[] {

  const fromHeritages = interfaceEntity.heritage?.reduce<{ [key: string]: PropertyEntity; }>((result, heritage) => {
    if(heritage.instanceType.kind !== "InterfaceType"){
      return result;
    }
    heritage.instanceType.properties.forEach(
      property => {
        result[property.name] = property;
      }
    );
    return result;
  }, {});

  const properties = interfaceEntity.properties.reduce<{
    [key: string]: PropertyEntity;
  }>((result, property) => {
    result[property.name] = property;
    return result;
  }, {});

  return Object.values({
    ...fromHeritages,
    ...properties
  });

}


function extendSignaturesWithHeritage<Key extends "callSignatures" | "constructSignatures" | "getterSignatures" | "methodSignatures" | "setterSignatures">(interfaceEntity: InterfaceEntity, key: Key): InterfaceEntity[Key] {

  const map = {
    callSignatures: "callSignatures",
    constructSignatures: "constructSignatures",
    getterSignatures: "getters",
    methodSignatures: "methods",
    setterSignatures: "setters"
  } as const;

  const fromHeritages = interfaceEntity.heritage?.reduceRight<{
    [MapKey in keyof typeof map as string]: InterfaceEntity[MapKey];
  }>((result, heritage) => {
    if(heritage.instanceType.kind === "InterfaceType"){
      heritage.instanceType[map[key]].forEach(
        entity => {
          if(isSignatureEntity(entity)){
            result[entity.name ?? key] ??= [];
            result[entity.name ?? key].push(entity);
          } else {
            result[entity.name!] = entity.signatures;
          }
        }
      );
    }
    return result;
  }, {});

  const groupedSignatures = interfaceEntity[key].reduceRight<{
    [key: string]: InterfaceEntity[Key];
  }>((result, signatureEntity) => {
    result[signatureEntity.name ?? key] ??= [];
    result[signatureEntity.name ?? key].push(signatureEntity);
    return result;
  }, {});

  return Object.values({
    ...fromHeritages,
    ...groupedSignatures
  }).flat();

}
