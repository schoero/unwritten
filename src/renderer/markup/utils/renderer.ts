import { EntityKind } from "unwritten:interpreter/enums/entity";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { ExportableEntity, ExportableEntityKinds } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { Encapsulation } from "unwritten:renderer:markup/types-definitions/config";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function encapsulate(node: ASTNode, encapsulation: Encapsulation | string[] | false | undefined) {

  if(encapsulation === undefined || encapsulation === false){
    return node;
  }

  return [
    encapsulation[0],
    node,
    encapsulation[1]
  ];

}

export function getCategoryNameTranslationKey(entityKind: ExportableEntityKinds) {
  switch (entityKind){
    case EntityKind.Class:
      return "class";
    case EntityKind.Enum:
      return "enum";
    case EntityKind.Function:
      return "function";
    case EntityKind.Interface:
      return "interface";
    case EntityKind.Module:
      return "module";
    case EntityKind.Namespace:
      return "namespace";
    case EntityKind.TypeAlias:
      return "typeAlias";
    case EntityKind.Variable:
      return "variable";
    case EntityKind.ExportAssignment:
      return "exportAssignment";
  }
}

export function isRenderEntityPrefixEnabled(ctx: MarkupRenderContext, target: "documentation" | "tableOfContents"): boolean {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.renderEntityPrefixes === true || renderConfig.renderEntityPrefixes === target;
}

export function isRenderObjectMemberTitlesEnabled(ctx: MarkupRenderContext, target: "documentation" | "tableOfContents"): boolean {
  const renderConfig = getRenderConfig(ctx);
  return renderConfig.renderClassMemberTitles === true || renderConfig.renderClassMemberTitles === target;
}

export function minMax(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getEntityPrefixTranslationKey(entityKind: EntityKind) {
  switch (entityKind){
    case EntityKind.Class:
      return "class";
    case EntityKind.Enum:
      return "enum";
    case EntityKind.Function:
      return "function";
    case EntityKind.Interface:
      return "interface";
    case EntityKind.Module:
      return "module";
    case EntityKind.Namespace:
      return "namespace";
    case EntityKind.TypeAlias:
      return "typeAlias";
    case EntityKind.Variable:
      return "variable";
    case EntityKind.ExportAssignment:
      return "exportAssignment";
    case EntityKind.Method:
      return "method";
    case EntityKind.Property:
      return "property";
    case EntityKind.Getter:
      return "getter";
    case EntityKind.Setter:
      return "setter";
    case EntityKind.Constructor:
      return "ctor";
    case EntityKind.CallSignature:
      return "callSignature";
    case EntityKind.ConstructSignature:
      return "ctor";
    case EntityKind.FunctionSignature:
      return "function";
    case EntityKind.GetterSignature:
      return "getter";
    case EntityKind.MethodSignature:
      return "method";
    case EntityKind.SetterSignature:
      return "setter";
  }
}


export function renderCategoryName(ctx: MarkupRenderContext, entities: ExportableEntity[]) {

  const translate = getTranslator(ctx);
  const translationKey = getCategoryNameTranslationKey(entities[0].kind);

  return translate(translationKey, { capitalize: true, count: entities.length });

}

export function renderEntityPrefix(ctx: MarkupRenderContext, target: "documentation" | "tableOfContents", entityKind: EntityKind) {

  if(!isRenderEntityPrefixEnabled(ctx, target)){
    return "";
  }

  const translate = getTranslator(ctx);
  const translationKey = getEntityPrefixTranslationKey(entityKind);

  return translationKey
    ? translate(translationKey, { capitalize: true, count: 1 })
    : "";

}

export function spaceBetween(...nodes: ASTNode[]) {
  return nodes
    .filter(node => !!node)
    .reduce<ASTNode[]>((acc, node, index) => {
    if(index > 0){
      acc.push(" ", node);
    } else {
      acc.push(node);
    }
    return acc;
  }, []);
}
