# Common Child

[Problem](https://www.hackerrank.com/challenges/common-child/problem)

Category: String Manipulation

Difficulty: Medium

---

Given two strings, determine the length of the longest string that can be
constructed from both by only deleting letters.

Input: two strings $s_1$ and $s_2$ of uppercase English letters.

\[ 1 \leq |s_1|, |s_2| \leq 5000 \]

Output: the length of the longest string that is a child of both $s_1$ and
$s_2$. A string $s'$ is a child of another string $s$ if you can construct $s'$
by deleting any number of characters from $s$. For example, ```"ABACUS"``` and
```"CRABCAKE"``` share a common child ```"ABC"```. Note that we can delete as
many letters as we want from anywhere in the string to produce a child, but we
cannot rearrange or replace any of the letters.

A good way to solve this problem is with dynamic programming. Suppose you
already know how long the longest possible common child of $s_1$ and $s_2$ is,
and I add the letter A to the end of $s_1$. What happened to the length of the
longest common child now? It could be the same as it was before, or it could be
one longer, since we might be able to use that A in $s_1$ to make a longer
common child. How do we know if we can do that? It depends on whether there is
an instance of the longest common child in $s_2$ that has an A after its last
character.

Let $m = |s_1|$, $n = |s_2|$, and $A$ be an $(m + 1) \times (n + 1)$ matrix with
entries $A_{0,0} \ldots A_{m,n}$. Let $A_{i,j}$ be the length of the longest
common child that can be made using only the first $i$ characters of $s_1$ and
the first $j$ characters of $s_2$. If $i$ or $j$ is 0, then we can't use any
characters from one of the strings, so the longest common child is length 0:

\[ 
    \begin{align*}
    A_{i,0} & \gets 0 \; \; \forall \; 0 \leq i \leq m \\
    A_{0,j} & \gets 0 \; \; \forall \; 0 \leq j \leq n
    \end{align*}
\]

To compute $A_{i,j}$, we need to compare the $i^\text{th}$ character of $s_1$ to
the $j^\text{th}$ character of $s_2$. If they are the same, then we know this
character can be added to the end of any common child of the first $i - 1$
characters of $s_1$ and the first $j - 1$ characters of $s_2$. Therefore, we
should take $A_{i,j} \gets A_{i-1,j-1} + 1$. Otherwise, the $i^\text{th}$
character of $s_1$ or the $j^\text{th}$ character of $s_2$ (but not both) could
still contribute to the longest common child. We take the first $i - 1$
characters of $s_1$ and the first $j - 1$ characters of $s_2$ and consider
adding either the $i^\text{th}$ character of $s_1$ or the $j^\text{th}$
character of $s_2$. These options give us common children of length $A_{i,j-1}$
and $A_{i-1,j}$, so we should take whichever is larger to be the value of
$A_{i,j}$.

\[ 
    A_{i,j} \gets \left\{
    \begin{array}{ll}
      A_{i-1,j-1} + 1 & \text{if} \; s_1[i] = s_2[j] \\
      \max(A_{i,j-1}, A_{i-1,j}) & \text{if} \; s_1[i] \neq s_2[j]
    \end{array} 
    \right.
\]

After calculating the entire matrix, the answer is $A_{m,n}$, the length of the
longest common child that considers all $m$ characters of $s_1$ and all $n$
characters of $s_2$.

Java 8:
```java
static int commonChild(String s1, String s2) {
    int m = s1.length();
    int n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
            }
        }
    }
    
    return dp[m][n];
}
```

C++:
```cpp
int commonChild(string s1, string s2) {
    int m = s1.size();
    int n = s2.size();
    int** dp = new int*[m + 1];
    for (int i = 0; i <= m; i++) {
        dp[i] = new int[n + 1];
        dp[0][i] = 0;
        dp[i][0] = 0;
    }
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

It was actually pretty difficult to get this solution to run fast enough to pass
the test cases for Python 3. I think this solution barely passes (it fails if
you replace ```dp1[j] = dp1[j - 1] if dp1[j - 1] > dp0[j] else dp0[j]``` with 
```dp1[j] = max(dp1[j - 1], dp0[j])```). It might be easier just to switch your
language from Python 3 to Pypy 3, which is more likely to run your code fast
enough to pass its test cases. I also used a fairly common space optimization
that I didn't use in the other implementations or describe above: I only store
two rows of the matrix at a time (the current row $i$ and the previous row
$i - 1$). If you are calculating the entries of $A$ in row-major order (as in
$A_{1,1}$ through $A_{1,n}$, then $A_{2,1}$ through $A_{2,n}$, and so on), once
you calculate an entire row, you no longer need any of the rows above it to
compute subsequent rows.

Python 3:
```python
def commonChild(s1, s2):
    m, n = len(s1), len(s2)
    dp0 = [0] * (n + 1)
    dp1 = [0] * (n + 1)
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp1[j] = dp0[j - 1] + 1
            else:
                dp1[j] = dp1[j - 1] if dp1[j - 1] > dp0[j] else dp0[j]
        dp0, dp1 = dp1, dp0
    
    return dp0[n]
```

[Back](../../hackerrank.md)
