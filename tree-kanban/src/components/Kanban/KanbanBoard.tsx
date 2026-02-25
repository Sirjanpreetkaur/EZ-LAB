import React, { useState } from "react";
import { initialKanbanData } from "../../mock/kanbanData";
import type { Column as ColumnType } from "../../types/kanban";
import Card from "./KanbanCard";
import "../../styles/kanbanStyles.css";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] =
    useState<ColumnType[]>(initialKanbanData);

  const [dragData, setDragData] = useState<{
    fromColumn: string;
    cardId: string;
  } | null>(null);

  const handleAddCard = (columnId: string) => {
    const title = prompt("Enter card title");
    if (!title) return;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: Date.now().toString(), title },
              ],
            }
          : col
      )
    );
  };

  const handleDelete = (columnId: string, cardId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.filter(
                (card) => card.id !== cardId
              ),
            }
          : col
      )
    );
  };

  const handleEdit = (
    columnId: string,
    cardId: string,
    newTitle: string
  ) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId
                  ? { ...card, title: newTitle }
                  : card
              ),
            }
          : col
      )
    );
  };
  

  

  const handleDragStart = (
  fromColumn: string,
  cardId: string
) => {
  setDragData({ fromColumn, cardId });
};

  // Drop
  const handleDrop = (toColumnId: string) => {
    if (!dragData) return;

    const { fromColumn, cardId } = dragData;

    if (fromColumn === toColumnId) return;

    let movedCard;

    const updatedColumns = columns.map((col) => {
      if (col.id === fromColumn) {
        const card = col.cards.find((c) => c.id === cardId);
        movedCard = card;
        return {
          ...col,
          cards: col.cards.filter((c) => c.id !== cardId),
        };
      }
      return col;
    });

    setColumns(
      updatedColumns.map((col) =>
        col.id === toColumnId && movedCard
          ? { ...col, cards: [...col.cards, movedCard!] }
          : col
      )
    );

    setDragData(null);
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div
          key={column.id}
          className="kanban-column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(column.id)}
        >
          <div className={`column-header ${column.id}`}>
            {column.title}
            <button
              className="add-btn"
              onClick={() => handleAddCard(column.id)}
            >
              +
            </button>
          </div>

          {column.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              columnId={column.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDragStart={handleDragStart}
              
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;