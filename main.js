import { Tree } from "./tree.js";


// Example usage
const array2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();

// Sort the array first, then build the tree
let root = tree.sortArray(array2);

// Pretty print the BST structure
// root = tree.insert(root, 0);
// tree.prettyPrint(newNodeRoot);
// root = tree.deleteItem(root, 67);
// tree.prettyPrint(root);
// console.log(tree.find(root, 4));

tree.prettyPrint(root);
console.log("PRE ORDER")
tree.preOrder(root);
console.log("IN ORDER");
tree.inOrder(root);
console.log("LEVEL ORDER");
tree.levelOrder(root);
console.log("POST ORDER");
tree.postOrder(root);

root = tree.insert(root, 0);
root = tree.insert(root, 12);
root = tree.insert(root, 33);
root = tree.insert(root, 42);
root = tree.insert(root, 288);
root = tree.insert(root, 333);
root = tree.insert(root, 38141);
root = tree.insert(root, 11);
tree.prettyPrint(root);

console.log(tree.height(root, 8));
tree.depth(root, 11);
tree.isBalanced(root);

tree.preOrder(root);
let reBalanced = tree.rebalance(root);
tree.prettyPrint(reBalanced);
tree.isBalanced(reBalanced);
