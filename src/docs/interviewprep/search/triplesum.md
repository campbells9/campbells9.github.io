# Triple Sum

[Problem](https://www.hackerrank.com/challenges/triple-sum/problem)

Category: Search

Difficulty: Medium

---

Given three arrays, find the number of unique triples ($(p, q, r)$ with one from
each array) where the middle value (the one from the second array) is the
largest.

Input: three arrays $a[n_a]$, $b[n_b]$, and $c[n_c]$, which need not be the same
size.

\[ 1 \leq n_a, n_b, n_c \leq 10^5 \]

\[ 1 \leq a[i], b[i], c[i] \leq 10^8 \; \; \forall \; i \]

Output: the number of unique pairs $(p, q, r)$ with $p \in a$, $q \in b$,
$r \in c$, and $p \leq q \geq r$ or $q = \max(p, q, r)$.

The first useful steps are to sort the arrays and remove any duplicate values.
We don't want any duplicates within each array because we are only interested
in counting unique $(p, q, r)$ triples. Duplicates are generally easiest to
remove after sorting, because then any duplicate values will be adjacent to each
other. However, you can also just put each array's elements into a set to remove
duplicates first.

From here, consider each $q \in b$. How many $(p, q, r)$ triples can we make
with that $q$? For each $p \in a$ with $p \leq q$, we can take each $r \in c$
with $r \leq q$ and make a $(p, q, r)$ triple. You can imagine taking the prefix
of $a$ with values at most $q$ and the prefix of $c$ with values at most $q$ and
taking their cross product (multiplying their lengths). Start with empty
prefixes for $a$ and $c$, and then for each $q \in b$, extend the prefixes until
they include all values that are less than or equal to $q$, and then add the
product of the prefixes' new lengths to your result.

Java 8:
```java
static long triplets(int[] a, int[] b, int[] c) {
    Set<Integer> aSet = new TreeSet<>();
    Set<Integer> bSet = new TreeSet<>();
    Set<Integer> cSet = new TreeSet<>();
    for (int v : a) {
        aSet.add(v);
    }
    for (int v : b) {
        bSet.add(v);
    }
    for (int v : c) {
        cSet.add(v);
    }
    
    List<Integer> aSorted = new ArrayList<>(aSet);
    List<Integer> cSorted = new ArrayList<>(cSet);
    int aIdx = 0;
    int cIdx = 0;
    long result = 0L;
    for (int v : bSet) {
        while (aIdx < aSorted.size() && aSorted.get(aIdx) <= v) {
            aIdx++;
        }
        while (cIdx < cSorted.size() && cSorted.get(cIdx) <= v) {
            cIdx++;
        }
        result += (long) aIdx * cIdx;
    }
    
    return result;
}
```

C++:
```cpp
long triplets(vector<int> a, vector<int> b, vector<int> c) {
    sort(a.begin(), a.end());
    sort(b.begin(), b.end());
    sort(c.begin(), c.end());
    a.resize(distance(a.begin(), unique(a.begin(), a.end())));
    b.resize(distance(b.begin(), unique(b.begin(), b.end())));
    c.resize(distance(c.begin(), unique(c.begin(), c.end())));
    
    int aIdx = 0;
    int cIdx = 0;
    long result = 0L;
    for (auto val = b.begin(); val != b.end(); val++) {
        while (aIdx < a.size() && a[aIdx] <= *val) {
            aIdx++;
        }
        while (cIdx < c.size() && c[cIdx] <= *val) {
            cIdx++;
        }
        result += (long) aIdx * cIdx;
    }
    
    return result;
}
```

Python 3
```python
def triplets(a, b, c):
    a = sorted(set(a))
    b = sorted(set(b))
    c = sorted(set(c))
    a_idx, c_idx = 0, 0
    result = 0
    for v in b:
        while a_idx < len(a) and a[a_idx] <= v:
            a_idx += 1
        while c_idx < len(a) and c[c_idx] <= v:
            c_idx += 1
        result += a_idx * c_idx
        
    return result
```

[Back](../../hackerrank.md)
