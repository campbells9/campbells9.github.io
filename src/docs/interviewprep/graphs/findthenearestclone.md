# Find the Nearest Clone

[Problem](https://www.hackerrank.com/challenges/find-the-nearest-clone/problem)

Category: Graphs

Difficulty: Medium

---

On a graph where each vertex has a color, given a specific color, determine the
length of the shortest path between any two vertices of that color.

Input: a number of vertices $n$, two arrays $g_t[m]$ and $g_f[m]$ where each
pair $(g_t[i], g_f[i])$ is an edge in the graph, a color array $c[n]$ that
represents the color of each vertex as an integer, and a target color $c_t$.

\[ 1 \leq n, m \leq 10^6 \]

\[ 1 \leq g_t[i], g_f[i] \leq n \; \; \forall \; i \]

\[ 1 \leq c[i] \leq 10^8 \; \; \forall \; i \]

Output: the length of the shortest path that connects any two vertices of color
$c_t$, or $-1$ if no such path exists.

For any vertex $u$ with $c[u] = c_t$, it would be relatively easy to find which
other $c_t$-colored vertex $v$ is closest to it with a
[breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search). So
you could first find every $c_t$-colored vertex, start a BFS from each one to
find its closest $c_t$-colored neighbor, and determine which pair has the
shortest path between them. However, we can avoid doing multiple searches over
the same edges of the graph.

Let $d[v]$ be how far vertex $v$ is from the closest $c_t$-colored vertex in the
graph. Consider how you might calculate $d[v]$ for every vertex $v$. First, you
could find all of the vertices $v$ with $c[v] = c_t$ and mark them with
$d[v] = 0$. Then, you could find all of their unmarked neighbors and mark them
with $d[v] = 1$, mark the unmarked neighbors of those vertices with $d[v] = 2$,
and so on. You can imagine grouping the vertices in layers, where $L_0$ is the
set of the $c_t$-colored vertices, $L_1$ is the set of vertices one hop away
from a $c_t$-colored vertex, $L_2$ is two hops away, and $L_i$ is $i$ hops away
for any $i$.

When you are exploring the neighbors of some vertex $u$, for which you have
already determined $d[u]$, what does it mean when you encounter a vertex $v$ you
have already visited and calculated $d[v]$ for? It means there must exist a path
that starts at some $s$ with $c[s] = c_t$, traverses $d[u]$ edges to get to $u$,
hops from $u$ to $v$, and then traverses $d[v]$ edges to some $s'$ with
$c[s'] = c_t$. This might lead you to believe that the first time we encounter
this situation, we can conclude that $d[u] + 1 + d[v]$ is the shortest path
length between any two $c_t$-colored vertices. However, there are two issues we
must address:

1. How do we know the path from $s$ to $u$ doesn't share any edges with the path
from $v$ to $s'$?
2. How do we know $s$ and $s'$ are not the same $c_t$-colored vertex?

Luckily, problem 1 takes care of itself. If the path from $s$ to $u$ shares an
edge with the path from $v$ to $s'$, they must join at some intermediate vertex
$w$, and we must have already explored that vertex since it should have
$d[w] < d[u]$ and $d[w] < d[v]$. Problem 2 requires some extra work because we
don't want to mistake a cycle with only one $c_t$-colored vertex for a path
between two distinct $c_t$-colored vertices. As we discover each vertex $v$, we
can store $\text{prev}[v]$, the index of the $c_t$-colored vertex that is $d[v]$
hops away. Then, we can look for the first time we explore a $u$ with an
already-marked neighbor $v$ and $\text{prev}[u] \neq \text{prev}[v]$.

Java 8:
```java
public static int findShortest(int graphNodes, int[] graphFrom, int[] graphTo,
                               long[] ids, int val) {
    List<Set<Integer>> adjSets = new ArrayList<>();
    for (int i = 0; i < graphNodes; i++) {
        adjSets.add(new HashSet<>());
    }
    
    int edges = graphFrom.length;
    for (int i = 0; i < edges; i++) {
        int u = graphFrom[i] - 1;
        int v = graphTo[i] - 1;
        adjSets.get(u).add(v);
        adjSets.get(v).add(u);
    }
    
    return bfs(adjSets, ids, val);
}

private static int bfs(List<Set<Integer>> adjSets, long[] ids, int color) {
    int n = ids.length;
    int[] distance = new int[n];
    int[] prev = new int[n];
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < n; i++) {
        if (ids[i] == color) {
            distance[i] = 0;
            prev[i] = i;
            q.add(i);
        } else {
            prev[i] = -1;
        }
    }
    while (!q.isEmpty()) {
        int node = q.remove();
        for (int neighbor : adjSets.get(node)) {
            if (prev[neighbor] == -1) {
                distance[neighbor] = distance[node] + 1;
                prev[neighbor] = prev[node];
                q.add(neighbor);
            } else if (prev[neighbor] != prev[node]) {
                return distance[node] + distance[neighbor] + 1;
            }
        }
    }
    
    return -1;
}
```

C++:
```cpp
int bfs(vector<set<int>>&, vector<long>&, int);
 
int findShortest(int graph_nodes, vector<int> graph_from, vector<int> graph_to,
                 vector<long> ids, int val) {
    vector<set<int>> adjSets(graph_nodes);
    int edges = graph_from.size();
    for (int i = 0; i < edges; i++) {
        int u = graph_from[i] - 1;
        int v = graph_to[i] - 1;
        adjSets[u].insert(v);
        adjSets[v].insert(u);
    }
    
    return bfs(adjSets, ids, val);
}

int bfs(vector<set<int>>& adjSets, vector<long>& ids, int color) {
    int n = ids.size();
    vector<int> distance(n);
    vector<int> prev(n);
    queue<int> q;
    for (int i = 0; i < n; i++) {
        if (ids[i] == color) {
            distance[i] = 0;
            prev[i] = i;
            q.push(i);
        } else {
            prev[i] = -1;
        }
    }
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        auto adj = &adjSets[u];
        for (auto neighbor = adj->begin(); neighbor != adj->end(); neighbor++) {
            int v = *neighbor;
            if (prev[v] == -1) {
                distance[v] = distance[u] + 1;
                prev[v] = prev[u];
                q.push(v);
            } else if (prev[v] != prev[u]) {
                return distance[u] + 1 + distance[v];
            }
        }
    }
    
    return -1;
}
```

Python 3:
```python
def findShortest(graph_nodes, graph_from, graph_to, ids, val):
    def bfs(adj_sets):
        from collections import deque
        
        distance = [0 for _ in ids]
        prev = [v if c == val else -1 for v, c in enumerate(ids)]
        queue = deque(v for v, c in enumerate(ids) if c == val)
        while queue:
            u = queue.popleft()
            for v in adj_sets[u]:
                if prev[v] == -1:
                    distance[v] = distance[u] + 1
                    prev[v] = prev[u]
                    queue.append(v)
                elif prev[v] != prev[u]:
                    return distance[u] + 1 + distance[v]
                    
        return -1
    
    adj_sets = [set() for _ in ids]
    for g_f, g_t in zip(graph_from, graph_to):
        u, v = g_f - 1, g_t - 1
        adj_sets[u].add(v)
        adj_sets[v].add(u)
    
    return bfs(adj_sets)
```

[Back](../../hackerrank.md)
