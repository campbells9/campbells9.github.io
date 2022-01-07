# Binary Search Tree: Lowest Common Ancestor

[Problem](https://www.hackerrank.com/challenges/binary-search-tree-lowest-common-ancestor/problem)

Category: Trees

Difficulty: Easy

---

Given two values in a binary search tree, find their lowest common ancestor.

Input: the root of a binary search tree with $n$ nodes, and two values
$v_1, v_2$ from the tree.

$1 \leq n \leq 25$

$1 \leq v_1, v_2 \leq 25, \; v_1 \neq v_2$

```
class Node {
    int data;
    Node* left;
    Node* right;
}
```

Output: the lowest common ancestor node of $v_1$ and $v_2$ in the tree. If node
$k$ is an ancestor of node $v$, then the subtree with root $k$ contains $v$, and
the path from the root to $v$ passes through $k$. The lowest common ancestor is
the highest-depth node (lowest in the tree) that is both an ancestor to $v_1$
and $v_2$.

The key observation for this problem is that the answer depends on how the root
node's value compares to $v_1$ and $v_2$. If one of the values is in the left
subtree and the other value is in the right subtree, then the root is the lowest
common ancestor. If the root's value is equal to $v_1$ or $v_2$, then the root
is also the lowest common ancestor. In these cases, there is no lower common
ancestor than the root beacuse no subtrees contain both $v_1$ and $v_2$. If
neither of these conditions are true, then either both values are in the left
subtree or both values are in the right subtree, so their common ancestor is
also in that subtree.

You can determine whether $v_1$ and $v_2$ are to the left or the right of the
root because the tree is a binary search tree: all values less than the root's
value are in the left subtree, and all values greater than the root's value are
in the right subtree.

Java 8:
```java
public static Node lca(Node root, int v1, int v2) {
    if (root.data == v1 || root.data == v2) {
        return root;
    }
    
    if (root.data > v1 && root.data > v2) {
        return lca(root.left, v1, v2);
    }
    
    if (root.data < v1 && root.data < v2) {
        return lca(root.right, v1, v2);
    }
    
    return root;
}
```

C++:
```cpp
Node *lca(Node *root, int v1,int v2) {
    if (root->data == v1 || root->data == v2) {
        return root;
    }
    
    if (root->data > v1 && root->data > v2) {
        return lca(root->left, v1, v2);
    }
    
    if (root->data < v1 && root->data < v2) {
        return lca(root->right, v1, v2);
    }
    
    return root;
}
```

Python 3:
```python
def lca(root, v1, v2):
    if root.info == v1 or root.info == v2:
        return root

    if root.info > v1 and root.info > v2:
        return lca(root.left, v1, v2)
    
    if root.info < v1 and root.info < v2:
        return lca(root.right, v1, v2)
    
    return root
```

[Back](../../hackerrank.md)
