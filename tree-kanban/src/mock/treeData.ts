import type  { TreeNodeType } from "../types/tree";

export const initialTree: TreeNodeType[] = [
  {
    id: "1",
    label: "Root",
    children: [
      {
        id: "1-1",
        label: "Child 1"
      },
      {
        id: "1-2",
        label: "Child 2",
        children: [
          {
            id: "1-2-1",
            label: "Leaf"
          }
        ]
      }
    ]
  }
];