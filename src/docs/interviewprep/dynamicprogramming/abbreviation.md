# Abbreviation

[Problem](https://www.hackerrank.com/challenges/abbr/problem)

Category: Dynamic Programming

Difficulty: Medium

---

Given two strings, determine if it is possible to make the first string equal to
the second one by only deleting lowercase letters from it.

Input: two strings $a$ and $b$. $a$ can have lowercase or uppercase letters, but
$b$ only has uppercase letters.

\[ 1 \leq |a|, |b| \leq 1000 \]

Output: the string "YES" if $a$ can be made equal to $b$ by, for each lowercase
letter in $a$, either making it uppercase or deleting it.

You can think of $a$'s lowercase letters as the letters we are allowed to
remove, and its uppercase letters as the letters we are *not* allowed to remove.
Note that we can't add any letters to $a$: if $a$ is shorter than $b$, the
answer must be No. If any letters in $b$ aren't in $a$, the answer is No. If any
uppercase letters in $a$ aren't in $b$, the answer is No because we can't remove
them.

The challenge is that you need to determine whether it is possible to get $b$
from $a$ by capitalizing any number of lowercase letters and deleting the rest.
Passing over $a$, it is hard to decide greedily for each lowercase letter
whether to capitalize or remove it.

Let $m = |a|$ and $n = |b|$, and let $A_{0,0} \ldots A_{m,n}$ be an
$(m + 1) \times (n + 1)$ 0-1 matrix. $A_{i,j}$ will be 1 if the answer is Yes
when we consider only the first $i$ letters of $a$ and the first $j$ letters of
$b$, otherwise it will be 0. If $a$ and $b$ are both empty, they are already
equal, so $A_{0,0} = 1$. If the first $i$ letters of $a$ are lowercase, then the
first $i$ values in column 0 below $A_{0,0}$ are 1, and the remaining values are
0, because once $a$ has an uppercase letter, it cannot match the empty string.
$A_{0,j}$ is going to be 0 for all $j > 0$ (in general, $A_{i,j} = 0$ for all
$i < j$).

For $A_{i,j}$, let $a_i$ be the $i^\text{th}$ letter of $a$, and let $b_j$ be
the $j^\text{th}$ letter of $b$. If $a_i$ is lowercase, we have the option of
deleting $a_i$ and taking $A_{i,j} = 1$ if $A_{i-1,j} = 1$. We also have the
option of making $a_i$ uppercase. In this case, or if it was uppercase to begin
with, we need $a_i = b_j$ and $A_{i-1,j-1} = 1$ to hold. Therefore, $A_{i,j}$
indicates the following event:

\[ (\{a_i \in [\text{a-z}]\} \cap \{A_{i-1,j} = 1\}) \cup 
    (\{\left\lceil a_i\right\rceil = b_j\} \cap \{A_{i-1,j-1} = 1\}) \]

where $\left\lceil a_i\right\rceil$ denotes $a_i$ capitalized. This lends itself
to a dynamic programming algorithm that computes $A_{0,0}$ through $A_{m,n}$,
where the answer is Yes if $A_{m,n} = 1$, otherwise No.

Java 8:
```java
public static String abbreviation(String a, String b) {
    int m = a.length();
    int n = b.length();
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;
    for (int i = 1; i <= m; i++) {
        char ch1 = a.charAt(i - 1);
        if(Character.isLowerCase(ch1)) {
            dp[i][0] = dp[i - 1][0];
        }
        for (int j = 1; j <= n; j++) {
            char ch2 = b.charAt(j - 1);
            dp[i][j] = Character.toUpperCase(ch1) == ch2 && dp[i - 1][j - 1]
                    || dp[i - 1][j] && Character.isLowerCase(ch1);
        }
    }
    
    return dp[m][n] ? "YES" : "NO";
}
```

C++:
```cpp
string abbreviation(string a, string b) {
    int m = a.size();
    int n = b.size();
    vector<vector<bool>> dp;
    for (int i = 0; i <= m; i++) {
        dp.emplace_back(n + 1);
    }
    dp[0][0] = true;
    for (int i = 1; i <= m; i++) {
        if (islower(a[i - 1])) {
            dp[i][0] = dp[i - 1][0];
        }
        for (int j = 1; j <= n; j++) {
            dp[i][j] = toupper(a[i - 1]) == b[j - 1] && dp[i - 1][j - 1]
                    || dp[i - 1][j] && islower(a[i - 1]);
        }
    }
    
    return dp[m][n] ? "YES" : "NO";
}
```

Python 3:
```python
def abbreviation(a, b):
    m, n = len(a), len(b)
    dp = [[False for _ in range(n + 1)] for _ in range(m + 1)]
    dp[0][0] = True
    for i, ch1 in enumerate(a):
        if ch1.islower():
            dp[i + 1][0] = dp[i][0]
        for j, ch2 in enumerate(b):
            dp[i + 1][j + 1] = (
                ch1.upper() == ch2 and dp[i][j] 
                or ch1.islower() and dp[i][j + 1]
            )
            
    return "YES" if dp[-1][-1] else "NO"
```

[Back](../../hackerrank.md)
