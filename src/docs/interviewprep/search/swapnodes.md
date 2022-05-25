# Swap Nodes [Algo]

[Problem](https://www.hackerrank.com/challenges/swap-nodes-algo/problem)

Category: Search

Difficulty: Medium

---

Given a binary tree and a list of swap queries, report the state of the tree
after fulfilling each query.

Input: a binary tree with $n$ nodes represented by an $n \times 2$ array $T$,
and an array $q[t]$ of $t$ queries. Each node $i$ for $1 \leq i \leq n$ has left
child $T_{i, \ell}$ and right child $T_{i, r}$, either of which can be $-1$ if
no such child exists. Also, node 1 is the root, and each node has a lower index
than its children.

\[ 1 \leq n \leq 2^{10} \]

\[ T_{i, \ell}, T_{i, r} \in \{-1, i + 1, i + 2, \ldots, n\} \; \; \forall \; i \]

\[ 1 \leq t \leq 100 \]

\[ 1 \leq q[i] \leq n \; \; \forall \; i \]

Output: a list of $t$ inorder traversals of the tree, one after each of the $t$
swap queries is fulfilled. Each swap query $k$ should swap the left and right
subtrees of every node whose depth is a multiple of $k$ (the root has depth 1).
Each inorder traversal is a list of the nodes 1 through $n$. If you are not
familiar with pre-order, post-order, or inorder traversals, they are useful
conventions for doing a
[depth-first search on a binary tree](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search).
Inorder traversal means that for each node you discover, you traverse its entire
left subtree first, then add the node to the traversal, and then traverse the
entire right subtree.

The tree representation given to us in this problem (an $n \times 2$ array) is
nice because we can access any node by index without having to search for it
from the root. Still, it would be a pain if, say for a query $k = 2$, we had to
do a breadth-first search to find and swap the children of every node with depth
2, 4, 6, and so on. It would be nice if we could look up the indices of every
node with depth $k$, because if we know that, it is easy to index into the tree
and swap the children of each node. Note that swapping never changes a node's
parent, so it never changes the depth of any node.

I used a table that maps each possible depth 1 through $n$ to the set of nodes
at that depth. To populate the sets in this table, you search the tree and
calculate each node's depth. Since every node has a lower index than its
children, you can use an even simpler dynamic programming approach: set
$d[1] \gets 1$ for the root, and for each node $i = 1 \ldots n$, set its
children's depths to $d[i] + 1$.

Once you have populated your depth lookup data structure, for each query $k$ and
each integer $m \geq 1$ such that $mk \leq n$, you need to look up the set of
nodes with depth $mk$ and swap the left and right indices of each. Then, build
the inorder traversal of the tree and append it to the output list. The inorder
traversal is easiest to implement recursively, as the inorder traversal of any
tree is ```inorderTraversal(left) + root + inorderTraversal(right)```.

Note that the indices of the given tree are one-based. In Java and C++, I use a
copy of the tree that has an extra element at the front so that I can use the
one-based index values in the tree to index into the tree itself, but this is
definitely not required. Depending on how you handle this, you will probably
need to watch out for off-by-one indexing errors.

Java 8:
```java
public static List<List<Integer>> swapNodes(List<List<Integer>> indexes,
                                            List<Integer> queries) {
    int n = indexes.size();
    int[][] tree = new int[n + 1][2];
    int index = 1;
    for (List<Integer> pair : indexes) {
        tree[index][0] = pair.get(0);
        tree[index][1] = pair.get(1);
        index++;
    }
    
    int[] depths = new int[n + 1];
    List<Set<Integer>> depthLookup = new ArrayList<>();
    for (int i = 0; i <= n; i++) {
        depthLookup.add(new HashSet<>());
    }
    depths[1] = 1;
    depthLookup.get(1).add(1);
    for (int i = 1; i <= n; i++) {
        int left = tree[i][0];
        int right = tree[i][1];
        int nextDepth = depths[i] + 1;
        if (left != -1) {
            depths[left] = nextDepth;
            depthLookup.get(nextDepth).add(left);
        }
        if (right != -1) {
            depths[right] = nextDepth;
            depthLookup.get(nextDepth).add(right);
        }
    }
    
    List<List<Integer>> result = new LinkedList<>();
    for (int query : queries) {
        int k = query;
        while (k <= n) {
            for (int node : depthLookup.get(k)) {
                swap(tree, node);
            }
            k += query;
        }
        
        List<Integer> traversal = new LinkedList<>();
        inorderTraversal(traversal, tree, 1);
        result.add(traversal);
    }
    
    return result;
}

private static void swap(int[][] tree, int node) {
    int temp = tree[node][0];
    tree[node][0] = tree[node][1];
    tree[node][1] = temp;
}

private static void inorderTraversal(List<Integer> traversal, int[][] tree,
                                     int root) {
    if (root != -1) {
        inorderTraversal(traversal, tree, tree[root][0]);
        traversal.add(root);
        inorderTraversal(traversal, tree, tree[root][1]);
    }
}
```

C++:
```cpp
void inorderTraversal(vector<int>&, vector<pair<int, int>>&, int);

vector<vector<int>> swapNodes(vector<vector<int>> indexes, 
                              vector<int> queries) {
    vector<pair<int, int>> tree;
    tree.emplace_back();
    for (auto index = indexes.begin(); index != indexes.end(); index++) {
        tree.emplace_back(index->at(0), index->at(1));
    }
    
    int n = indexes.size();
    vector<int> depths(n + 1);
    vector<set<int>> depthLookup(n + 1);
    depths[1] = 1;
    depthLookup[1].insert(1);
    for (int i = 1; i <= n; i++) {
        int left = tree[i].first;
        int right = tree[i].second;
        int nextDepth = depths[i] + 1;
        if (left != -1) {
            depths[left] = nextDepth;
            depthLookup[nextDepth].insert(left);
        }
        if (right != -1) {
            depths[right] = nextDepth;
            depthLookup[nextDepth].insert(right);
        }
    }
    
    vector<vector<int>> result;
    for (auto query = queries.begin(); query != queries.end(); query++) {
        int k = *query;
        while (k <= n) {
            set<int>* depthSet = &depthLookup[k];
            for (auto node = depthSet->begin(); node != depthSet->end();
                                                node++) {
                swap(tree[*node].first, tree[*node].second);
            }
            k += *query;
        }
        
        vector<int> traversal;
        inorderTraversal(traversal, tree, 1);
        result.push_back(traversal);
    }
    
    return result;
}

void inorderTraversal(vector<int>& traversal, vector<pair<int, int>>& tree,
                      int root) {
    if (root != -1) {
        inorderTraversal(traversal, tree, tree[root].first);
        traversal.push_back(root);
        inorderTraversal(traversal, tree, tree[root].second);
    }
}
```

For Python, the simple recursive implementation of inorder traversal was
exceeding the recursion limit for some test cases, so I wrote it without
recursion. It's the same idea as the recursive implementation, but instead of
handling nodes in the right order with the call stack by making recursive calls
in the right order, we are using an explicit stack and pushing node indices onto
it. Starting with the root, we make an ```inorder_push``` to the stack, which
pushes the node and its children in reverse order (right child, parent, left
child) so that they will be popped in the correct order. We use a list of
boolean flags to keep track of which nodes we have done an ```inorder_push```
on. Until the stack is empty and the traversal is complete, we pop each node
from the stack and do an ```inorder_push``` for that node if we haven't before
or append it to the traversal if we have. This method is a bit longer and harder
to write than the recursive method, but it scales better for large trees by
avoiding making tons of recursive calls.

Python 3:
```python
def swapNodes(indexes, queries):
    tree = tuple(indexes)
    n = len(tree)
    depths = [0] * (n + 1)
    depth_lookup = [set()]
    for _ in depths:
        depth_lookup.append(set())
    depths[1] = 1
    depth_lookup[1].add(1)
    for i, node in enumerate(tree):
        left, right = node
        next_depth = depths[i + 1] + 1
        if left != -1:
            depths[left] = next_depth
            depth_lookup[next_depth].add(left)
        if right != -1:
            depths[right] = next_depth
            depth_lookup[next_depth].add(right)
            
    result = []
    for query in queries:
        k = query
        while k <= n:
            for node in depth_lookup[k]:
                tree[node - 1].reverse()
            k += query
        result.append(inorder_traversal(tree))
        
    return result
    
def inorder_traversal(tree):
    visited = [False] * (len(tree) + 1)
    stack = []
    
    def inorder_push(node):
        left, right = tree[node - 1]
        if right != -1:
            stack.append(right)
        stack.append(node)
        if left != -1:
            stack.append(left)
        visited[node] = True
        
    traversal = []
    inorder_push(1)
    while stack:
        node = stack.pop()
        if visited[node]:
            traversal.append(node)
        else:
            inorder_push(node)
            
    return traversal
```

[Back](../../hackerrank.md)
