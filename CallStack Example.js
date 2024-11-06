class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Recursive function to construct BST // STACK MANNER LIDO 
function sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new Node(arr[mid]);

    // Create left subtree
    root.left = sortedArrayToBSTRecur(arr, start, mid - 1);

    // Create right subtree
    root.right = sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
}

function sortedArrayToBST(arr) {
    return sortedArrayToBSTRecur(arr, 0, arr.length - 1);
}

// Pre-order traversal to print the tree's nodes
function preOrder(root) {
    if (root === null) return;
    console.log(root.data);
    preOrder(root.left);
    preOrder(root.right);
}

// Method to display tree structure in a graphical format
function printTree(root, space = 0, count = 5) {
    if (root === null) return;

    // Increase distance between levels
    space += count;

    // Print right child first
    printTree(root.right, space);

    // Print current node after space
    console.log(" ".repeat(space - count) + root.data);

    // Print left child
    printTree(root.left, space);
}

// Test with an array
const arr = [1, 2, 3, 4, 5, 6, 7];
const root = sortedArrayToBST(arr);

console.log("Pre-order traversal:");
preOrder(root);

console.log("\nVisual representation of the tree:");
printTree(root);

// --------------------------

