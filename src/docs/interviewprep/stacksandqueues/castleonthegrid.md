# Castle on the Grid

[Problem](https://www.hackerrank.com/challenges/castle-on-the-grid/problem)

Category: Stacks and Queues

Difficulty: Medium

---

Given a grid of open and blocked cells, determine the minimum number of moves to
reach the goal from the starting cell using rook moves.

Input: a square $n \times n$ grid $G$, a starting point $(s_x, s_y)$ and a goal
point $(g_x, g_y)$. Each grid is an array of $n$ strings of $n$ characters each,
each of which is either ```'.'``` or ```'X'```.

\[ 1 \leq n \leq 100 \]

\[ 0 \leq s_x, s_y, g_x, g_y < n \]

Output: the minimum number of moves it can take for a playing piece to reach the
goal from the starting point. The piece must stay on the grid and it cannot pass
over any blocked cells. The piece can move like a rook in chess, which means
that in one move it can move any number of tiles in a cardinal direction (up,
down, left, and right). It is assumed that it is always possible to reach the
goal from the starting point.

We can use a breadth-first search to find the shortest path to the goal by
discovering all the tiles we can reach with one move, then two moves, three
moves, and so on. The easiest way to implement breadth-first search is by adding
points to a queue and marking them as "discovered" as you discover them. To keep
track of the "layers" of points each number of steps away from the start, each
iteration should store the number of points in the queue, dequeue and process
that many points, and then increment the step counter and move on to the next
iteration.

I found it convenient to replace the input array of strings with an $n \times n$
array of boolean values where $G[i][j]$ is false if $G_{i,j}$ is an X, otherwise
true. This way, it is easy to mark which points have already been visited by
setting their value to false as if the cell became blocked. Then, at each point
we dequeue from the queue, we can explore in each of the four directions,
checking each step for a blocked cell and only enqueueing it if it is unblocked.
This is fine because the optimal shortest path will never need to visit a tile
more than once.

An additional optimization is to ignore moves that are clearly not optimal.
Consider the following instance of the problem:

```
grid = [ "X.XXX", 
         "X....",
         "X.XX.",
         ".....",
         ".XXXX" ], start = (0, 1), goal = (3, 4)
```

From the starting point, we can only move down, and we can move to three
different points: (1, 1), (2, 1), and (3, 1). It makes sense to explore (1, 1)
and (3, 1), but there is no need to explore (2, 1), because from (2, 1) we can
only go up and down. The tiles to its left and right are blocked. Therefore,
stopping on (2, 1) cannot be optimal. In general, when we explore a direction
from a point, we don't need to consider moves where we land on a tile that we
cannot turn towards a perpendicular direction from (unless that tile is the
goal).

Java 8:
```java
private static class Point {
    int x;
    int y;
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public boolean equals(Object other) {
        Point p = (Point) other;
        
        return x == p.x && y == p.y;
    }
}

public static int minimumMoves(List<String> grid, int startX, int startY,
                               int goalX, int goalY) {
    int n = grid.size();
    boolean[][] field = new boolean[n][n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            field[i][j] = grid.get(i).charAt(j) == '.';
        }
    }
    
    Queue<Point> points = new LinkedList<>();
    int steps = 0;
    Point goal = new Point(goalX, goalY);
    points.add(new Point(startX, startY));
    if (points.peek().equals(goal)) {
        return steps;
    }
    
    int[] dx = {0, 0, -1, 1};
    int[] dy = {-1, 1, 0, 0};
    while (!points.isEmpty()) {
        int size = points.size();
        for (int i = 0; i < size; i++) {
            Point p = points.poll();
            for (int j = 0; j < dx.length; j++) {
                int x = p.x + dx[j];
                int y = p.y + dy[j];
                while (x >= 0 && x < n && y >= 0 && y < n && field[x][y]) {
                    Point step = new Point(x, y);
                    if (step.equals(goal)) {
                        return steps + 1;
                    }
                    
                    if (isValidStep(x, dx[j], y, dy[j], field)) {
                        points.add(step);
                    }
                    x += dx[j];
                    y += dy[j];
                }
            }
            field[p.x][p.y] = false;
        }
        steps++;
    }
    
    return -1;
}

private static boolean isValidStep(int x, int dx, int y, int dy,
                                   boolean[][] field) {
    int n = field.length;
    boolean validStepHorizontal = y > 0 && field[x][y - 1] 
                               || y < n - 1 && field[x][y + 1];
    boolean validStepVertical = x > 0 && field[x - 1][y]
                             || x < n - 1 && field[x + 1][y];
    
    return dx != 0 && validStepHorizontal || dy != 0 && validStepVertical;
}
```

C++:
```cpp
bool isValidStep(int, int, int, int, vector<vector<bool>>&);

int minimumMoves(vector<string> grid, int startX, int startY,
                 int goalX, int goalY) {
    int n = grid.size();
    vector<vector<bool>> field(n);
    for (int i = 0; i < n; i++) {
        field[i].resize(n);
        for (int j = 0; j < n; j++) {
            field[i][j] = grid[i][j] == '.';
        }
    }
    
    int steps = 0;
    pair<int, int> start(startX, startY);
    pair<int, int> goal(goalX, goalY);
    if (start == goal) {
        return steps;
    }
    
    queue<pair<int, int>> points;
    points.push(start);
    
    int dx[] = {0, 0, -1, 1};
    int dy[] = {-1, 1, 0, 0};
    while (!points.empty()) {
        int size = points.size();
        for (int i = 0; i < size; i++) {
            pair<int, int> p = points.front();
            points.pop();
            for (int j = 0; j < 4; j++) {
                int x = p.first + dx[j];
                int y = p.second + dy[j];
                while (x >= 0 && x < n && y >= 0 && y < n && field[x][y]) {
                    pair<int, int> step(x, y);
                    if (step == goal) {
                        return steps + 1;
                    }
                    
                    if (isValidStep(x, dx[j], y, dy[j], field)) {
                        points.push(step);
                    }
                    x += dx[j];
                    y += dy[j];
                }
            }
            field[p.first][p.second] = false;
        }
        steps++;
    }
    
    return -1;
}

bool isValidStep(int x, int dx, int y, int dy, vector<vector<bool>>& field) {
    int n = field.size();
    bool validStepHorizontal = y > 0 && field[x][y - 1]
                            || y < n - 1 && field[x][y + 1];
    bool validStepVertical = x > 0 && field[x - 1][y]
                          || x < n - 1 && field[x + 1][y];
    
    return dx != 0 && validStepHorizontal || dy != 0 && validStepVertical;
}
```

Python 3:
```python
def minimumMoves(grid, startX, startY, goalX, goalY):
    from collections import deque
    
    n = len(grid)
    field = [[ch == "." for ch in row] for row in grid]
    
    def is_valid_step(x, dx, y, dy):
        valid_step_horizontal = y > 0 and field[x][y - 1] \
                             or y < n - 1 and field[x][y + 1]
        valid_step_vertical = x > 0 and field[x - 1][y] \
                           or x < n - 1 and field[x + 1][y]
        
        return dx != 0 and valid_step_horizontal \
            or dy != 0 and valid_step_vertical
    
    steps = 0
    start, goal = (startX, startY), (goalX, goalY)
    if start == goal:
        return steps
    
    points = deque([start])
    delta = [(0, -1), (0, 1), (-1, 0), (1, 0)]
    while points:
        size = len(points)
        for _ in range(size):
            px, py = points.popleft()
            for dx, dy in delta:
                x, y = px + dx, py + dy
                while 0 <= x < n and 0 <= y < n and field[x][y]:
                    if (x, y) == goal:
                        return steps + 1
                    
                    if is_valid_step(x, dx, y, dy):
                        points.append((x, y))
                    x += dx
                    y += dy
            field[px][py] = False
        steps += 1
        
    return -1
```

[Back](../../hackerrank.md)
