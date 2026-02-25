import { useState } from "react";
import { initialTree } from "../../mock/treeData";
import TreeNode from "./TreeNode";

const TreeView = () => {
  const [tree, setTree] = useState(initialTree);
  const [expanded, setExpanded] = useState({});

  const addNode = (parentId, label) => {
    const newNode = {
      id: Date.now().toString(),
      label,
      children: []
    };

    const updateTree = (items) =>
      items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newNode]
          };
        }
        if (item.children) {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });

    setTree(updateTree(tree));
    setExpanded({ ...expanded, [parentId]: true });
  };

  const deleteNode = (nodeId) => {
    if (!window.confirm("Are you sure you want to delete this node?")) return;

    const removeNode = (items) =>
      items
        .filter((item) => item.id !== nodeId)
        .map((item) => {
          if (item.children) {
            return { ...item, children: removeNode(item.children) };
          }
          return item;
        });

    setTree(removeNode(tree));
  };


  const editNode = (nodeId, newLabel) => {
    const updateNode = (items) =>
      items.map((item) => {
        if (item.id === nodeId) {
          return { ...item, label: newLabel };
        }
        if (item.children) {
          return { ...item, children: updateNode(item.children) };
        }
        return item;
      });

    setTree(updateNode(tree));
  };

  return (
    <ul>
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          expanded={expanded}
          setExpanded={setExpanded}
          addNode={addNode}
          deleteNode={deleteNode}
          editNode={editNode}       
        />
      ))}
    </ul>
  );
};

export default TreeView;