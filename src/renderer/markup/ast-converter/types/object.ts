import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertFunctionType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";

import type {
  InterfaceType,
  ObjectLiteralType,
  ObjectType,
  TypeLiteralType
} from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedInterfaceType,
  ConvertedObjectType,
  ConvertedTypeLiteralType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectType(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectType;
export function convertObjectType(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceType;
export function convertObjectType(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralType;
export function convertObjectType(ctx: MarkupRenderContexts, objectType: ObjectType): ConvertedObjectType;
export function convertObjectType(ctx: MarkupRenderContexts, objectLikeType: InterfaceType | ObjectLiteralType | ObjectType | TypeLiteralType): ConvertedObjectType {


  const convertedConstructSignatures = convertFunctionType(ctx, objectLikeType.constructSignatures);

  const convertedProperties = objectLikeType.properties.map(propertyEntity => {
    const name = propertyEntity.name;
    const type = convertType(ctx, propertyEntity.type);
    return spaceBetween(name, type); // TODO: Check if readonly is possible here
  });

  return createListNode([
    convertedConstructSignatures,
    convertedCallSignatures,
    convertedProperties,
    convertedMethods,
    convertedSetters,
    convertedGetters
  ]);

}
