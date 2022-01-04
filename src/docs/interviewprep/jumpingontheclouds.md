# Jumping on the Clouds

[Problem](https://www.hackerrank.com/challenges/jumping-on-the-clouds/problem)

Category: Warm-Up Challenges

Difficulty: Easy

---

Given a pattern of safe and dangerous clouds leading to a goal, determine the
minimum number of jumps required to reach the end safely.

Input: a number of clouds $n$ and a pattern $c_1, \ldots c_n$ where $c_1 = 0$,
$c_n = 0$, and $c_i \in \{0, 1\}$ for $1 < i < n$. $c_i = 0$ means cloud $i$ is
safe, and $c_i = 1$ means cloud $i$ must be avoided.

$2 \leq n \leq 100$

Output: the minimum number of jumps needed to win the game. The player starts on
cloud 1 and must reach cloud $n$. They can jump forward 1 or 2 clouds at a time.
It is guaranteed that the player can win, so there will never be two dangerous
clouds in a row.

We can be greedy by taking advantage of the fact that there is always a path to
the end. If the player is at cloud $i$ (starting at cloud 0), look at cloud
$i + 2$:

- If cloud $i + 2$ is safe, you should always jump 2 spaces forward to that
cloud.
- If cloud $i + 2$ is dangerous, you can (and should) jump 1 space forward to
cloud $i + 1$ instead.

The first cloud is safe, and there are no two consecutive dangerous clouds.
Therefore, for any safe cloud at $i$, if you can't jump to $i + 2$, you can jump
to $i + 1$ and then to $i + 3$ and so on.

For the Java solution, ```c``` is given as a List instead of an array, so my
solution converts it into an array first. You only need to read through the list
once sequentially to solve the problem, so it is possible to use an iterator
over the list instead of converting it into an array and indexing into it.

Java 8:
```
public static int jumpingOnClouds(List<Integer> c) {
    final int N = c.size();
    Integer[] clouds = c.toArray(new Integer[N]);
    int jumps = 0;
    int position = 0;
    while (position + 1 < N) {
        if (position + 2 < N && clouds[position + 2] == 0) {
            position += 2;
        } else {
            position++;
        }
        jumps++;
    }
    
    return jumps;
}
```

C++:
```
int jumpingOnClouds(vector<int> c) {
    const int n = c.size();
    int jumps = 0;
    int position = 0;
    while (position + 1 < n) {
        position += 1 + (position + 2 < n && !c[position + 2]);
        jumps++;
    }
    
    return jumps;
}
```

Python 3:
```
def jumpingOnClouds(c):
    n = len(c)
    position = 0
    jumps = 0
    while position + 1 < n:
        if position + 2 < n and c[position + 2] == 0:
            position += 2
        else:
            position += 1
        jumps += 1
        
    return jumps
```
