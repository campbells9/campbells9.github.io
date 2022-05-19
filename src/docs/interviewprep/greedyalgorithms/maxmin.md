# Max Min

[Problem](https://www.hackerrank.com/challenges/angry-children/problem)

Category: Greedy Algorithms

Difficulty: Medium

---

Given an array of integers and $k$, choose $k$ integers from the array such that
unfairness is minimized.

Input: an array $a[n]$ of integers, and $k$, the number elements you must choose
from $a$.

\[ 2 \leq k \leq n \leq 10^5 \]

\[ 0 \leq a[i] \leq 10^9 \; \; \forall \; i \]

Output: the minimum possible unfairness that can be achieved by choosing $k$
elements from $a$. The unfairness of a subarray $a'[k]$ is defined as
$\max(a') - \min(a')$, or the difference between the largest value you chose and
the smallest value you chose. The elements need not be consecutive in the
original array $a$.

There are ${n \choose k}$ ways to choose $k$ elements for our subarray $a'$, but
we don't have to check every single one. For some element $a[i]$, consider all
of the subarray choices such that $a[i]$ is the minimum value. How should we
choose the other $k - 1$ elements to minimize unfairness? We can't choose
anything smaller than $a[i]$, since we are considering the case when it is the
minimum element. We should pick the smallest $k - 1$ elements that are greater
than or equal to $a[i]$. If we picked any other elements instead, that could
only give us a larger max value and more unfairness.

Therefore, if we sort $a$, the only subarrays we need to consider are each
$k$-length contiguous subarray. For each starting (minimum) element $a[i]$, the
optimal subarray to choose would be $a[i]$ through $a[i + k - 1]$. The overall
optimum subarray must have one of the elements as its minimum, so we will
certainly find it when we get to that minimum element.

Java 8:
```java
static int maxMin(int k, int[] arr) {
    int[] sorted = arr.clone();
    Arrays.sort(sorted);
    
    int result = sorted[k - 1] - sorted[0];
    for (int i = 1; i + k <= arr.length; i++) {
        int j = i + k - 1;
        int unfairness = sorted[j] - sorted[i];
        result = Math.min(result, unfairness);
    }
    
    return result;
}
```

C++:
```cpp
int maxMin(int k, vector<int> arr) {
    vector<int> sorted = arr;
    sort(sorted.begin(), sorted.end());
    
    int result = sorted[k - 1] - sorted[0];
    for (int i = 1; i + k <= arr.size(); i++) {
        int j = i + k - 1;
        int unfairness = sorted[j] - sorted[i];
        result = min(result, unfairness);
    }
    
    return result;
}
```

Python 3:
```python
def maxMin(k, arr):
    a = sorted(arr)
    result = a[k - 1] - a[0]
    for i, val in enumerate(a[:(1 - k)]):
        j = i + k - 1
        unfairness = a[j] - val
        result = min(result, unfairness)
        
    return result
```

[Back](../../hackerrank.md)
