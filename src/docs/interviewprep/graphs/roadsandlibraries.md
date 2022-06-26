# Roads and Libraries

[Problem](https://www.hackerrank.com/challenges/torque-and-development/problem)

Category: Graphs

Difficulty: Medium

---

Given a set of cities and a set of roads that can be built between the cities,
find the minimum cost required to give every city access to a library.

Input: a number of cities $n$, the cost of a library $\ell$, the cost of a road
$r$, and a list $E$ of unique pairs of cities $(e_1, e_2)$ that roads can be
built to connect.

\[ 1 \leq n, \ell, r \leq 10^5 \]

\[ E \subset \{1, 2, \ldots, n\} \times \{1, 2, \ldots, n\} \]

\[ e_1 \neq e_2 \; \; \forall \; (e_1, e_2) \in E \]

Output: the minimum cost of providing all $n$ cities with access to libraries.
A library can be built in a city, and a road can be built between any pair of
cities in $E$. A city has access to a library if either a library was built in
it or there are roads connecting it to a city with a library.

Consider a [connected component](https://en.wikipedia.org/wiki/Component_(graph_theory))
of the graph with vertices $\{1, 2, \ldots, n\}$ and edges $E$. For each city in
the component, the component encompasses all of the other cities that city could
potentially reach by roads. Suppose the connected component has $c$ cities. If
we built roads to connect all $c$ of the cities, we would need to build $c - 1$
roads (think a [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree)
of that connected component) and one library, paying $(c - 1)r + \ell$. An
alternative is to just give every city its own library and build no roads at
all, paying $c\ell$. Between these two strategies, we take the one that costs
less for each connected component.

Let $C_1, C_2, \ldots C_m$ be the disjoint connected components of
$\{1, 2, \ldots, n\}$. The optimum cost is:

\[ \sum_{i=1}^m (\left|C_i\right| - 1)\min(r, \ell) + \ell \]

Knowing this, we just need to identify the connected components of the graph of
cities and potential roads and count the size of each. You can choose a starting
vertex and use a graph search like BFS to discover all of the vertices in its
connected component, marking each vertex as visited and counting the number of
vertices you discover. Once the search ends, you have discovered a complete
connected component, and you can start again from any unmarked vertex to find
another connected componenet, repeating until all vertices are marked.

Note that if $\ell \leq r$:

\[
    \begin{align*}
    \sum_{i=1}^m (\left|C_i\right| - 1)\min(r, \ell) + \ell & = \sum_{i=1}^m (\left|C_i\right| - 1)\ell + \ell \\
    & = \sum_{i=1}^m \left|C_i\right| \ell \\
    & = n\ell
    \end{align*}    
\]

In this case, you don't need to look at $E$ or find connected components at all
because the solution is always to build a library in every city and spend
$n\ell$. Otherwise, if $r < \ell$, then you should build as few libraries as
possible, only one for each connected component. Because roads have a fixed cost
and libraries have a fixed cost, there will never be a situation where some
cities should prefer being connected to other cities' libraries and some should
prefer having their own. If roads are cheap, you should build as few libraries
as possible and maximize access through roads. If libraries are cheap, you
should build as many as possible and not bother with roads at all.

Java 8:
```java
public static long roadsAndLibraries(int n, int c_lib, int c_road,
                                     List<List<Integer>> cities) {
    if (c_lib <= c_road) {
        return (long) n * c_lib;
    }
    
    List<Set<Integer>> adjList = new ArrayList<>();
    for (int i = 0; i <= n; i++) {
        adjList.add(new HashSet<Integer>());
    }
    for (List<Integer> edge : cities) {
        int u = edge.get(0);
        int v = edge.get(1);
        adjList.get(u).add(v);
        adjList.get(v).add(u);
    }
    
    boolean[] mark = new boolean[n + 1];
    Queue<Integer> queue = new LinkedList<>();
    long cost = 0;
    int start = 1;
    int cheaperBuild = Math.min(c_road, c_lib);
    while (start <= n && !mark[start]) {
        queue.add(start);
        mark[start] = true;
        int cityCount = 1;
        while (!queue.isEmpty()) {
            int u = queue.remove();
            for (int v : adjList.get(u)) {
                if (!mark[v]) {
                    queue.add(v);
                    mark[v] = true;
                    cityCount++;
                }
            }
        }
        cost += (cityCount - 1) * cheaperBuild + c_lib;
        while (start <= n && mark[start]) {
            start++;
        }
    }
    
    return cost;
}
```

C++:
```cpp
long roadsAndLibraries(int n, int c_lib, int c_road,
                       vector<vector<int>> cities) {
    if (c_lib <= c_road) {
        return (long) n * c_lib;
    }
    
    vector<set<int>> adjList(n + 1);
    for (auto edge = cities.begin(); edge != cities.end(); edge++) {
        int u = edge->front();
        int v = edge->back();
        adjList[u].insert(v);
        adjList[v].insert(u);
    }
    
    vector<bool> mark(n + 1);
    queue<int> q;
    long cost = 0L;
    int start = 1;
    while (start <= n && !mark[start]) {
        q.push(start);
        mark[start] = true;
        
        int cityCount = 1;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            
            auto adj = &adjList[u];
            for (auto v = adj->begin(); v != adj->end(); v++) {
                if (!mark[*v]) {
                    q.push(*v);
                    mark[*v] = true;
                    cityCount++;
                }
            }
        }
        cost += (cityCount - 1) * c_road + c_lib;
        while (start <= n && mark[start]) {
            start++;
        }
    }
    
    return cost;
}
```

Python 3:
```python
def roadsAndLibraries(n, c_lib, c_road, cities):
    if c_lib <= c_road:
        return n * c_lib
    
    from collections import deque
    
    adj_list = [set() for _ in range(n)]
    for u, v in cities:
        adj_list[u - 1].add(v - 1)
        adj_list[v - 1].add(u - 1)
        
    mark = [False for _ in range(n)]
    queue = deque()
    cost = 0
    start = 0
    while start < n and not mark[start]:
        queue.append(start)
        mark[start] = True
        city_count = 1
        while queue:
            u = queue.pop()
            for v in [v for v in adj_list[u] if not mark[v]]:
                queue.append(v)
                mark[v] = True
                city_count += 1
        cost += (city_count - 1) * c_road + c_lib
        while start < n and mark[start]:
            start += 1
            
    return cost
```

[Back](../../hackerrank.md)
