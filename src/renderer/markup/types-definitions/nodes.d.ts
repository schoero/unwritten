import type { ASTNodeKinds } from "unwritten:renderer:markup/enums/nodes.js";


export type ASTNodes =
  | AnchorNode
  | ASTNodes[]
  | BoldNode
  | ItalicNode
  | LinkNode
  | ListNode
  | ParagraphNode
  | SmallNode
  | StrikethroughNode
  | TitleNode
  | string;

interface ASTNode<T extends ASTNodeKinds> {
  children: ASTNodes | ASTNodes[];
  kind: T;
}

export interface AnchorNode extends ASTNode<ASTNodeKinds.Anchor> {
  id: string;
}

export interface ListNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.List> {
  children: Children;
}

export interface ParagraphNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Paragraph> {
  children: Children;
}

export interface TitleNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Title> {
  children: Children;
  title: ASTNodes;
  /** Internal id of the entity */
  id?: number;
}

export interface LinkNode extends ASTNode<ASTNodeKinds.Link> {
  /** Internal id of the entity */
  id?: number;
  link?: string;
}

export interface SmallNode<Children extends ASTNodes[] = ASTNodes[]> extends ASTNode<ASTNodeKinds.Small> {
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
