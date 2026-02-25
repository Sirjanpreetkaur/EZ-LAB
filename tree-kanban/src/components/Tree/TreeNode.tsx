import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import "../../styles/treeStyles.css";

const TreeNode = ({
  node,
  expanded,
  setExpanded,
  addNode,
  deleteNode,
  editNode,
  loadChildren,
  loading
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.label);

  const hasLoadedChildren = Array.isArray(node.children);
  const notLoaded = node.children === null;

  const toggleExpand = () => {
    if (notLoaded) loadChildren(node.id);
    setExpanded({ ...expanded, [node.id]: !expanded[node.id] });
  };

  const handleAdd = () => {
    if (!value.trim()) return;
    addNode(node.id, value);
    setValue("");
    setShowInput(false);
  };

  const handleEdit = () => {
    if (!editValue.trim()) return;
    editNode(node.id, editValue);
    setEditing(false);
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="tree-node">
        <span
          className="drag-handle"
          {...listeners}
          {...attributes}
        >
          ⠿
        </span>

        {notLoaded ? (
          <span className="tree-arrow" onClick={toggleExpand}>▶</span>
        ) : hasLoadedChildren ? (
          <span className="tree-arrow" onClick={toggleExpand}>
            {expanded[node.id] ? "▼" : "▶"}
          </span>
        ) : (
          <span className="tree-arrow"></span>
        )}

        {!editing ? (
          <span
            className="tree-label"
            onDoubleClick={() => setEditing(true)}
          >
            {node.label}
          </span>
        ) : (
          <>
            <input
              className="tree-edit-input"
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            />
            <button className="tree-btn" onClick={handleEdit}>✔</button>
            <button className="tree-btn" onClick={() => setEditing(false)}>✖</button>
          </>
        )}

        <button className="tree-btn" onClick={() => setShowInput(true)}>+</button>

        <button
          className="tree-btn-delete"
          onClick={() => deleteNode(node.id)}
        >
          🗑
        </button>
      </div>

      {showInput && (
        <div className="add-box">
          <input
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button className="tree-btn" onClick={handleAdd}>Add</button>
          <button className="tree-btn" onClick={() => setShowInput(false)}>
            Cancel
          </button>
        </div>
      )}

      {loading[node.id] && (
        <div className="tree-loading">Loading...</div>
      )}

      {hasLoadedChildren && expanded[node.id] && (
        <SortableContext
          items={node.children.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
            <div className="tree-container">

          <ul className="tree-children">
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                expanded={expanded}
                setExpanded={setExpanded}
                addNode={addNode}
                deleteNode={deleteNode}
                editNode={editNode}
                loadChildren={loadChildren}
                loading={loading}
              />
            ))}
          </ul>
          </div>
        </SortableContext>
      )}
    </li>
  );
};

export default TreeNode;