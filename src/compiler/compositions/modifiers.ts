import ts, { Declaration } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Modifiers } from "../../types/types.js";


export function getModifiersByDeclaration(ctx: CompilerContext, declaration: Declaration): Modifiers[] {

  if(ts.canHaveModifiers(declaration)){
    return ts.getModifiers(declaration)?.reduce((modifiers, modifier) => {
      const modifierText = modifier.getText();
      if(isSupportedModifier(modifierText)){
        modifiers.push(modifierText);
      }
      return modifiers;
    }, <Modifiers[]>[]) ?? [];
  }

  return [];

}


function isSupportedModifier(modifier: string): modifier is Modifiers {
  return modifier === Modifiers.Abstract ||
    modifier === Modifiers.Async ||
    modifier === Modifiers.Override ||
    modifier === Modifiers.Public ||
    modifier === Modifiers.Private ||
    modifier === Modifiers.Protected ||
    modifier === Modifiers.Static ||
    modifier === Modifiers.Readonly;
}
