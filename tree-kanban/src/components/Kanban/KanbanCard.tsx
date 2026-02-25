import React, { useState } from "react";
import type { Card as CardType } from "../../types/kanban.ts";

interface Props {
  card: CardType;
  columnId: string;
  onDelete: (columnId: string, cardId: string) => void;
  onEdit: (columnId: string, cardId: string, newTitle: string) => void;
  onDragStart: (
  columnId: string,
  cardId: string
) => void;
}

const Card: React.FC<Props> = ({
  card,
  columnId,
  onDelete,
  onEdit,
  onDragStart,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(card.title);

  const handleBlur = () => {
    onEdit(columnId, card.id, value);
    setIsEditing(false);
  };

  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={() => onDragStart(columnId, card.id)}
    >
      {isEditing ? (
        <input
          className="card-input"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        />
      ) : (
        <div
          className="card-title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {card.title}
        </div>
      )}

      <button
        className="delete-btn"
        onClick={() => {
          if (window.confirm("Delete this card?")) {
            onDelete(columnId, card.id);
          }
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Card;