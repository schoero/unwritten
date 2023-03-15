import { isSignatureEntity } from "unwritten:typeguards/entities.js";

import type { InterfaceEntity, PropertyEntity } from "unwritten:compiler/type-definitions/entities.js";


export function extendInterfacePropertiesWithHeritage(interfaceEntity: InterfaceEntity): PropertyEntity[] {

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


export function extendInterfaceSignaturesWithHeritage<Key extends "callSignatures" | "constructSignatures" | "getterSignatures" | "methodSignatures" | "setterSignatures">(interfaceEntity: InterfaceEntity, key: Key): InterfaceEntity[Key] {

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
