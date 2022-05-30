# Minimum Time Required

[Problem](https://www.hackerrank.com/challenges/minimum-time-required/problem)

Category: Search

Difficulty: Medium

---

Given the number of days it takes each machine to produce an item, determine how
many days it will take to fulfill an order of items.

Input: An array $m[n]$ of machines and a goal $g$, where the $i^\text{th}$
machine produces 1 item after every $m[i]$ days.

\[ 1 \leq n \leq 10^5 \]

\[ 1 \leq g \leq 10^9 \]

\[ 1 \leq m[i] \leq 10^9 \; \; \forall \; i \]

Output: the number of days it will take to produce at least $g$ items.

The first thing to observe is that, after a given number of days, we can compute
how many items each machine has produced so far. Machine $i$ produces an item
after each $m[i]$ days, so after $d$ days,

\[ \text{items}(d) = \sum_{i=1}^n \left\lfloor\frac{d}{m[i]}\right\rfloor \]

We need to search for the day $d$ where the number of items is no longer less
than $g$:

\[ \text{items}(d - 1) < g \leq \text{items}(d) \]

It is easy to compute items$(d)$ for any $d$, but it might seem hard to find
this point without just trying $d = 1, 2, 3, \ldots$ until you find it. A good
way to do this is with an
[exponential search](https://en.wikipedia.org/wiki/Exponential_search), which is
similar to a binary search. The idea is to try $d = 1, 2, 4, 8, \ldots$ until
you find some $2^k$ that has
$\text{items}(2^{k - 1}) < g \leq \text{items}(2^k)$. Then, you do a binary
search within the range $[2^{k - 1}, 2^k]$ to find the exact value $d$. Since
$d$ could be very large, this is usually significantly faster than a linear
search.

Java 8:
```java
static long minTime(long[] machines, long goal) {
    long target = 1L;
    long itemCount = items(machines, target);
    while (itemCount < goal) {
        target *= 2L;
        itemCount = items(machines, target);
    }
    
    long lowTarget = target / 2L;
    long highTarget = target;
    while (lowTarget + 1 < highTarget) {
        target = (highTarget + lowTarget) / 2L;
        itemCount = items(machines, target);
        if (itemCount < goal) {
            lowTarget = target;
        } else {
            highTarget = target;
        }
    }
    
    return highTarget;
}

private static long items(long[] machines, long days) {
    long result = 0L;
    for (long machine : machines) {
        result += days / machine;
    }
    
    return result;
}
```

C++:
```cpp
long items(vector<long>, long);

long minTime(vector<long> machines, long goal) {
    long target = 1L;
    long itemCount = items(machines, target);
    while (itemCount < goal) {
        target *= 2L;
        itemCount = items(machines, target);
    }
    
    long lowTarget = target / 2L;
    long highTarget = target;
    while (lowTarget + 1 < highTarget) {
        target = (highTarget + lowTarget) / 2L;
        itemCount = items(machines, target);
        if (itemCount < goal) {
            lowTarget = target;
        } else {
            highTarget = target;
        }
    }
    
    return highTarget;
}

long items(vector<long> machines, long days) {
    long result = 0L;
    for (auto m = machines.begin(); m != machines.end(); m++) {
        result += days / *m;
    }
    
    return result;
}
```

Python 3:
```python
def minTime(machines, goal):
    def items(days):
        return sum(days // m for m in machines)
        
    target = 1
    item_count = items(target)
    while item_count < goal:
        target *= 2
        item_count = items(target)
        
    low_target, high_target = target // 2, target
    while low_target + 1 < high_target:
        target = (high_target + low_target) // 2
        item_count = items(target)
        if item_count < goal:
            low_target = target
        else:
            high_target = target
            
    return high_target
```

[Back](../../hackerrank.md)
