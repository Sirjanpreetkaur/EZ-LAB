export interface TreeNodeType {
  id: string;
  label: string;
  children?: TreeNodeType[];
  isLeaf?: boolean;
}