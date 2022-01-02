# Counting Valleys

[Problem](https://www.hackerrank.com/challenges/counting-valleys/problem)

Category: Warm-up Challenges

Difficulty: Easy

---

Given a path of steps, which are either up or down, starting at sea level,
determine the number of valleys crossed. A valley is a sequence of steps that
starts at sea level, descends below sea level, and then returns to sea level.

Input: a number of steps $s$ and a path $p \in \{U, D\}^s$, where $U$ represents
a step up and $D$ represents a step down. The path begins and ends at sea level,
so $p$ has an equal number of $U$'s and $D$'s.

$2 \leq s \leq 10^6$

$|\{i : p_i = U\}| = |\{i : p_i = D\}| = \frac{s}{2}$

Output: the number of valleys (sequences that start at sea level, descend below
sea level, and then return up to sea level).

Read through the path and keep track of what elevation each step reaches. For
example:

```"UDDDUDUU"``` $\to$ 0, 1, 0, -1, -2, -1, -2, -1, 0

We can see that a valley ends whenever we step up from elevation -1 to 0. The
path is guaranteed to return to sea level (elevation 0) by the end, so every
valley ends, and the number of times we step up from -1 to 0 is the number of
valleys.

Java 8:
```
public static int countingValleys(int steps, String path) {
    int count = 0;
    int level = 0;
    for (int i = 0; i < steps; i++) {
        if (path.charAt(i) == 'U') {
            level++;
            if (level == 0) {
                count++;
            }
        } else {
            level--;
        }
    }
    
    return count;
}
```

C++:
```
int countingValleys(int steps, string path) {
    int count = 0;
    int level = 0;
    for (int i = 0; i < steps; i++) {
        if (path[i] == 'U') {
            level++;
            count += level == 0;
        } else {
            level--;
        }
    }
    
    return count;
}
```

Python 3:
```
def countingValleys(steps, path):
    level = 0
    count = 0
    for step in path:
        if step == "U":
            level += 1
            if level == 0:
                count += 1
        else:
            level -= 1
            
    return count
```

[Back](../hackerrank.md)