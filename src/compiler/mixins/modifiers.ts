import ts from "typescript";

import { isPropertyDeclaration } from "quickdoks:compiler:typeguards/declarations.js";

import type { Declaration } from "typescript";

import type { Modifiers, NativeModifiers } from "quickdoks:compiler:type-definitions/mixins.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function getModifiersByDeclaration(ctx: CompilerContext, declaration: Declaration): Modifiers[] {

  if(ts.canHaveModifiers(declaration)){

    const tsModifiers = ts.getModifiers(declaration)?.reduce((modifiers, modifier) => {
      const modifierText = modifier.getText();
      if(isSupportedModifier(modifierText)){
        modifiers.push(modifierText);
      }
      return modifiers;
    }, <Modifiers[]>[]) ?? [];

    const nativeModifiers: NativeModifiers[] = [];

    if(isPropertyDeclaration(declaration) && ts.isPrivateIdentifier(declaration.name)){
      nativeModifiers.push("nativePrivate");
    }

    return [...tsModifiers, ...nativeModifiers];

  }

  return [];

}


function isSupportedModifier(modifier: string): modifier is Modifiers {
  return modifier === "abstract" ||
    modifier === "async" ||
    modifier === "override" ||
    modifier === "public" ||
    modifier === "private" ||
    modifier === "protected" ||
    modifier === "static" ||
    modifier === "accessor" ||
    modifier === "readonly";
}
