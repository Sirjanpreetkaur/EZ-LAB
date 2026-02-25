import { useState } from "react";
import { initialTree } from "../../mock/treeData";
import TreeNode from "./TreeNode";

const TreeView = () => {
  const [tree, setTree] = useState(initialTree);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState({});

  const loadChildren = (nodeId) => {
    setLoading((prev) => ({ ...prev, [nodeId]: true }));

    setTimeout(() => {
      const update = (items) =>
        items.map((item) => {
          if (item.id === nodeId) {
            return {
              ...item,
              children: item.lazyChildren || [],
              lazyChildren: undefined
            };
          }

          if (Array.isArray(item.children)) {
            return { ...item, children: update(item.children) };
          }

          return item;
        });

      setTree(update(tree));
      setLoading((prev) => ({ ...prev, [nodeId]: false }));
    }, 500);
  };

  const addNode = (parentId, label) => {
    const newNode = {
      id: Date.now().toString(),
      label,
      children: []
    };

    const update = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          const children = Array.isArray(item.children)
            ? [...item.children, newNode]
            : [newNode];

          return { ...item, children };
        }

        if (Array.isArray(item.children)) {
          return { ...item, children: update(item.children) };
        }

        return item;
      });

    setTree(update(tree));
    setExpanded((prev) => ({ ...prev, [parentId]: true }));
  };

  const deleteNode = (nodeId) => {
    if (!window.confirm("Are you sure?")) return;

    const remove = (items) =>
      items
        .filter((i) => i.id !== nodeId)
        .map((i) =>
          Array.isArray(i.children)
            ? { ...i, children: remove(i.children) }
            : i
        );

    setTree(remove(tree));
  };

  const editNode = (nodeId, newLabel) => {
    const update = (items) =>
      items.map((i) => {
        if (i.id === nodeId) return { ...i, label: newLabel };

        if (Array.isArray(i.children)) {
          return { ...i, children: update(i.children) };
        }

        return i;
      });

    setTree(update(tree));
  };

  return (
    <ul>
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          expanded={expanded}
          setExpanded={setExpanded}
          loadChildren={loadChildren}
          loading={loading}
          addNode={addNode}
          deleteNode={deleteNode}
          editNode={editNode}
        />
      ))}
    </ul>
  );
};

export default TreeView;