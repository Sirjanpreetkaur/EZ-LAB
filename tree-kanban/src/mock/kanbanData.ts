import type { Column } from "../types/kanban.ts";

export const initialKanbanData: Column[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "1", title: "Create initial project plan" },
      { id: "2", title: "Design landing page" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Implement authentication" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "4", title: "Write API documentation" },
    ],
  },
];