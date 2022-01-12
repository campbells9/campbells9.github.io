# Minimum Swaps 2

[Problem](https://www.hackerrank.com/challenges/minimum-swaps-2/problem)

Category: Arrays

Difficulty: Medium

---

Given an array of numbers 1 through $n$, determine the minimum number of swaps
needed to sort the array in ascending order.

Input: an array $a[n]$, which stores a permutation of the values
$\{1, 2, \ldots, n\}$.

$1 \leq n \leq 10^5$

Output: the minimum number of swaps needed to sort $a$ in ascending order.

We need at most $n - 1$ swaps to sort the array: take an element that is not in
the correct position and swap it to its correct position, and repeat up to
$n - 2$ times until there are only two values out of order, and swap them as
your $(n - 1)^{\text{th}}$ swap. Every time a value is in the wrong position
in the array, you need to use a swap to move it to the right position, and then
you never have to touch it again.

For $1 \leq i \leq n$, we already know that the value $i$ belongs at index
$i - 1$ in the sorted array. For some fixed $i$, let $a[j] = i$ and
$a[i - 1] = k$, so $j$ is the current position of $i$ and $k$ is the value in
the entry where $i$ belongs. Swap $i$ and $k$ so that $a[j] = k$ and
$a[i - 1] = i$. Now, $i$ is in its correct position. $k$ may be in its correct
position too if it happens that $j = k - 1$. Otherwise, we can repeat the
process with $i = k$. Each swap we make puts at least one value in the correct
spot, so we will achieve the optimal number of swaps.

Java 8:
```java
static int minimumSwaps(int[] arr) {
    int[] a = Arrays.copyOf(arr, arr.length);
    int swaps = 0;
    for (int i = 0; i < a.length; i++) {
        while (a[i] > i + 1) {
            int temp = a[i];
            a[i] = a[temp - 1];
            a[temp - 1] = temp;
            swaps++;
        }
    }
    
    return swaps;
}
```

C++:
```cpp
int minimumSwaps(vector<int> arr) {
    vector<int> a = arr;
    int swaps = 0;
    for (int i = 0; i < a.size(); i++) {
        while (a[i] > i + 1) {
            int temp = a[i];
            a[i] = a[temp - 1];
            a[temp - 1] = temp;
            swaps++;
        }
    }
    
    return swaps;
}
```

Python 3:
```python
def minimumSwaps(arr):
    a = list(arr)
    swaps = 0
    for i in range(len(a)):
        while a[i] > i + 1:
            temp = a[i]
            a[i], a[temp - 1] = a[temp - 1], temp
            swaps += 1
            
    return swaps
```

[Back](../../hackerrank.md)
