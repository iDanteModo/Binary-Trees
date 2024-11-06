class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    buildTree(array, start, end) {
      if (start > end) return null;
  
      let mid = start + Math.floor((end - start) / 2);
      let root = new Node(array[mid]);
  
      root.left = this.buildTree(array, start, mid - 1);
      root.right = this.buildTree(array, mid + 1, end);
      return root;
    }
  
    // A method to sort the array and build the tree
    sortArray(array) {
      return this.buildTree(array, 0, array.length - 1);
    }
  
    // Preorder traversal: root, left, right
    preOrder(root) {
      if (root === null) return;
      console.log(root.data);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  
    // Method to pretty-print the tree structure
    prettyPrint(node, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
  
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
  
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  
    // Insert method to add a new node
    insert(root, key) {
      // If the root is null, insert the new node here
      if (root === null) {
        return new Node(key);
      }
  
      // If the key is already present, don't insert it again
      if (key === root.data) {
        return root;
      }
  
      // If the key is less than the root's data, insert it into the left subtree
      if (key < root.data) {
        root.left = this.insert(root.left, key);
      }
      // If the key is greater than the root's data, insert it into the right subtree
      else if (key > root.data) {
        root.right = this.insert(root.right, key);
      }
  
      return root;  // Return the unchanged root pointer
    }
  }
  
  // Example usage
  const array2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  const tree = new Tree();
  
  // Sort the array first, then build the tree
  const root = tree.sortArray(array2.sort((a, b) => a - b)); 
  
  // Pretty print the BST structure
  tree.prettyPrint(root);
  
  // Insert new node
  const newNodeRoot = tree.insert(root, 10);
  
  // Pretty print the tree after the new node insertion
  tree.prettyPrint(newNodeRoot);