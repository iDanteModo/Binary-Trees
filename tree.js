import { Node } from "./node.js";
import {Queue } from "./queue.js";


export class Tree {
  constructor(array) {
    const sortedArray = [... new Set(array)].sort((a,b) => a - b);
    this.root= this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }
  buildTree(array) {
    if (array.length === 0) return null;

    let midIndex =  Math.floor(array.length / 2);
    let midValue = array[midIndex];
    let node = new Node(midValue)

    let left = array.slice(0, midIndex);
    let right = array.slice(midIndex + 1);

    node.left = this.buildTree(left);
    node.right = this.buildTree(right);

    return node
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
    preOrder(root, newArray = []) {
      if (root === null) return newArray;
      newArray.push(root.data);
      // console.log(root.data);
      this.preOrder(root.left, newArray);
      this.preOrder(root.right, newArray);
      return newArray;
    }
  
    inOrder(root) {
      if (root === null) return;
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
      let nodesTraverse = 0;
      let height = 0;
      queue.enqueue(root); // Add the root to the queue
  
      // Then, in your level-order traversal function:
      while (!queue.isEmpty()) {
        let node = queue.dequeue();
        console.log(node.data); // Process the node
        // Add children to the queue
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
    }
    height(root, target) {
      // Base case: if the root is null, return -1 (height of an empty subtree)
      if (root === null) {
        return -1;
      }
  
      // If we find the target node, calculate the height from this node
      if (root.data === target) {
        return this.calculateHeight(root);
      }
  
      // Recursively search for the node in the left and right subtrees
      if (target < root.data) {
        return this.height(root.left, target);
      } else {
        return this.height(root.right, target);
      }
    }
  
    // Helper function to calculate the height of a node
    calculateHeight(node) {
      if (node === null) {
        return -1;
      }
  
      let leftHeight = this.calculateHeight(node.left);
      let rightHeight = this.calculateHeight(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(root, value, depth = 0) {
      if (root.data === value) {
        console.log(`Depth of ${value} is ${depth}`);
        return depth;
      }
      if (value < root.data && root.left) {
        return this.depth(root.left, value, depth + 1);
      } else if (value > root.data && root.right) {
        return this.depth(root.right, value, depth + 1);
      }
    }
    isBalanced(root) {
      let leftRootSize = this.height(root, root.left.data);
      let rightRootSize = this.height(root, root.right.data);
      console.log(`Left size ${leftRootSize} Right Size ${rightRootSize}`);
      let difference = leftRootSize - rightRootSize;
      console.log(
        `Left Size ${leftRootSize} // Right Size ${rightRootSize} Difference is ${difference}`
      );
      if (difference <= 1 && difference >= -1) {
        console.log("Balanced");
        return true;
      }
      console.log("Unbalanced");
      return false;
    }
    rebalance(root){
      let balancedTree = this.preOrder(root);
      return root = this.buildTree(balancedTree, 0, balancedTree.length - 1);
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