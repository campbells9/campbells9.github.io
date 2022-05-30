# Max Array Sum

[Problem](https://www.hackerrank.com/challenges/max-array-sum/problem)

Category: Dynamic Programming

Difficulty: Medium

---

Given an array of integers, find the maximum sum that can be achieved by taking
a subset of non-adjacent values.

Input: an array of integers $a[n]$.

\[ 1 \leq n \leq 10^5 \]

\[ \left|a[i]\right| \leq 10^4 \; \; \forall \; i \]

Output: the maximum sum that can be achieved by taking a subset of elements that
cannot be adjacent in $a$. For example, if $a$ is ```[1, 2, 3, 4, 5]```, we can
take ```[1, 3]```, ```[2, 4]```, ```[1, 3, 5]```, ```[1, 4]```, and so on, but
not ```[1, 2]```. In this case, the greatest sum is 9, which we achieve by
taking ```[1, 3, 5]```.

Note that the integers can be positive or negative. We should never take a
nonpositive element into our subset because it can't increase the value of our
sum and it only prevents us from taking the values adjacent to it. If all of the
values were nonpositive, the answer would be 0 because it would be optimal to
take none of them.

Some simple cases are when $n = 1$, where we should take $a[0]$ only if it is
positive, and the answer is $\max(a[0], \; 0)$. If $n = 2$: we can't take both
$a[0]$ and $a[1]$, so we have to choose one or the other or neither, and the
answer is $\max(a[0], \; a[1], \; 0)$. For $n > 2$, we can't build an optimal subset
greedily and there are too many subsets to check, but we can use dynamic
programming.

Let $d[i]$ represent the max array sum using only the first $i$ elements of $a$
(we will use zero-based indexing, so rather it is the first $i + 1$ elements, up
to index $i$). We can initialize $d[0]$ and $d[1]$ as in the simple cases above:

\[
    \begin{align*}
    d[0] & \gets \max(a[0], \; 0) \\
    d[1] & \gets \max(a[1], \; d[0])
    \end{align*}    
\]

For $i = 2, 3, \ldots n - 1$, we should choose whether or not to take $a[i]$
into our subset. If we take $a[i]$, we can't take $a[i - 1]$, but we can take
any elements before it, so our subset sum is $d[i - 2] + a[i]$. Otherwise, if we
don't take $a[i]$, we can take anything before it, and our subset sum is
$d[i - 1]$.

\[
    d[i] \gets \left\{
    \begin{array}{ll}
      \max(a[0], \; 0) & i = 0 \\
      \max(a[1], \; d[0]) & i = 1 \\
      \max(d[i - 2] + a[i], \; d[i - 1]) & 1 < i < n
    \end{array} 
    \right.    
\]

The answer is $d[n - 1]$, the max array sum that considers all elements of $a$.

Java 8:
```java
static int maxSubsetSum(int[] arr) {
    int n = arr.length;
    int[] sums = new int[n];
    sums[0] = Math.max(arr[0], 0);
    if (n > 1) {
        sums[1] = Math.max(sums[0], arr[1]);
    }
    for (int i = 2; i < n; i++) {
        sums[i] = Math.max(sums[i - 2] + arr[i], sums[i - 1]);
    }
    
    return sums[n - 1];
}
```

C++:
```cpp
int maxSubsetSum(vector<int> arr) {
    int n = arr.size();
    vector<int> sums(n);
    sums[0] = max(arr[0], 0);
    if (n > 1) {
        sums[1] = max(sums[0], arr[1]);
    }
    for (int i = 2; i < n; i++) {
        sums[i] = max(sums[i - 2] + arr[i], sums[i - 1]);
    }
    
    return sums[n - 1];
}
```

Python 3:
```python
def maxSubsetSum(arr):
    sums = [max(arr[0], 0)]
    if len(arr) > 1:
        sums.append(max(arr[1], sums[-1]))
    for val in arr[2:]:
        sums.append(max(sums[-2] + val, sums[-1]))
    
    return sums[-1]
```

[Back](../../hackerrank.md)
