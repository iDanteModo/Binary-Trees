class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  // Push an element onto the stack
  push(element) {
    this.items.push(element);
  }

  // Pop an element off the stack
  pop() {
    if (this.isEmpty()) {
      return null; // or throw an error if needed
    }
    return this.items.pop();
  }

  // Peek at the top element of the stack without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get the size of the stack
  size() {
    return this.items.length;
  }

  // Clear the stack
  clear() {
    this.items = [];
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  // Add an element to the queue
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the front element without removing it
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Return the size of the queue
  size() {
    return this.items.length;
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
    console.log(`Sorted Array by value : ${sortedArray}`);
    for (let i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] === sortedArray[i + 1]) {
        sortedArray.splice(i, 1);
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
  
  inOrder(root) {
    if(root === null) return;
    this.inOrder(root.left);
    console.log(root.data);
    this.inOrder(root.right);
  }

  postOrder(root) {
    if (root === null) return;
    this.postOrder(root.left);
    this.postOrder(root.right);
    console.log(root.data);
  }
  levelOrder(root) {
    let queue = new Queue();
    queue.enqueue(root);  // Add the root to the queue
    
    // Then, in your level-order traversal function:
    while (!queue.isEmpty()) {
      let node = queue.dequeue();
      console.log(node.data);  // Process the node
      
      // Add children to the queue
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }
  }
  height(root, value) {
    let currentRoot = this.find(root, value); 
    let height = 0;
    console.log(currentRoot);
    while(currentRoot) {
      if(currentRoot.right){
        currentRoot = currentRoot.right;
        height ++;
      }else if (currentRoot.left){
        currentRoot = currentRoot.left;
        height ++;
      }else {
        console.log(`Height is ${height}`);
        return height;
      }
    }
    }
    depth(root, value, depth = 0){
      if(root.data === value){
        console.log(`Depth is ${depth}`);
        return depth;
      } 
      if(value < root.data && root.left){
        return this.depth(root.left ,value, depth + 1);
      }else if (value > root.data && root.right) {
        return this.depth(root.right, value, depth +1);
      }
    }
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
  // Function to get successor for deleteItem function   INORDER            // <root> <left> <right> PreOrder
  getSuccessor(current) {
    //  <left> <root> <right> InOrder
    current = current.right; // <left> <right> <root> PostOrder
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
    if (root.data > value) {
      root.left = this.deleteItem(root.left, value);
    } else if (root.data < value) {
      root.right = this.deleteItem(root.right, value);
    } else {
      // If root matches with the given key

      // Cases when root has 0 children or only right child
      if (root.left === null) return root.right;
      // When root has only left child
      if (root.right === null) return root.left;
      // When both children are present
      let succesor = this.getSuccessor(root);
      root.data = succesor.data;
      root.right = this.deleteItem(root.right, succesor.data);
    }
    return root;
  }
  find(root, value) {
    if (value === root.data) {
      console.log("FOUND IT ");
      return root;
    }
    if (value < root.data && root.left) {
      return this.find(root.left, value);
    } else if (value > root.data && root.right) {
      return this.find(root.right, value);
    }
    return false;
  }
}

// Example usage
const array2 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree();

// Sort the array first, then build the tree
let root = tree.sortArray(array2);

// Pretty print the BST structure
tree.prettyPrint(root);
// root = tree.insert(root, 0);
// tree.prettyPrint(newNodeRoot);
// root = tree.deleteItem(root, 67);
// tree.prettyPrint(root);
// console.log(tree.find(root, 4));

// console.log("PRE ORDER")
// tree.preOrder(root);
// console.log("IN ORDER");
// tree.inOrder(root);
// console.log("LEVEL ORDER");
// tree.levelOrder(root);
// console.log("POST ORDER");
// tree.postOrder(root);

tree.height(root, 324);
tree.depth(root, 8);
// Duplicate 7, 9, 4
