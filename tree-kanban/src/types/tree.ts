export interface TreeNodeType {
  id: string;
  label: string;
  children: TreeNodeType[] | null;   
  lazyChildren?: TreeNodeType[];    
}