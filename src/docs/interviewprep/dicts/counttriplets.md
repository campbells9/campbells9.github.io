# Count Triplets

[Problem](https://www.hackerrank.com/challenges/count-triplets-1/problem)

Category: Dictionaries and Hashmaps

Difficulty: Medium

---

Given an array of integers and a base $r$, count the number triplets with values
that are geometric progressions with common ratio $r$.

Input: an array $a[n]$ and a value $r$.

\[ 1 \leq n \leq 10^5 \]

\[ 1 \leq r \leq 10^9 \]

\[ 1 \leq a[i] \leq 10^9 \; \forall \; i \]

Output: the number of triplet subarrays $(i, j, k)$ for $0 \leq i < j < k < n$
where $a[k] = a[j] * r = a[i] * r^2$. For example, for $r = 2$, the array
```[5, 10, 20, 30, 40]``` has 2 geometric triplets: (0, 1, 2) and (1, 2, 4),
which correspond to values ```[5, 10, 20]``` and ```[10, 20, 40]```
respectively.

For each value $a[i]$ in the array, it seems that we need to know two pieces of
information:

- How many values before a[i] have we seen that are equal to $\frac{a[i]}{r}$?

\[ A_i = \left\{j : j < i, a[j] = \frac{a[i]}{r}\right\} \]

- For each of those values, how many values came before them that are equal to
$\frac{a[i]}{r^2}$?

\[ \sum_{j \in A_i} |A_j| \]

With this information, we can count the number of triplets for which $a[i]$ is
the last value. Use one map to count how many times each value $v$ has occurred
in the array:

\[ 
    \begin{align*}
    V_i(v) & \gets \{j : j < i, a[j] = v\} \\
    f_i(v) & \gets |V_i(v)|
    \end{align*}
\]

Use another map to count how many *pairs* of the form
$(\frac{a[i]}{r}, a[i])$ you can make so far for each value.

\[ g_i(v) \gets \sum_{j \in V_i(v)} |A_j| \]

\[ V_i\left(\frac{a[i]}{r}\right) = A_i \implies g_i(v) = \sum_{j \in V_i(v)} f_i\left(\frac{a[j]}{r}\right) \]

In my code, I refer to $f$ and $g$ as ```iTable``` and ```jTable```,
respectively.

For each value $v$ in $a$, check if $v$ is divisible by $r$. If it is not, then
it does not end any triplets, but it could be the start of a later one, so
increment $f(v)$. Otherwise, $g(\frac{v}{r})$ is the number of triplets ending
in $v$. Increment $g(v)$ by the number of times you have seen $\frac{v}{r}$,
which is $f(\frac{v}{r})$, and also increment $f(v)$ by one.

Java 8:
```java
static long countTriplets(List<Long> arr, long r) {
    Map<Long, Long> iTable = new HashMap<>();
    Map<Long, Long> jTable = new HashMap<>();
    long result = 0L;
    for (long val : arr) {
        if (val % r == 0) {
            long prev = val / r;
            result += jTable.getOrDefault(prev, 0L);
            
            long tripletsAsJ = jTable.getOrDefault(val, 0L);
            tripletsAsJ += iTable.getOrDefault(prev, 0L);
            jTable.put(val, tripletsAsJ);
        }
        iTable.put(val, iTable.getOrDefault(val, 0L) + 1L);
    }
    
    return result;
}
```

C++:
```cpp
long countTriplets(vector<long> arr, long r) {
    map<long, long> iTable;
    map<long, long> jTable;
    long result = 0L;
    for (auto val = arr.begin(); val != arr.end(); val++) {
        if (!(*val % r)) {
            long prev = *val / r;
            result += jTable[prev];
            jTable[*val] += iTable[prev];
        }
        iTable[*val]++;
    }
    
    return result;
}
```

Python 3:
```python
def countTriplets(arr, r):
    i_table = {}
    j_table = {}
    result = 0
    for val in arr:
        if not val % r:
            prev = val // r
            result += j_table.get(prev, 0)
            j_table[val] = j_table.get(val, 0) + i_table.get(prev, 0)
        i_table[val] = i_table.get(val, 0) + 1
        
    return result
```

[Back](../../hackerrank.md)
