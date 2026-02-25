import { useState } from "react";
import { initialTree } from "../../mock/treeData";
import TreeNode from "./TreeNode";

import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

const TreeView = () => {
  const [tree, setTree] = useState(initialTree);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState({});

  const loadChildren = (nodeId) => {
    setLoading((p) => ({ ...p, [nodeId]: true }));

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
      setLoading((p) => ({ ...p, [nodeId]: false }));
    }, 600);
  };

  const addNode = (parentId, label) => {
    const newNode = {
      id: Date.now().toString(),
      label,
      children: []
    };

    const update = (items) =>
      items.map((i) => {
        if (i.id === parentId) {
          const children = Array.isArray(i.children)
            ? [...i.children, newNode]
            : [newNode];

          return { ...i, children };
        }

        if (Array.isArray(i.children)) {
          return { ...i, children: update(i.children) };
        }

        return i;
      });

    setTree(update(tree));
    setExpanded((p) => ({ ...p, [parentId]: true }));
  };

  const deleteNode = (nodeId) => {
    if (!window.confirm("Delete this node?")) return;

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

const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const reorder = (items) => {
    const ids = items.map((item) => item.id);

    if (ids.includes(active.id) && ids.includes(over.id)) {
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    }

    return items.map((item) => {
      if (Array.isArray(item.children)) {
        return { ...item, children: reorder(item.children) };
      }
      return item;
    });
  };

  setTree((prev) => reorder(prev));
};

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={tree.map((n) => n.id)}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  );
};

export default TreeView;