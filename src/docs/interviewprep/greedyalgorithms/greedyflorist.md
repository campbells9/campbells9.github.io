# Greedy Florist

[Problem](https://www.hackerrank.com/challenges/greedy-florist/problem)

Category: Greedy Algorithms

Difficulty: Medium

---

Given a list of flower prices and a number of customers, determine the minimum
possible cost of buying every flower.

Input: an array $c[n]$ of the cost of each flower, and $k$, the number of
customers in the group.

\[ 1 \leq n, k \leq 100 \]

\[ 1 \leq c[i] \leq 10^6 \; \; \forall \; i \]

Output: the minimum possible cost of buying every flower. Each customer can buy
any number of the flowers in any order. The catch is that for each purchase, the
florist multiplies the price by 1 plus the number of flowers that customer has
already bought. If a customer first buys flower $i$, it costs $c[i]$, and if
they next buy flower $j$, it costs $2c[j]$, then the next cost is multiplied by
3, and so on.

The group has to buy all $n$ flowers in the list, so we have to incur every
price. In general, the more expensive a flower is, the lower we want the
multiplier to be when we purchase it. Therefore, it makes sense to buy the most
expensive flowers first when the multiplier is low, and save the cheapest
flowers for when the multiplier is highest. Also, we should try to distribute
the flower purchases as evenly as possible among the customers. For example, it
would never be optimal to have one customer buy three flowers while another only
buys one flower. That third flower $i$ costs $3c[i]$ for the first customer, but
it would only cost $2c[i]$ if the other customer bought it instead.

Here is the greedy strategy: the $k$ customers each buy the most expensive
flower available, getting the $k$ most expensive flowers with multiplier 1.
Then, they repeat, buying the next $k$ most expensive flowers with multiplier 2.
They repeat until there are no more flowers left to buy. Think of the multipler
as the number of times the customer has to buy that flower. We want to buy the
most expensive flowers as few times as possible, and we should save the cheapest
flowers for when we have to buy many of them.

Here's a quick exchange argument for why this is always optimal: suppose an
optimal solution differs from ours, such that for some flower $i$ that we bought
with multiplier $k$, the optimal solution buys $i$ later with a higher
multiplier $\ell > k$, and instead buys some other flower $j$ with multiplier
$k$. If our algorithm picked $i$ instead of $j$ to buy with multiplier $k$, it
must be the case that

\[
    \begin{align*}
    c[j] & \leq c[i] \\
    (\ell - k)c[j] & \leq (\ell - k)c[i] \\
    \ell c[j] - k c[j] & \leq \ell c[i] - k c[i] \\
    k c[i] + \ell c[j] & \leq \ell c[i] + k c[j]
    \end{align*}    
\]

using $\ell - k > 0$. Therefore, if you were to swap $i$ and $j$ in the optimal
solution to purchase $i$ with multiplier $k$ (like our algorithm does) and $j$
with multiplier $\ell$, it would not increase the total cost. You could
continuously swap flowers like this for every point at which the optimal
solution chooses differently from ours, and the cost would never increase.
Therefore, our algorithm's solution must be an optimal solution.

Java 8:
```java
static int getMinimumCost(int k, int[] c) {
    c = Arrays.copyOf(c, c.length);
    Arrays.sort(c);
    
    int multiplier = 1;
    int cost = 0;
    int customers = k;
    int index = c.length - 1;
    while (index >= 0) {
        if (customers == 0) {
            customers = k;
            multiplier++;
        }
        cost += c[index] * multiplier;
        customers--;
        index--;
    }
    
    return cost;
}
```

C++:
```cpp
int getMinimumCost(int k, vector<int> c) {
    vector<int> prices = c;
    sort(prices.begin(), prices.end());
    reverse(prices.begin(), prices.end());
    
    int multiplier = 1;
    int totalCost = 0;
    int customers = k;
    for (auto price = prices.begin(); price != prices.end(); price++) {
        if (!customers) {
            customers = k;
            multiplier++;
        }
        totalCost += *price * multiplier;
        customers--;
    }
    
    return totalCost;
}
```

Python 3:
```python
def getMinimumCost(k, c):
    cost = 0
    multiplier = 1
    customers = k
    for price in sorted(c, reverse=True):
        if not customers:
            customers = k
            multiplier += 1
        cost += price * multiplier
        customers -= 1
    
    return cost
```

[Back](../../hackerrank.md)
