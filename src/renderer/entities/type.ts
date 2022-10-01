import { encapsulate, renderLink } from "src/utils/renderer.js";
import {
  ArrayType,
  BasicType,
  BasicTypeKinds,
  BigIntLiteralType,
  BooleanLiteralType,
  InstanceType,
  IntersectionType,
  NumberLiteralType,
  ObjectLiteralType,
  StringLiteralType,
  TupleType,
  Type,
  TypeKind,
  TypeReferenceType,
  UnionType
} from "types/types.js";

import { config } from "../../config/index.js";
import {
  isArrayType,
  isBasicType,
  isInstanceType,
  isIntersectionType,
  isLiteralType,
  isObjectLiteralType,
  isStringLiteralType,
  isTupleType,
  isTypeReferenceType,
  isUnionType
} from "../../typeguards/types.js";
import { getRenderExtension } from "../extensions/index.js";


export function renderType(type: Type<TypeKind>, enableEncapsulation: boolean = true): string {

  let renderedType: string | undefined;

  if(isLiteralType(type)){
    renderedType = _renderLiteralType(type);
  } else if(isBasicType(type)){
    renderedType = _renderBasicType(type);
  } else if(isUnionType(type)){
    renderedType = _renderUnionType(type);
  } else if(isIntersectionType(type)){
    renderedType = _renderIntersectionType(type);
  } else if(isObjectLiteralType(type)){
    renderedType = _renderObjectLiteralType(type);
  } else if(isInstanceType(type)){
    renderedType = _renderInstanceType(type);
  } else if(isTypeReferenceType(type)){
    renderedType = _renderTypeReferenceType(type);
  } else if(isArrayType(type)){
    renderedType = _renderArrayType(type);
  } else if(isTupleType(type)){
    renderedType = _renderTupleType(type);
  } else {
    renderedType = "";
  }

  if(enableEncapsulation === true){
    return encapsulate(renderedType, config.renderConfig.typeEncapsulation);
  } else {
    return renderedType;
  }

}


function _renderLiteralType(type: BigIntLiteralType | BooleanLiteralType | NumberLiteralType | StringLiteralType) {
  if(isStringLiteralType(type)){
    return encapsulate(`"${type.value}"`, config.renderConfig.literalTypeEncapsulation);
  } else {
    return encapsulate(`${type.value}`, config.renderConfig.literalTypeEncapsulation);
  }
}


function _renderBasicType(type: BasicType<BasicTypeKinds>): string {
  if(config.renderConfig.linkBasicTypesToExternalDocs === true && type.kind in config.typeSources){
    const link = config.typeSources[type.kind as keyof typeof config.typeSources];
    const renderedLink = getRenderExtension().renderHyperLink(type.name, link);
    return renderedLink;
  } else {
    return type.name;
  }
}


function _renderUnionType(type: UnionType) {
  return type.types.map(type => renderType(type, false)).join(" | ");
}


function _renderArrayType(type: ArrayType) {
  if(type.type !== undefined){
    return `${renderType(type.type, false)}[]`;
  } else {
    return "[]";
  }
}


function _renderTupleType(type: TupleType) {
  const renderedMembers = type.members.map(type => {
    const label = type.label !== undefined ? `${type.label}: ` : "";
    return `${label}${renderType(type, false)}`;
  }).join(", ");
  return `[${renderedMembers}]`;
}


function _renderIntersectionType(type: IntersectionType) {
  return type.types.map(type => renderType(type, false)).join(" & ");
}


function _renderTypeReferenceType(type: TypeReferenceType) {
  const renderedAnchorLink = renderLink(type.target.name, type.target.id);
  return renderedAnchorLink;
}


function _renderInstanceType(type: InstanceType) {
  const renderedAnchorLink = renderLink(type.target.name, type.target.id);
  return renderedAnchorLink;
}


function _renderObjectLiteralType(type: ObjectLiteralType) {
  return "";
}