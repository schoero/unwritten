import type { SectionType } from "unwritten:renderer/markup/enums/sections.ts";
import type { Anchor } from "unwritten:renderer/markup/utils/linker.js";
import type { ASTNodeKinds } from "unwritten:renderer:markup/enums/nodes.js";


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

export interface AnchorNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Anchor>, Required<Anchor> {
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

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title>, Anchor {
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

export interface SpanNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Span> {
  children: Children;
  anchor?: Anchor;
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
