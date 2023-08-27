import { isPropertyDeclaration } from "unwritten:interpreter:typeguards/declarations.js";

import type { Declaration } from "typescript";

import type { Modifiers, NativeModifiers } from "unwritten:interpreter:type-definitions/shared.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getModifiersByDeclaration(ctx: InterpreterContext, declaration: Declaration): Modifiers[] {

  const { ts } = ctx.dependencies;

  if(ts.canHaveModifiers(declaration)){

    const tsModifiers = ts.getModifiers(declaration)?.reduce((modifiers, modifier) => {
      const modifierText = modifier.getText();
      if(isSupportedModifier(modifierText)){
        modifiers.push(modifierText);
      }
      return modifiers;
    }, <Modifiers[]>[]) ?? [];

    const nativeModifiers: NativeModifiers[] = [];

    if(isPropertyDeclaration(ctx, declaration) && ts.isPrivateIdentifier(declaration.name)){
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
