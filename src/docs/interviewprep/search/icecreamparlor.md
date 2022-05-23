# Hash Tables: Ice Cream Parlor

[Problem](https://www.hackerrank.com/challenges/ctci-ice-cream-parlor/problem)

Category: Search

Difficulty: Medium

---

Given a list of flavor costs, find the pair of flavors that requires the given
amount of money to buy.

Input: an array of costs $c[n]$, and an integer $m$, the amount of money.
Different flavors can have the same cost.

\[ 2 \leq m \leq 10^9 \]

\[ 2 \leq n \leq 5 \times 10^4 \]

\[ 1 \leq c[i] \leq 10^9 \; \; \forall \; i \]

Output: two one-based indices that correspond to the two flavors whose costs add
up to exactly $m$. Note that you can assume there is exactly one solution
$(i, j)$ with $i < j$ and $c[i] + c[j] = m$. 

The problem of finding two values in an array that add up to a target value is a
popular coding problem. The simplest solution is to read through the array and
maintain a set of the values seen so far. Before adding a value $c[i]$, check
the set for its "complement" $m - c[i]$. If some previous $c[j]$ has that value,
then a solution has been found. Make sure you search for the complement *before*
adding $c[i]$ to the set, because you might have $c[i] = \frac{m}{2}$ and
$c[i] = m - c[i]$, where you will incorrectly report that $c[i]$ matches with
itself.

This version of the problem guarantees that a solution always exists, and it
asks for the indices of the solution. Instead of a set, it will be helpful to
use a map that maps each cost to its index in $c$. An interesting property of
this problem is that while costs are not unique, there is guaranteed to be a
unique solution, which means that if two costs $c[i]$ and $c[j]$ are the same,
either they are the *only* solution ($c[i] = c[j] = \frac{m}{2}$ and no other
cost is $\frac{m}{2}$) or they are irrelevant to the solution. Therefore, if the
same cost occurs multiple times in $c$, we don't need to worry about which index
it maps to in our map. Don't forget to use one-based indices for the answer
(which probably involves either storing one-based indices in your map or just
adding 1 to each index at the end) and print the lower index first.

Java 8:
```java
public static void whatFlavors(List<Integer> cost, int money) {
    Map<Integer, Integer> priceToIdx = new HashMap<>();
    Iterator<Integer> readCosts = cost.iterator();
    int id1 = -1;
    int id2 = 0;
    while (readCosts.hasNext() && id1 == -1) {
        int c = readCosts.next();
        if (priceToIdx.containsKey(money - c)) {
            id1 = priceToIdx.get(money - c);
        } else {
            priceToIdx.put(c, id2);
            id2++;
        }
    }
    id1++;
    id2++;
    System.out.println(id1 + " " + id2);
}
```

C++:
```cpp
void whatFlavors(vector<int> cost, int money) {
    map<int, int> priceToIdx;
    int id1 = -1;
    int id2 = 0;
    auto readCost = cost.begin();
    while (readCost != cost.end() && id1 == -1) {
        auto complement = priceToIdx.find(money - *readCost);
        if (complement != priceToIdx.end()) {
            id1 = complement->second;
        } else {
            priceToIdx[*readCost] = id2;
            id2++;
        }
        readCost++;
    }
    id1++;
    id2++;
    cout << id1 << " " << id2 << endl;
}
```

Python 3:
```python
def whatFlavors(cost, money):
    price_to_idx = {}
    id1, id2 = -1, 0
    read_cost = iter(cost)
    while id1 == -1:
        c = next(read_cost)
        if money - c in price_to_idx:
            id1 = price_to_idx[money - c]
        else:
            price_to_idx[c] = id2
            id2 += 1
    id1 += 1
    id2 += 1
    print(id1, id2)
```

[Back](../../hackerrank.md)
