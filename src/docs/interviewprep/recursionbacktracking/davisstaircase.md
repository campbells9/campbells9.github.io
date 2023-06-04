# Recursion: Davis' Staircase

[Problem](https://www.hackerrank.com/challenges/ctci-recursive-staircase/problem)

Category: Recursion and Backtracking

Difficulty: Medium

---

Count the number of patterns of steps you can use to climb a staircase of a
given length.

Input: $n$, the number of stairs to climb.

\[ 1 \leq n \leq 36 \]

Output: the number of distinct patterns of steps you can take to reach the top
of the stairs. You are allowed to step up 1, 2, or 3 stairs at a time.

Let $a_i$ be the number of ways to climb $i$ stairs. I will write the ways of
climbing the stairs as sequences so we can see the recurrence relation.
$a_1 = 1$ because the only way to climb one stair is to take one step of 1:

\[ [1] \]

$a_2 = 2$ because we can either take a step of 1 to reach the first step and
another step of 1 to reach the second step, or we can take one step of 2:

\[
    \begin{align*}
    & [1, 1] \\
    & [2]
    \end{align*}    
\]

$a_3 = 4$ because we could add a step of 1 to our two ways of reaching step 2,
we could add a step of 2 to our one way of reaching step 1, or we could take a
step of 3 from the bottom:

\[
    \begin{align*}
    & [1, 1, 1] \\
    & [2, 1] \\
    & [1, 2] \\
    & [3]
    \end{align*}    
\]

How should we calculate $a_4$? Since we can only step up 1, 2, or 3 stairs at a
time, we have to stop on either step 1, step 2, or step 3. We can append $1$
to all of the ways to reach step 3 $([1, 1, 1], [2, 1], [1, 2], [3])$, $2$ to
all of the ways to reach step 2 $([1, 1], [2])$, and $3$ to all of the ways to
reach step 1 $([1])$:

\[
    \begin{align*}
    & [1, 1, 1, 1] \\
    & [2, 1, 1] \\
    & [1, 2, 1] \\
    & [3, 1] \\
    & [1, 1, 2] \\
    & [2, 2] \\
    & [1, 3]
    \end{align*}    
\]

We have $a_4 = 7$, and for $i > 3$, we have

\[ a_i = a_{i-1} + a_{i-2} + a_{i-3} \]

Therefore, we can compute $a_n$ with dynamic programming, recursion with a
cache, or even three variables to store the three previous values. In my
solutions, I used an array of length 3 and update the values cyclically, so each
$a_i$ is stored in ```dp[(i - 1) % 3]```.

Note: There's also a requirement that you have the correct output modulo
$10^{10} + 7$. I am not sure what the significance of this number is, because
the output will not exceed $10^{10} + 7$ until $n = 39$, and the output is small
enough to fit in a 32-bit integer until $n = 38$. My solutions ignored this
aspect of the problem; if you wanted to fulfill this requirement for larger
values of $n$, you would need to use 64-bit integers and store the intermediate
values modulo $10^{10} + 7$.

Java 8:
```java
public static int stepPerms(int n) {
    int[] dp = {1, 2, 4};
    for (int i = dp.length; i < n; i++) {
        dp[i % dp.length] = dp[0] + dp[1] + dp[2];
    }
    
    return dp[(n - 1) % dp.length];
}
```

C++:
```cpp
int stepPerms(int n) {
    int dp[3] = {1, 2, 4};
    for (int i = 3; i < n; i++) {
        dp[i % 3] = dp[0] + dp[1] + dp[2];
    }
    
    return dp[(n - 1) % 3];
}
```

Python 3:
```python
def stepPerms(n):
    dp = [1, 2, 4]
    for i in range(3, n):
        dp[i % 3] = sum(dp)
    return dp[(n - 1) % 3]
```

[Back](../../hackerrank.md)
