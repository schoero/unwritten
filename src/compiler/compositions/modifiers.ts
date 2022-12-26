import ts, { Declaration } from "typescript";

import { isPropertyDeclaration } from "quickdoks:compiler/typeguards/declarations.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Modifiers } from "quickdoks:type-definitions/types.d.js";


export function getModifiersByDeclaration(ctx: CompilerContext, declaration: Declaration): Modifiers[] {

  if(ts.canHaveModifiers(declaration)){

    const tsModifiers = ts.getModifiers(declaration)?.reduce((modifiers, modifier) => {
      const modifierText = modifier.getText();
      if(_isSupportedModifier(modifierText)){
        modifiers.push(modifierText);
      }
      return modifiers;
    }, <Modifiers[]>[]) ?? [];

    const nativeModifiers = [];

    if(isPropertyDeclaration(declaration) && ts.isPrivateIdentifier(declaration.name)){
      nativeModifiers.push(Modifiers.NativePrivate);
    }

    return [...tsModifiers, ...nativeModifiers];

  }

  return [];

}


function _isSupportedModifier(modifier: string): modifier is Modifiers {
  return modifier === Modifiers.Abstract ||
    modifier === Modifiers.Async ||
    modifier === Modifiers.Override ||
    modifier === Modifiers.Public ||
    modifier === Modifiers.Private ||
    modifier === Modifiers.Protected ||
    modifier === Modifiers.Static ||
    modifier === Modifiers.Readonly;
}
