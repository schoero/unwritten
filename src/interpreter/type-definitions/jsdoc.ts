import type { JSDocKind, JSDocTagNames } from "unwritten:interpreter/enums/jsdoc";
import type { Entity } from "unwritten:interpreter:type-definitions/entities";
import type { Position } from "unwritten:interpreter:type-definitions/shared";
import type { Type } from "unwritten:interpreter:type-definitions/types";


type JSDocBase<Kind extends JSDocKind> = {
  kind: Kind;
};

export type JSDocTag =
  | JSDocGenericTag
  | JSDocLink
  | JSDocReference
  | JSDocSeeTag
  | JSDocText
  | JSDocThrowsTag
  | JSDocType;

export type JSDocTags = JSDocTag[];

export interface JSDocText extends JSDocBase<JSDocKind.Text> {
  text: string;
}
export interface JSDocLink extends JSDocBase<JSDocKind.Link> {
  link: string;
  reference?: JSDocReference;
  text?: string;
}

export interface JSDocReference extends JSDocBase<JSDocKind.Reference> {
  name?: Name;
  position?: Position;
  target?: Entity;
}

export interface JSDocType extends JSDocBase<JSDocKind.Type> {
  name?: Name;
  position?: Position;
  type?: Type;
}

export interface JSDocSeeTag extends JSDocBase<JSDocKind.See> {
  content: JSDocTags;
  link?: JSDocLink;
  reference?: JSDocReference;
}

export interface JSDocExampleTag extends JSDocBase<JSDocKind.Example> {
  content: JSDocTags;
}

export interface JSDocThrowsTag extends JSDocBase<JSDocKind.Throws> {
  content: JSDocTags;
  type?: JSDocType;
}

export interface JSDocGenericTag extends JSDocBase<JSDocKind.Generic> {
  content: JSDocTags;
  tag: JSDocTagNames;
}

export type Name = string;
export type ID = number;

export type Description = JSDocTags;
export type See = JSDocSeeTag[];
export type Example = JSDocGenericTag[];
export type Alpha = JSDocTags;
export type Beta = JSDocTags;
export type Deprecated = JSDocTags;
export type Internal = JSDocTags;
export type Remark = JSDocGenericTag[];
export type EventProperty = true;
export type Throws = JSDocThrowsTag[];

export type Template = [] | [JSDocGenericTag];
export type Returns = [] | [JSDocGenericTag];
export type Param = [] | [JSDocGenericTag];

export interface JSDocProperties {
  [JSDocTagNames.Alpha]?: Alpha;
  [JSDocTagNames.Beta]?: Beta;
  [JSDocTagNames.See]?: See;
  [JSDocTagNames.Deprecated]?: Deprecated;
  [JSDocTagNames.Description]?: Description;
  [JSDocTagNames.EventProperty]?: EventProperty;
  [JSDocTagNames.Example]?: Example;
  [JSDocTagNames.Param]?: Param;
  [JSDocTagNames.Returns]?: Returns;
  [JSDocTagNames.Remarks]?: Remark;
  [JSDocTagNames.Throws]?: Throws;
  [JSDocTagNames.Internal]?: Internal;
  [JSDocTagNames.Template]?: Template;
}
