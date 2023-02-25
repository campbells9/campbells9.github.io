# Trees: Is This a Binary Search Tree?

[Problem](https://www.hackerrank.com/challenges/ctci-is-binary-search-tree/problem)

Category: Trees

Difficulty: Medium

---

Determine if a given binary tree is valid as a binary search tree.

Input: the root of a binary tree. For each node $n$,

\[ 0 \leq n.\text{data} \leq 10^4 \]

```
class Node {
    int data;
    Node* left;
    Node* right;
}
```

Output: ```true``` if the tree is a binary search tree and ```false```
otherwise. The tree is a binary search tree if and only if:

* every node has a unique data value.
* each node's data value is greater than the data values of all the nodes in its
left subtree.
* each node's data value is less than the data values of all the nodes in its
right subtree.

Aside: A [binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree)
is a useful data structure because searching for specific values is similar to
performing a binary search on a sorted array. If you want to know whether a data
value $x$ is present in the tree, you start at the root and compare $x$ to the
root's data value $d$. If $x < d$, $x$ can only be in the left subtree. If
$x > d$, $x$ can only be in the right subtree. If $x = d$, you've found it.
Repeat until you've found the value $x$, or you've reached a point where the
only subtree that can contain it is empty and you can conclude $x$ is not
present. Assuming the tree of $n$ values is balanced well, you get $O(\log n)$
search complexity, though you will need to
[rebalance](https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree) the
tree upon insertions and deletions to keep this bound (to imagine why, consider
that a sorted linked list with the minimum value at the head would count as a
valid "degenerate" binary search tree).

Anyway, whether or not a given binary tree is a binary search tree depends on
the answers to the following questions:

1. Is the left subtree a binary search tree?
2. Is the right subtree a binary search tree?
3. Is the root's data value strictly greater than the maximum value of the left
subtree?
4. Is the root's data value strictly less than the minimum value of the right
subtree?

If the answer to all four questions is yes, the answer is `true`, and if the
answer to any question is no, the answer is `false`. To consider how we might
answer questions 3 and 4, assume we know for a given tree that 1 and 2 are true.
If we want the maximum value in a binary search tree, we can start at the root
and go to the right until we can't go right anymore. Recursively, the maximum
value of the BST is the maximum value of the right subtree, or the value of the
root if the right subtree is empty. Likewise, we can find the minumum value by
going as far to the left as possible until we reach a node with an empty left
subtree.

We could use these observations to write a recursive solution, but I think there
is a more intuitive solution involving the tree's
[inorder traversal](https://en.wikipedia.org/wiki/Tree_traversal#Inorder_traversal).
If we do an inorder traversal of a binary search tree and add every data value
to a list, we should find that the list is sorted in ascending order with no
duplicates. So if we perform an inorder traversal over the given binary tree, we
should be able to determine whether the resulting list of values corresponds to
a binary search tree (each value is stricly greater than the previous).

I use the inorder traversal approach for the Java, C++, and Python solutions.
For Python, Alternate Solution 1 demonstrates how you can return early if you
find a violation during the inorder traversal instead of completing the entire
traversal and checking the result. Alternate Solution 2 demonstrates a recursive
solution that checks the four questions listed above.

Note: as of February 2023, the Java 7 and 8 templates for this problem are
broken because because the `Solution` class is missing. Java 15 doesn't have
this problem, but it doesn't provide the boilerplate code for reading in the
input and building the tree. Luckily, if you look at the input format, you'll
notice that the tree is already represented as an inorder traversal, which makes
the problem significantly easier.

Java 15:
```java
public static void main(String[] args) {
    Scanner console = new Scanner(System.in);
    console.nextInt(); // always 2?
    
    int prev = console.nextInt();
    boolean valid = true;
    while (console.hasNextInt() && valid) {
        int next = console.nextInt();
        if (prev >= next) {
            valid = false;
        }
        prev = next;
    }
    System.out.println(valid ? "Yes" : "No");
}
```

C++:
```cpp
bool checkBST(Node* root) {
    vector<int> traversal;
    inorderTraversal(root, traversal);
    
    const int N = traversal.size();
    for (int i = 1; i < N; i++) {
        if (traversal[i - 1] >= traversal[i]) {
            return false;
        }
    }
    
    return true;
}

void inorderTraversal(Node* node, vector<int>& traversal) {
    if (node) {
        inorderTraversal(node->left, traversal);
        traversal.push_back(node->data);
        inorderTraversal(node->right, traversal);
    }
}
```

Python 3:
```python
def checkBST(root):
    def inorder_traversal(n, traversal):
        if n:
            inorder_traversal(n.left, traversal)
            traversal.append(n.data)
            inorder_traversal(n.right, traversal)
            
    traversal = []
    inorder_traversal(root, traversal)
    for first, second in zip(traversal[:-1], traversal[1:]):
        if first >= second:
            return False
        
    return True
```

Python 3 Alternate Solution 1:
```python
def checkBST(root):
    def inorder_traversal(n, traversal):
        if n:
            if not inorder_traversal(n.left, traversal):
                return False
            
            if traversal and traversal[-1] >= n.data:
                return False
            
            traversal.append(n.data)
            if not inorder_traversal(n.right, traversal):
                return False
            
        return True
            
    traversal = []
    return inorder_traversal(root, traversal)
```

Python 3 Alternate Solution 2:
```python
def max_value(n):
    return max_value(n.right) if n.right else n.data
    
def min_value(n):
    return min_value(n.left) if n.left else n.data

def checkBST(root):
    return not root or (
        checkBST(root.left) and checkBST(root.right)
        and (not root.left or max_value(root.left) < root.data)
        and (not root.right or min_value(root.right) > root.data)
    )
```

[Back](../../hackerrank.md)
