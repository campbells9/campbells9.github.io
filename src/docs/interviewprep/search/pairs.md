# Pairs

[Problem](https://www.hackerrank.com/challenges/pairs/problem)

Category: Search

Difficulty: Medium

---

Given an array of unique integers and an integer $k$, count how many pairs of
integers there are that are $k$ apart.

Input: an array of unique integers $a[n]$ and a target value $k$.

\[ 2 \leq n \leq 10^5 \]

\[ 1 \leq k < 10^9 \]

\[ 1 \leq a[i] < 2^{31} - 1 \; \; \forall \; i \]

Output: the number of pairs $(i, j)$ such that $a[i] - a[j] = k$. Since $k > 0$,
$i \neq j$ for all such pairs.

This problem is similar to the classic problem of finding pairs in an array that
add to the target value. There are ${n \choose 2}$ possible $(i, j)$ pairs, and
we need to count the ones for which $a[i]$ and $a[j]$ are $k$ apart. In the sum
version of the problem, we iterate over the array and check whether we have seen
the "complement" of each element, $k - a[i]$, previously, and we use a set to
track which values we have seen.

Now, for each $a[i]$, the complement is $a[i] - k$:

\[ a[i] - (a[i] - k) = a[i] - a[i] + k = k \]

If $a[j] = a[i] - k$ for some $j$, then $(i, j)$ is a pair that satisfies our
condition.

An interesting observation about this problem is that for the sum version, if
you put all of the integers into a set *first* and then iterated over the $a[i]$
and checked for each $k - a[i]$, you would double count every pair: at $i$ you
would find $a[j] = k - a[i]$ and count $(i, j)$, and at $j$ you would find
$a[i] = k - a[j]$ and count $(j, i)$. Note that that solution works fine if you
divide your result by 2. For this problem, the double counting never happens:
$(i, j)$ and $(j, i)$ cannot both satisfy the condition because $i \neq j$
implies $a[i] \neq a[j]$. You can put all of the values into the set up front
and the algorithm won't double count the pairs. If you wanted to add each
element as you iterate instead, you would miss some of the pairs (the ones with
$i < j$). You could fix this by searching for both "complements," $a[i] - k$ and
$a[i] + k$, the two values that are $k$ away from $a[i]$.

Java 8:
```java
public static int pairs(int k, List<Integer> arr) {
    Set<Integer> set = new HashSet<>(arr);
    int result = 0;
    for (int val : arr) {
        if (set.contains(val - k)) {
            result++;
        }
    }
    
    return result;
}
```

C++:
```cpp
int pairs(int k, vector<int> arr) {
    set<int> s(arr.begin(), arr.end());
    int result = 0;
    for (auto val = arr.begin(); val != arr.end(); val++) {
        result += s.find(*val - k) != s.end();
    }
    
    return result;
}
```

Python 3:
```python
def pairs(k, arr):
    s = set(arr)
    
    return sum((v - k) in s for v in arr)
```

[Back](../../hackerrank.md)
