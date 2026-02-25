import { useState } from "react";

const TreeNode = ({ node, expanded, setExpanded, addNode, deleteNode, editNode }) => {
  const [showInput, setShowInput] = useState(false);   
  const [value, setValue] = useState("");

  const [editing, setEditing] = useState(false);       
  const [editValue, setEditValue] = useState(node.label);

  const hasChildren = node.children && node.children.length > 0;

  const toggleExpand = () => {
    setExpanded({
      ...expanded,
      [node.id]: !expanded[node.id]
    });
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
    <li>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {hasChildren ? (
          <span style={{ cursor: "pointer" }} onClick={toggleExpand}>
            {expanded[node.id] ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: "12px" }}></span>
        )}

        {!editing ? (
          <span
            onDoubleClick={() => setEditing(true)}   
            style={{ cursor: "pointer" }}
          >
            {node.label}
          </span>
        ) : (
          <span>
            <input
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            />
            <button onClick={handleEdit}>✔</button>
            <button onClick={() => setEditing(false)}>✖</button>
          </span>
        )}

        <button
          onClick={() => setShowInput(true)}
          style={{ fontSize: "10px" }}
        >
          +
        </button>

        <button
          onClick={() => deleteNode(node.id)}
          style={{ fontSize: "10px", color: "red" }}
        >
          🗑
        </button>
      </div>

      {showInput && (
        <div style={{ marginLeft: "20px", marginTop: "4px" }}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            autoFocus
          />
          <button onClick={handleAdd}>Add</button>
          <button onClick={() => setShowInput(false)}>Cancel</button>
        </div>
      )}

      {hasChildren && expanded[node.id] && (
        <ul style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              expanded={expanded}
              setExpanded={setExpanded}
              addNode={addNode}
              deleteNode={deleteNode}
              editNode={editNode}     
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;