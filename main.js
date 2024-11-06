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
    // Sort the array within this method
    const sortedArray = array.sort((a, b) => a - b);
    console.log(`Sorted Array by value : ${sortedArray}`)
    const alreadySeen = {};
    for ( let i = 0; i < sortedArray.length; i++) {
        if ( sortedArray[i] === sortedArray[i + 1] ){
            sortedArray.splice(i, 1)
        }
    }
    console.log(`Sorted Array by value and duplicates removed ${sortedArray}`);
    return this.buildTree(sortedArray, 0, sortedArray.length - 1);
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
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
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

    return root; // Return the unchanged root pointer
  }
  // Function to get successor for deleteItem function                      // <root> <left> <right> PreOrder
  getSuccessor(current) {                                                  //  <left> <root> <right> InOrder
    current = current.right;                                              //   <left> <right> <root> PostOrder
    while (current !== null && current.left !== null) {
        current = current.left;
    }
    return current;
  }
  deleteItem(root, value) {
    // Base Case 
    if (root === null) {
        return root;
    }
    // If key to be searched is in a subtree
    if (root.data > value){
        root.left = this.deleteItem(root.left, value);
    }else if( root.data < value) {
        root.right = this.deleteItem(root.right, value);
    }else {
        // If root matches with the given key
    
        // Cases when root has 0 children or only right child
        if(root.left === null) return root.right;
        // When root has only left child
        if(root.right === null) return root.left;
        // When both children are present
        let succesor = this.getSuccessor(root);
        root.data = succesor.data;
        root.right = this.deleteItem(root.right, succesor.data);
    }
    return root;
  }
}

// Example usage
const array2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();

// Sort the array first, then build the tree
let root = tree.sortArray(array2);

// Pretty print the BST structure
tree.prettyPrint(root);
// const newNodeRoot = tree.insert(root, 82);
// tree.prettyPrint(newNodeRoot);
root = tree.deleteItem(root, 67);
tree.prettyPrint(root);


// Duplicate 7, 9, 4