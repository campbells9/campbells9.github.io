# Fraudulent Activity Notifications

[Problem](https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem)

Category: Sorting

Difficulty: Medium

---

Given a list of a client's expenditures for each day, determine how many
potential fraud alerts should be issued to them.

Input: an array $x[n]$ of the expenditures of each day for $n$ days, and a
number of trailing days to consider, $d$.

\[ 1 \leq d \leq n \leq 2 \times 10^5 \]

\[ 0 \leq x[i] \leq 200 \; \forall \; i \]

Output: the number of times a potential fraud notification should have been
issued. A potential fraud notification is issued if a day's expenditures are at
least $2m$, where $m$ is the median of the previous $d$ days' expenditures.

On each day $i$, we care about how $x[i]$ compares to the median of the previous
$d$ days, from $i - 1$ to $i - d$. For the next day, we will need a new median,
with day $i$ replacing the day that was previously $d$ days ago. If we have a
list of $d$ numbers and change one of them arbitrarily, it is hard to know
exactly how the median will change without recomputing it from scratch.

The expenditures only range from 0 to 200. Consider a table $f(v)$ that stores
the frequency of each value. Let the table only counts the frequencies over the
previous $d$ days:

\[ \sum_{i=0}^{200} f(i) = d \]

How would you find the median value over the previous $d$ days with this table?
It is easy to find the median of a sorted list: it is the middle entry if $d$ is
odd and the average of the two middle entries if $d$ is even. It is possible to
use the table to recreate a sorted list of the previous $d$ days, but it is also
possible to compute the median from the table directly. The middle entry is the
lowest value $m$ for which the cumulative sum
$\sum_{i=0}^m f(i) > \lfloor\frac{d}{2}\rfloor$. Note that you will need the
average of two middle values if $d$ is even, but the two middle values might
be the same. The lower middle value $m^-$ is the highest value for which the sum
is less than $\lfloor\frac{d}{2}\rfloor$, and the higher middle value $m^+$ is
$m$ as before.

You only need to compute a median if $d$ days have past, and to update the
table, you increment $f(x[i])$ and decrement $f(x[i - d])$.

Java 8:
```java
static int activityNotifications(int[] expenditure, int d) {
    Map<Integer, Integer> counts = new TreeMap<>();
    int result = 0;
    for (int i = 0; i < expenditure.length; i++) {
        if (i >= d) {
            if (expenditure[i] >= Math.round(2.0 * median(counts, d))) {
                result++;
            }
            counts.put(expenditure[i - d], counts.get(expenditure[i - d]) - 1);
        }
        counts.put(expenditure[i], counts.getOrDefault(expenditure[i], 0) + 1);
    }
    
    return result;
}

private static double median(Map<Integer, Integer> counts, int d) {
    int total = 0;
    int low = 0;
    int high = 0;
    Iterator<Integer> iter = counts.keySet().iterator();
    int i = iter.next();
    while (total <= d / 2) {
        high = i;
        if (total < d / 2) {
            low = i;
        }
        total += counts.get(i);
        i = iter.next();
    }
    
    return d % 2 == 0 ? (high + low) / 2.0 : high;
}
```

C++:
```cpp
double median(map<int, int>&, int);

int activityNotifications(vector<int> expenditure, int d) {
    map<int, int> counts;
    int result = 0;
    for (int i = 0; i < expenditure.size(); i++) {
        if (i >= d) {
            result += expenditure[i] >= round(2.0 * median(counts, d));
            counts[expenditure[i - d]]--;
        }
        counts[expenditure[i]]++;
    }
    
    return result;
}

double median(map<int, int>& counts, int d) {
    int total = 0;
    int high = 0;
    int low = 0;
    int i = 0;
    while (total <= d / 2) {
        high = i;
        if (total < d / 2) {
            low = i;
        }
        total += counts[i];
        i++;
    }
    
    return d % 2 ? high : (high + low) / 2.0;
}
```

Python 3:
```python
def activityNotifications(expenditure, d):
    def median(counts, d):
        total = 0
        high, low = 0, 0
        i = 0
        while total <= d // 2:
            high = i
            if total < d // 2:
                low = i
            total += counts.get(i, 0)
            i += 1
        
        return high if d % 2 else (high + low) / 2
        
    counts = {}
    result = 0
    for i, exp in enumerate(expenditure):
        if i >= d:
            if exp >= round(2 * median(counts, d)):
                result += 1
            counts[expenditure[i - d]] -= 1
        counts[exp] = counts.get(exp, 0) + 1
        
    return result
```

[Back](../../hackerrank.md)
