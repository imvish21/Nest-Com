const useNode = () => {
  const insertNode = function (tree, commentId, item) {
    //if the current node has a id which matches commentId, a new node
    //is created and added to its items array.
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });
      return tree;
    }
    // otherwise the function recursively searches for the appropriate position
    // to insert the new node by calling itself on each child node.
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });
    return { ...tree, items: latestNode };
  };
  const editNode = function (tree, commentId, value) {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }
    tree.items.map((ob) => {
      return editNode(ob, commentId, value);
    });
    return { ...tree };
  };
  const deleteNode = function (tree, id) {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };
  return { insertNode, editNode, deleteNode };
};

export default useNode;
