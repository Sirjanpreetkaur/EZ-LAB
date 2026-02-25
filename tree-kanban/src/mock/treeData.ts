import type { TreeNodeType } from "../types/tree";

export const initialTree: TreeNodeType[] = [
  {
    id: "1",
    label: "Level 1",
    children: null,
    lazyChildren: [
      {
        id: "1-1",
        label: "Level 2 - Child A",
        children: null,
        lazyChildren: [
          {
            id: "1-1-1",
            label: "Level 3 - Child A-1",
            children: null
          },
          {
            id: "1-1-2",
            label: "Level 3 - Child A-2",
            children: null
          }
        ]
      },
      {
        id: "1-2",
        label: "Level 2 - Child B",
        children: null,
        lazyChildren: [
          {
            id: "1-2-1",
            label: "Level 3 - Child B-1",
            children: null
          }
        ]
      }
    ]
  },

  {
    id: "2",
    label: "Level 1 - Section 2",
    children: null,
    lazyChildren: [
      {
        id: "2-1",
        label: "Level 2 - Child C",
        children: null
      },
      {
        id: "2-2",
        label: "Level 2 - Child D",
        children: null,
        lazyChildren: [
          {
            id: "2-2-1",
            label: "Level 3 - Child D-1",
            children: null
          }
        ]
      }
    ]
  }
];