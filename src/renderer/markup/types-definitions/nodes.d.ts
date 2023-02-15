import type { ASTNodeKinds } from "unwritten:renderer/markup/enums/nodes.js";


export type ASTNodes =
  | AnchorNode
  | ContainerNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SmallNode
  | TitleNode
  | string;

interface ASTNode<T extends ASTNodeKinds> {
  children: ASTNodes | ASTNodes[];
  kind: T;
}

export interface ContainerNode extends ASTNode<ASTNodeKinds.Container> {
}

export interface AnchorNode extends ASTNode<ASTNodeKinds.Anchor> {
  children: string;
  id: string;
}

export interface ListNode extends ASTNode<ASTNodeKinds.List> {
  children: ASTNodes[];
}

export interface ParagraphNode extends ASTNode<ASTNodeKinds.Paragraph> {
  children: string;
}

export interface TitleNode extends ASTNode<ASTNodeKinds.Title> {
  children: ASTNodes[];
  title: string;
  id?: string;
}

export interface LinkNode extends ASTNode<ASTNodeKinds.Link> {
  children: string;
  link: string;
}

export interface SmallNode extends ASTNode<ASTNodeKinds.Small> {
  children: string;
}
