# Minimum Absolute Difference in an Array

[Problem](https://www.hackerrank.com/challenges/minimum-absolute-difference-in-an-array/problem)

Category: Greedy Algorithms

Difficulty: Easy

---

Given an array, find the minimum difference between any two numbers.

Input: an array $a[n]$ of integers.

$2 \leq n \leq 10^5$

$-10^9 \leq a[i] \leq 10^9 \; \forall \; i$

Output: the minimum absolute difference between any two values in the array:

\[ \min_{i \neq j} |a[i] - a[j]| \]

There are ${n \choose 2}$ different absolute differences in $a$, but many of
them cannot be the minimum absolute difference. For example, if
$a[i] < a[j] < a[k]$, then the difference between $a[i]$ and $a[j]$ will be
smaller than the difference between $a[i]$ and $a[k]$.

If we sort the array, then the two closest values will be next to each other.
Therefore, all we need to do is sort the array and check the difference between
each consecutive pair of values. Note that if the array is sorted, we can
compute the absolute difference as $a[i] - a[i - 1]$, because
$a[i] \geq a[i - 1]$.

Java 8:
```java
public static int minimumAbsoluteDifference(List<Integer> arr) {
    final int N = arr.size();
    Integer[] a = arr.toArray(new Integer[N]);
    Arrays.sort(a);
    
    int minDiff = Integer.MAX_VALUE;
    for (int i = 1; i < N; i++) {
        minDiff = Math.min(minDiff, a[i] - a[i - 1]);
    }
    
    return minDiff;
}
```

C++:
```cpp
int minimumAbsoluteDifference(vector<int> arr) {
    vector<int> a = arr;
    sort(a.begin(), a.end());
    
    int minDiff = (1 << 31) - 1;
    for (int i = 1; i < a.size(); i++) {
        minDiff = min(minDiff, a[i] - a[i - 1]);
    }
    
    return minDiff;
}
```

Python 3:
```python
def minimumAbsoluteDifference(arr):
    a = sorted(arr)
    
    return min(a[i] - a[i - 1] for i in range(1, len(a)))
```

[Back](../../hackerrank.md)
