import type { ASTNodeKinds } from "unwritten:renderer/markup/enums/nodes.js";


export type ASTNodes =
  | AnchorNode
  | BoldNode
  | ContainerNode
  | ItalicNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SmallNode
  | StrikethroughNode
  | TitleNode
  | WrapperNode
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

export interface ListNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.List> {
  children: Children;
}

export interface ParagraphNode extends ASTNode<ASTNodeKinds.Paragraph> {
  children: string;
}

export interface WrapperNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Wrapper> {
  children: Children;
}

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title> {
  children: Children;
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

export interface BoldNode extends ASTNode<ASTNodeKinds.Bold> {
  children: string;
}

export interface ItalicNode extends ASTNode<ASTNodeKinds.Italic> {
  children: string;
}

export interface StrikethroughNode extends ASTNode<ASTNodeKinds.Strikethrough> {
  children: string;
}
