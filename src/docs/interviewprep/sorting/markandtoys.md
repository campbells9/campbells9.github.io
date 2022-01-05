# Mark and Toys

[Problem](https://www.hackerrank.com/challenges/mark-and-toys/problem)

Category: Sorting

Difficulty: Easy

---

Given prices of toys and a budget, determine the greatest number of toys that
can be bought.

Input: an array $p[n]$ of prices of toys, and a budget $k$.

$1 \leq n \leq 10^5$

$1 \leq k \leq 10^9$

$1 \leq p[i] \leq 10^9 \; \forall \; i$

Output: the greatest number of toys that can be bought with $k$ units of
currency. For prices $p_1, \ldots, p_n$, we are trying to pick toys 
$I \subseteq \{1, \ldots, n\}$ with maximum $|I|$ such that:

$\sum_{i \in I} p_i \leq k$

To maximize the number of toys purchased, you can use a greedy algorithm to
always buy the cheapest toys possible. Sort $p$ from lowest to highest and read
through the prices, subtracting each one from the budget. Once the budget or
list of prices runs out, the number of toys bought is the correct answer.

The greedy approach works because maximumToys$(p, \cdot)$ is monotonic: for any
$j \leq k$, you can buy at least as many toys from $p$ with $k$ units of
currency as you can with $j$ units of currency. Choosing the cheapest toy leaves
the greatest amount of currency remaining, which means you can buy the greatest
number of toys possible out of the remaining options. 

Java 8:
```
public static int maximumToys(List<Integer> prices, int k) {
    final int N = prices.size();
    Integer[] p = prices.toArray(new Integer[N]);
    Arrays.sort(p);
    
    int toys = 0;
    while (toys < N && p[toys] <= k) {
        k -= p[toys];
        toys++;
    }
    
    return toys;
}
```

C++:
```
int maximumToys(vector<int> prices, int k) {
    vector<int> p = prices;
    sort(p.begin(), p.end());
    
    const int n = p.size();
    int toys = 0;
    while (toys < n && p[toys] <= k) {
        k -= p[toys];
        toys++;
    }
    
    return toys;
}
```

Python 3:
```
def maximumToys(prices, k):
    toys = 0
    for toy in sorted(prices):
        if k >= toy:
            k -= toy
            toys += 1
        else:
            return toys
            
    return toys
```

[Back](../../hackerrank.md)
