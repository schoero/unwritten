import type { ASTNodeKinds } from "../enums/nodes.js";

import type { AnchorLink, AnchorTarget } from "unwritten:renderer/markup/source-registry/link-registry.js";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections.js";


export type ASTNodes =
  | AnchorNode
  | ASTNodes[]
  | BoldNode
  | ItalicNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SectionNode
  | SmallNode
  | SpanNode
  | StrikethroughNode
  | TitleNode
  | string;

interface ASTNode<T extends ASTNodeKinds> {
  children: ASTNodes | ASTNodes[];
  kind: T;
}

export interface AnchorNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Anchor>, Required<AnchorLink> {
  children: Children;
}

export interface ListNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.List> {
  children: Children;
}

export interface ParagraphNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Paragraph> {
  children: Children;
}

export interface SectionNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Section> {
  children: Children;
  type?: SectionType;
}

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title>, Partial<AnchorTarget> {
  children: Children;
  title: ASTNodes;
}

export interface LinkNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Link> {
  children: Children;
  link: string;
}

export interface SmallNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Small> {
  children: Children;
}

export interface SpanNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Span>, Partial<AnchorTarget> {
  children: Children;
}

export interface BoldNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Bold> {
  children: Children;
}

export interface ItalicNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Italic> {
  children: Children;
}

export interface StrikethroughNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Strikethrough> {
  children: Children;
}
