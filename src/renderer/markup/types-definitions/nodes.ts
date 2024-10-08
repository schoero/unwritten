import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections";
import type { AnchorLink, AnchorTarget } from "unwritten:renderer/markup/registry/registry";

import type { ASTNodeKinds } from "../enums/nodes";


export type Empty = false | null | undefined;

export type ASTNode =
  | AnchorNode
  | ASTNode[]
  | BoldNode
  | ConditionalNode
  | Empty
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

export interface SectionNode<Children extends ASTNode[] = ASTNode[] | [TitleNode, ...ASTNode[]]> extends ASTNodeBase<ASTNodeKinds.Section> {
  children: Children extends [infer First, ...infer Rest] ? First extends TitleNode ? Rest : Children : Children;
  title?: Children extends [infer First, ...infer Rest] ? First extends TitleNode ? First : undefined : undefined;
  type?: SectionType;
}

export interface TitleNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.Title>, Partial<AnchorTarget> {
  children: Children;
  title: ASTNode;
}

export interface InlineTitleNode<Children extends ASTNode[] = ASTNode[]> extends ASTNodeBase<ASTNodeKinds.InlineTitle>, AnchorTarget {
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
