# Recursion: Fibonacci Numbers

[Problem](https://www.hackerrank.com/challenges/ctci-fibonacci-numbers/problem)

Category: Recursion and Backtracking

Difficulty: Easy

---

Given $n$, calculate the $n^{\text{th}}$ Fibonacci number.

Input: $n$, the index into the Fibonacci sequence of the value to calculate.

\[ 1 \leq n \leq 30 \]

Output: the $n^{\text{th}}$ Fibonacci number, $f(n)$:

\[ 
    f(n) = \left\{
    \begin{array}{ll}
      n & 0 \leq n \leq 1 \\
      f(n - 1) + f(n - 2) & n > 1 \\
    \end{array} 
    \right. 
\]

The Fibonacci sequence is defined recursively, so it is easy to write a
recursive function that computes it:

```
f(n):
    if n <= 1:
        return n
    else:
        return f(n - 1) + f(n - 2)
```

For this problem, that approach suffices. But this wouldn't cut it for large $n$
because it does a lot of redundant work. Consider a call to $f(4)$:

\[
    f(4) \to \left\{
    \begin{array}{ll}
        f(3) & \to \left\{
        \begin{array}{ll}
            f(2) & \to \left\{
                \begin{array}{ll}
                    f(1) & \to 1 \\
                    f(0) & \to 0 \\
                \end{array}
                \right. \\
            f(1) & \to 1\\
        \end{array} 
        \right. \\
        f(2) & \to \left\{
        \begin{array}{ll}
            f(1) & \to 1 \\
            f(0) & \to 0 \\
        \end{array}
        \right. \\
    \end{array}
    \right.
\]

$f(4)$ calls $f(3)$ once and $f(2)$ once. The result of $f(3)$ is calculated
with calls to $f(2)$ and $f(1)$. Each call to $f(2)$ makes calls to $f(1)$ and
$f(0)$. So to calculate $f(4)$, we made one call to $f(3)$, two calls to $f(2)$,
three calls to $f(1)$, and two calls to $f(0)$. Why compute $f(0)$, $f(1)$,
$f(2)$, or $f(3)$ more than once? As $n$ grows larger, the number of redundant
calls to $f$ becomes untenable. A better way to compute $f$ is to start with 0
and 1 and build the sequence up to $n$.

As a bonus, $f$ is a [constant-recursive sequence](https://en.wikipedia.org/wiki/Constant-recursive_sequence),
and it turns out that there is a [closed-form formula for the Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number#Relation_to_the_golden_ratio). The formula looks like this:

\[ \alpha = \frac{1 + \sqrt{5}}{2}, \; \beta = \frac{1 - \sqrt{5}}{2} \]

\[ f(n) = \frac{1}{\sqrt{5}}(\alpha^n - \beta^n) \]

It's definitely not obvious that this works. How do we know that $f(n)$ is even
an integer after we divide by $\sqrt{5}$? It can be proven by induction. First,
we can see that the formula works for $n = 0$ and $n = 1$:

\[ f(0) = \frac{1}{\sqrt{5}}(\alpha^0 - \beta^0) = \frac{1}{\sqrt{5}}(1 - 1) = 
\frac{1}{\sqrt{5}} 0 = 0 \]

\[ f(1) = \frac{1}{\sqrt{5}}(\alpha^1 - \beta^1)
 = \frac{1}{\sqrt{5}}\left(\frac{1 + \sqrt{5}}{2} - \frac{1 - \sqrt{5}}{2}\right)
 = \frac{1}{\sqrt{5}}\left(\frac{2\sqrt{5}}{2}\right) = 1 \]

Now, for some $k \geq 0$, assume the formula holds for $k$ and $k + 1$:

\[ f(k) = \frac{1}{\sqrt{5}}(\alpha^k - \beta^k) \]

\[ f(k + 1) = \frac{1}{\sqrt{5}}(\alpha^{k + 1} - \beta^{k + 1}) \]

We need to show that it holds for $k + 2$. The trick is that $\alpha$ and 
$\beta$ are very special numbers: $x = \alpha$ and $x = \beta$ are the two
solutions of the equation $x^2 = x + 1$. This means we can substitute $\alpha^2$
for $\alpha + 1$ and $\beta^2$ for $\beta + 1$, and this is why the formula
works:

\[ 
    \begin{align*}
    f(k + 2) & = \frac{1}{\sqrt{5}}(\alpha^{k + 2} - \beta^{k + 2}) \\
    & = \frac{1}{\sqrt{5}}(\alpha^2 \alpha^k - \beta^2 \beta^k) \\
    & = \frac{1}{\sqrt{5}}((\alpha + 1)\alpha^k - (\beta + 1)\beta^k) \\
    & = \frac{1}{\sqrt{5}}(\alpha^{k + 1} + \alpha^k - \beta^{k + 1} - \beta^k) \\
    & = \frac{1}{\sqrt{5}}(\alpha^{k + 1} - \beta^{k + 1}) - \frac{1}{\sqrt{5}}(\alpha^k - \beta^k) \\
    & = f(k + 1) + f(k) 
    \end{align*}
\]

$f(k + 2) = f(k + 1) + f(k)$, so $f(k + 2)$ is the $(k + 2)^\text{th}$ Fibonacci
number and the formula is correct.

The only issue could be imprecision of using $\sqrt{5}$ in the computations.
Your $\sqrt{5}$ term might not cancel out correctly and you might be off by one
if you truncate to the wrong integer. Here is a version of the formula that
always floors to the correct integer:

\[ f(n) = \left\lfloor\frac{1}{\sqrt{5}}\left(\frac{1 + \sqrt{5}}{2}\right)^n 
 + \frac{1}{2}\right\rfloor \]

Java 8:
```java
public static int fibonacci(int n) {
    int prev = 0;
    int next = 1;
    for (int i = 2; i <= n; i++) {
        int temp = prev;
        prev = next;
        next += temp;
    }
    
    return next;
}
```

C++:
```cpp
int fibonacci(int n) {
    int prev = 0;
    int next = 1;
    for (int i = 2; i <= n; i++) {
        int temp = prev;
        prev = next;
        next += temp;
    }
    
    return next;
}
```

Python 3:
```python
def fibonacci(n):
    prev, current = 0, 1
    for _ in range(n - 1):
        prev, current = current, current + prev
        
    return current
```

Alternate Python 3 Solution:
```python
def fibonacci(n):
    sqrt5 = 5 ** 0.5
    phi = (1 + sqrt5) / 2
    
    return round(phi ** n / sqrt5)
```

[Back](../../hackerrank.md)
