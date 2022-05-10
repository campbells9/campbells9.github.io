# Special String Again

[Problem](https://www.hackerrank.com/challenges/special-palindrome-again/problem)

Category: String Manipulation

Difficulty: Medium

---

Given a string, determine the number of "special" substrings it contains.

Input: a string $s$ of $n$ lowercase English letters.

\[ 1 \leq n \leq 10^6 \]

Output: the number of "special" substrings of $s$. A string is special if, for
some letter $c \in [\text{a-z}]$, one of the following is true:

- Every character is $c$
- The length is odd, every character before the middle character is $c$, and
every character after the middle character is $c$. For example, ```"aaabaaa"```.
The middle character does not have to be $c$

You might define that a string $s$ of length $n$ is special if and only if there
exists a $c \in [\text{a-z}]$ such that:

\[ i < \left\lfloor\frac{n}{2}\right\rfloor \; 
\lor \; i \geq \left\lceil\frac{n}{2}\right\rceil \implies s[i] = c \]

where if $n$ is even, every character has to be $c$, but if $n$ is odd, there is
a middle character we can ignore. Note that each character by itself counts as
a special substring of length 1.

A natural solution would be to start at each character $c_i$ and look forwards
and backwards in the string to see how many special substrings there are with
$c_i$ at the center. You would need to be careful about counting the number of
substrings of consecutive runs like ```aaaa``` correctly. A good approach would
be to count backwards from each character the number of consecutive matching
characters.

However, there is a way to avoid these extra passes forward and backward in the
array and solve the problem in linear time. You can use two arrays of length
$n$:

- $p^-_i$ counts the length of a consecutive run of $c_i$ up to index $i$
- $p^+_i$ counts the length of a consecutive run of $c_i$ that starts at index
$i$

For example, for $s =$ ```"aaabaabc"```:

```
s  =  a  a  a  b  a  a  b  c
p- = [1, 2, 3, 1, 1, 2, 1, 1]
p+ = [3, 2, 1, 1, 2, 1, 1, 1]
```

$p^-$ and $p^+$ can each be built with a forward and backward pass over $s$,
respectively. Once you have stored this information, you can make an additional
pass over $s$ which counts all special substrings. For each $0 \leq i < n$:

- Add $p^-_i$ to the result. This counts special substrings where every
character is the same.
- Count how many special strings have position $i$ at the center. If there are
matching characters before and after $i$ that are not $c_i$
($c_{i-1} = c_{i+1} = c' \neq c_i$), then there is at least one. $p^-_{i-1}$ is
the number of consecutive instances of $c'$ right before $i$, and $p^+_{i+1}$ is
the number of consecutive instances of $c'$ right after $i$, so the minimum of
these values is the number of special substrings to count.

Java 8:
```java
static long substrCount(int n, String s) {
    long result = 0L;
    int[] preConsecutive = new int[n];
    int[] postConsecutive = new int[n];
    preConsecutive[0] = 1;
    for (int i = 1; i < n; i++) {
        if (s.charAt(i - 1) == s.charAt(i)) {
            preConsecutive[i] = preConsecutive[i - 1] + 1;
        } else {
            preConsecutive[i] = 1;
        }
    }
    postConsecutive[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--) {
        if (s.charAt(i) == s.charAt(i + 1)) {
            postConsecutive[i] = postConsecutive[i + 1] + 1;
        } else {
            postConsecutive[i] = 1;
        }
    }
    for (int i = 0; i < n; i++) {
        result += preConsecutive[i];
        if (i > 0 && i + 1 < n 
                && s.charAt(i - 1) == s.charAt(i + 1) 
                && s.charAt(i - 1) != s.charAt(i)) {
            int pre = preConsecutive[i - 1];
            int post = postConsecutive[i + 1];
            result += Math.min(pre, post);
        }
    }
    
    return result;
}
```

C++:
```cpp
long substrCount(int n, string s) {
    int* preConsecutive = new int[n];
    int* postConsecutive = new int[n];
    preConsecutive[0] = 1;
    for (int i = 1; i < n; i++) {
        preConsecutive[i] = 1;
        if (s[i - 1] == s[i]) {
            preConsecutive[i] += preConsecutive[i - 1];
        }
    }
    postConsecutive[n - 1] = 1;
    for (int i = n - 2; i >= 0; i--) {
        postConsecutive[i] = 1;
        if (s[i] == s[i + 1]) {
            postConsecutive[i] += postConsecutive[i + 1];
        }
    }
    
    long result = 0L;
    for (int i = 0; i < n; i++) {
        result += preConsecutive[i];
        if (i > 0 && i + 1 < n && s[i - 1] != s[i] && s[i - 1] == s[i + 1]) {
            result += min(preConsecutive[i - 1], postConsecutive[i + 1]);
        }
    }
    
    return result;
}
```

Python 3:
```python
def substrCount(n, s):
    pre = [1] * n
    post = [1] * n
    for i in range(1, n):
        if s[i - 1] == s[i]:
            pre[i] += pre[i - 1]
    for i in range(n - 2, -1, -1):
        if s[i] == s[i + 1]:
            post[i] += post[i + 1]
    
    result = sum(pre)
    for i in range(1, n - 1):
        if s[i - 1] != s[i] and s[i - 1] == s[i + 1]:
            result += min(pre[i - 1], post[i + 1])
            
    return result
```

[Back](../../hackerrank.md)
