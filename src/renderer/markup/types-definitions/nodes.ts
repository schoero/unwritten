import type { ASTNodeKinds } from "../enums/nodes.js";

import type { AnchorLink, AnchorTarget } from "unwritten:renderer/markup/registry/registry.js";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections.js";


export type ASTNode =
  | AnchorNode
  | ASTNode[]
  | BoldNode
  | ConditionalNode
  | InlineTitleNode
  | ItalicNode
  | LinkNode
  | ListNode
  | MultilineNode
  | PaddedNode
  | ParagraphNode
  | SectionNode
  | SmallNode
  | SpanNode
  | StrikethroughNode
  | TitleNode
  | string;

interface ASTNodeBase<T extends ASTNodeKinds> {
  children: ASTNode | ASTNode[];
  kind: T;
}

export interface AnchorNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Anchor>, AnchorLink {
  children: Children;
}

export type ConditionalOperator = "!=" | "!==" | "&&" | "<" | "<=" | "==" | "===" | ">" | ">=" | "||";
export interface ConditionalNode<
  TrueChildren extends ASTNode | undefined = ASTNode,
  FalseChildren extends ASTNode | undefined = ASTNode
> {
  args: unknown[];
  falseChildren: FalseChildren;
  function: Function;
  kind: ASTNodeKinds.Conditional;
  operator: ConditionalOperator;
  trueChildren: TrueChildren;
  value: any;
}

export interface ListNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.List> {
  children: Children;
}

export interface MultilineNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Multiline> {
  children: Children;
}

export interface PaddedNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Padded> {
  children: Children;
}

export interface ParagraphNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Paragraph> {
  children: Children;
}

export interface SectionNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Section> {
  children: Children;
  type?: SectionType;
}

export interface TitleNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Title>, Partial<AnchorTarget> {
  children: Children;
  title: ASTNode;
}

export interface InlineTitleNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.InlineTitle>, Partial<AnchorTarget> {
  children: Children;
  title: ASTNode;
}

export interface LinkNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Link> {
  children: Children;
  link: string;
}

export interface SmallNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Small> {
  children: Children;
}

export interface SpanNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Span>, Partial<AnchorTarget> {
  children: Children;
}

export interface BoldNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Bold> {
  children: Children;
}

export interface ItalicNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Italic> {
  children: Children;
}

export interface StrikethroughNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Strikethrough> {
  children: Children;
}
