class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        const sortArr = [...new Set(arr)].sort((a, b) => a - b);
        return this.recursiveBuild(sortArr, 0, sortArr.length - 1);
    }

    recursiveBuild(arr, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.recursiveBuild(arr, start, mid - 1);
        node.right = this.recursiveBuild(arr, mid + 1, end);
        
        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return "";
          }
  
          const right = this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
          const current = `${prefix}${isLeft ? "└── " : "┌── "}${node.value}\n`;
          const left = this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  
          const result = right + current + left;
  
          return result;
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
        } else {
            this.recursiveInsert(value, this.root);
        }
    }

    recursiveInsert(value, curr) {
        if (value === curr.value) {
            return;
        }

        if (value < curr.value) {
            if (curr.left === null) {
                curr.left = new Node(value);
            } else {
                this.recursiveInsert(value, curr.left);
            }
        } else {
            if (curr.right === null) {
                curr.right = new Node(value);
            } else {
                this.recursiveInsert(value, curr.right);
            }
        }
    }

    delete(value) {
        const result = this.recursiveDelete(value, this.root, null);

        if (result === null) {
            return;
        }


        if (result.curr.right === null && result.curr.left === null) {
            if (result.curr != this.root) {
                if (result.parent.left === result.curr) {
                    result.parent.left = null;
                }
                else {
                    result.parent.right = null;
                }
            } else {
                this.root = null;
            }

        } else if (result.curr.left === null || result.curr.right === null) {
            if (result.curr != this.root) {
                if (result.parent.left === result.curr) {
                    if (result.curr.left != null) {
                        result.parent.left = result.curr.left;
                    } else {
                        result.parent.left = result.curr.right;
                    }
                }
                else {
                    if (result.curr.left != null) {
                        result.parent.right = result.curr.left;
                    } else {
                        result.parent.right = result.curr.right;
                    }
                }
            } else {
                if (result.curr.left != null) {
                    this.root = result.curr.left;
                } else {
                    this.root = result.curr.right;
                }
            }

        } else {
            const replace = this.recursiveReplace(result.curr.right, result.curr);

            if (result.curr.left != null) {
                replace.curr.left = result.curr.left;
            }
            if (result.curr.right != null && result.curr.right != replace.curr) {
                replace.curr.right = result.curr.right;
            }

            if (result.curr != this.root) {
                if (result.parent.left === result.curr) {
                    result.parent.left = replace.curr;
                } else {
                    result.parent.right = replace.curr;
                }
            } else {
                this.root = replace.curr;
            }
    
            if (replace.parent.left === replace.curr) {
                replace.parent.left = null;
            } else {
                replace.parent.right = null;
            }
        }
    }

    recursiveReplace(curr, parent) {
        if (curr.left !== null) {
            return this.recursiveReplace(curr.left, curr);
        }
        else {
            return { curr, parent };
        }
    }

    recursiveDelete(value, curr, parent) {
        if (curr === null) {
            return null;
        }

        if (value === curr.value) {
            return { curr, parent };
        }
        const leftDelete = this.recursiveDelete(value, curr.left, curr);
        if (leftDelete !== null) {
            return leftDelete;
        }
        return this.recursiveDelete(value, curr.right, curr);
    }

    find(value) {
        return this.recursiveFind(value, this.root);
    }

    recursiveFind(value, curr) {
        if (curr === null) {
            return null;
        }
        if (value === curr.value) {
            return curr;
        }
        const leftResult = this.recursiveFind(value, curr.left);
        if (leftResult !== null) {
            return leftResult;
        }
        return this.recursiveFind(value, curr.right);
    }

    levelOrder(callback) {
        if (!this.root) {
            return [];
        }
    
        const result = [];
        let queue = [this.root];
    
        while (queue.length) {
            const current = queue.shift();

            if (callback) {
                result.push(callback(current));
            } else {
                result.push(current.value);
            }
    
            if (current.left) {
                queue.push(current.left);
            }
    
            if (current.right) {
                queue.push(current.right);
            }
        }
    
        return result;
    }
    
    inOrder(callback) {
        const result = [];
        this.recursiveInOrder(this.root, callback, result);
        return result;
    }

    recursiveInOrder(node, callback, result) {
        if (node !== null) {
            this.recursiveInOrder(node.left, callback, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.recursiveInOrder(node.right, callback, result);
        }
    }

    preOrder(callback) {
        const result = [];
        this.recursivePreOrder(this.root, callback, result);
        return result;
    }

    recursivePreOrder(node, callback, result) {
        if (node !== null) {
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }
            this.recursivePreOrder(node.left, callback, result);
            this.recursivePreOrder(node.right, callback, result);
        }
    }

    postOrder(callback) {
        const result = [];
        this.recursivePostOrder(this.root, callback, result);
        return result;
    }

    recursivePostOrder(node, callback, result) {
        if (node !== null) {
            this.recursivePostOrder(node.left, callback, result);
            this.recursivePostOrder(node.right, callback, result);
            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

        }
    }

    height(node) {
        const findNode = this.recursiveFind(node, this.root);
        return this.recursiveHeight(findNode);
    }

    recursiveHeight(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.recursiveHeight(node.left);
        const rightHeight = this.recursiveHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        return this.recursiveDepth(node, this.root);
    }

    recursiveDepth(tarNode, currNode, currDepth = 0) {
        if (currNode === null) {
            return -1;
        }

        if (currNode.value === tarNode) {
            return currDepth;
        }

        const leftDepth = this.recursiveDepth(tarNode, currNode.left, currDepth + 1);
        const rightDepth = this.recursiveDepth(tarNode, currNode.right, currDepth + 1);

        if (leftDepth !== -1) {
            return leftDepth;
        }
        return rightDepth;
    }

    isBalanced() {
        return this.recursiveIsBalanced(this.root);
    }

    recursiveIsBalanced(node) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.recursiveHeight(node.left);
        const rightHeight = this.recursiveHeight(node.right);

        const isLeftBalanced = this.recursiveIsBalanced(node.left);
        const isRightBalanced = this.recursiveIsBalanced(node.right);

        const isCurrentBalanced = Math.abs(leftHeight - rightHeight) <= 1;

        return isLeftBalanced && isRightBalanced && isCurrentBalanced;
    }

    rebalance() {
        const result = this.levelOrder();
        this.root = this.buildTree(result);
    }
}

export { Node, Tree };

/*
const randomArray = new Array(15).fill(0).map(() => Math.floor(Math.random() * 20));
const tree = new Tree(randomArray);
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
tree.insert(25);
tree.insert(30);
tree.insert(40);
tree.insert(60);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

*/