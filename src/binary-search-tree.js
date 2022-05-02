const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.varRoot = null;
  }

  root() {
    if (!this.varRoot) {
      return null;
    }
    return this.varRoot;
  }

  add(data) {
    this.varRoot = addInside(this.varRoot, data);

    function addInside(node, data) {
      if(!node) {
        return new Node(data);
      }

      if(node.data === data) {
        return node;
      }

      if(data < node.data) {
        node.left = addInside(node.left, data);
      } else {
        node.right = addInside(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return hasInside(this.varRoot, data);

    function hasInside(node, data) {
      if(!node) return false;

      if(node.data === data) return true;
      
      return data < node.data
        ? hasInside(node.left, data)
        : hasInside(node.right, data);
      }
  }

  find(data) {
    return findInTree(this.varRoot, data);

    function findInTree(node, data) {
      if(!node) {
        return null;
      }

      if(node.data === data) {
        return node;
      }

      if(data < node.data) {
        return findInTree(node.left, data);
      } else {
        return findInTree(node.right, data);
      }
    }
  }

  remove(data) {
    this.varRoot = removeNode(this.varRoot, data);

    function removeNode(node, data) {
      if(!node) {
        return null;
      }

      if(data < node.data) {
        node.left =  removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if(!node.left && !node.right) {
          return null;
        }

        if(!node.left) {
          node = node.right;
          return node;
        }

        if(!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while(minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        
        node.right = removeNode(node.right, minRight.data);

        return node;
      }

      
    }
  }

  min() {
    if(!this.varRoot) {
      return;
    }

    let node = this.varRoot;
    while(node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if(!this.varRoot) {
      return;
    }

    let node = this.varRoot;
    while(node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};