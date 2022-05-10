# Trees: Height of Binary Tree

[Problem](https://www.hackerrank.com/challenges/tree-height-of-a-binary-tree/problem)

Category: Trees

Difficulty: Easy

---

Determine the height of a given binary tree.

Input: the root of a binary tree with $n$ nodes.

\[ 1 \leq n \leq 20 \]

```
class Node {
    int data;
    Node* left;
    Node* right;
}
```

Output: the height of the tree, or the number of edges along the longest path
from the root to a leaf node.

The height of a tree is best found recursively. If the root is a leaf node,
then its height is 0. Otherwise, the height of the tree is either the height
of the left subtree plus 1, or the height of the right subtree plus 1, whichever
is larger. The longest path to a leaf node is either on the left side or the
right side of the tree.

It is useful to define the height of a null tree as -1. This way, the height of
the left/right subtree plus 1 evaluates to 0 if there is no left/right subtree.
This is okay because the original tree is guaranteed to have at least one node.

Java 8:
```java
public static int height(Node root) {
    if (root == null) {
        return -1;
    }
    
    return 1 + Math.max(height(root.left), height(root.right));
}
```

C++:
```cpp
int height(Node* root) {
    if (!root) {
        return -1;
    }
    
    return 1 + max(height(root->left), height(root->right));
}
```

Python 3:
```python
def height(root):
    if not root:
        return -1
    
    return 1 + max(height(root.left), height(root.right))
```

[Back](../../hackerrank.md)
