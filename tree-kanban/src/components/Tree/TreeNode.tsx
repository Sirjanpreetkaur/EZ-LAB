import { useState } from "react";

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
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState("");

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(node.label);

  const hasLoadedChildren = Array.isArray(node.children);
  const notLoaded = node.children === null;

  const toggleExpand = () => {
    if (notLoaded) loadChildren(node.id);

    setExpanded({
      ...expanded,
      [node.id]: !expanded[node.id]
    });
  };

  const handleAdd = () => {
    if (!value.trim()) return;
    addNode(node.id, value);
    setShowInput(false);
    setValue("");
  };

  const handleEdit = () => {
    if (!editValue.trim()) return;
    editNode(node.id, editValue);
    setEditing(false);
  };

  return (
    <li>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {notLoaded ? (
          <span onClick={toggleExpand} style={{ cursor: "pointer" }}>▶</span>
        ) : hasLoadedChildren ? (
          <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
            {expanded[node.id] ? "▼" : "▶"}
          </span>
        ) : (
          <span style={{ width: "12px" }} />
        )}

        {!editing ? (
          <span onDoubleClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {node.label}
          </span>
        ) : (
          <>
            <input
              value={editValue}
              autoFocus
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            />
            <button onClick={handleEdit}>✔</button>
            <button onClick={() => setEditing(false)}>✖</button>
          </>
        )}

        <button onClick={() => setShowInput(true)} style={{ fontSize: "10px" }}>+</button>
        <button onClick={() => deleteNode(node.id)} style={{ fontSize: "10px", color: "red" }}>🗑</button>
      </div>

      {showInput && (
        <div style={{ marginLeft: "20px" }}>
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

      {loading[node.id] && (
        <div style={{ marginLeft: "20px", color: "gray" }}>Loading...</div>
      )}

      {hasLoadedChildren && expanded[node.id] && node.children.length > 0 && (
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
              loadChildren={loadChildren}
              loading={loading}
            />
          ))}
        </ul>
      )}

      {hasLoadedChildren &&
        expanded[node.id] &&
        node.children.length === 0 &&
        !loading[node.id] && (
          <div style={{ marginLeft: "20px", color: "gray" }}>No children</div>
        )}
    </li>
  );
};

export default TreeNode;