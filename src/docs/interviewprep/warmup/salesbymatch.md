# Sales by Match

[Problem](https://www.hackerrank.com/challenges/sock-merchant/problem)

Category: Warm-up Challenges

Difficulty: Easy

---

Given a list of socks, determine how many pairs of matching-color socks can be
made.

Input: a list of socks $ar[n]$, where $ar[i]$ is an integer representing
the color of sock $i$.

\[ 1 \leq n \leq 100 \]

\[ 1 \leq ar[i] \leq 100 \; \forall \; i \]

Output: the maximum number of pairs that can be achieved by pairing socks that
have the same color

We don't need the number of total possible ways to pair the socks; we just need
to maximum number of pairs achievable by any pairing where no sock is matched to
a sock of a different color. For example, ```[1, 1, 1, 1, 1]``` has at most 2
matches: one way to achieve this is by matching sock 0 to sock 1 and sock 2 to
sock 3, leaving sock 4 unpaired.

Make a set to store available sock colors and loop through the list of socks.
Check if each sock's color is in the set so far:

- If sock $i$'s color is not in the set, then you have no sock to pair with $i$.
$i$ is a loose sock available for a future pairing.
- If sock $i$'s color is in the set, then there is a previous sock available to
pair with $i$. Remove $i$'s color from the set and record that a pair has been
made.

Another solution could be to count how many socks there are of each color. If
a color appears on $k$ socks, then $\lfloor \frac{k}{2} \rfloor$ is the number
of pairs that can be made with that color.

Java 8:
```java
public static int sockMerchant(int n, List<Integer> ar) {
    int count = 0;
    Set<Integer> colors = new HashSet<>();
    for (int sock : ar) {
        if (colors.remove(sock)) {
            count++;
        } else {
            colors.add(sock);
        }
    }
    
    return count;
}
```

C++:
```cpp
int sockMerchant(int n, vector<int> ar) {
    int count = 0;
    set<int> colors;
    for (int i = 0; i < n; i++) {
        if(colors.erase(ar[i])) {
            count++;
        } else {
            colors.insert(ar[i]);
        }
    }
    
    return count;
}
```

Python 3:
```python
def sockMerchant(n, ar):
    colors = set()
    count = 0
    for i in ar:
        if i in colors:
            count += 1
            colors.remove(i)
        else:
            colors.add(i)
            
    return count
```

Python 3 Alternate Solution:
```python
def sockMerchant(n, ar):
    sock_freq = {sock: ar.count(sock) for sock in ar}
    
    return sum(v // 2 for _, v in sock_freq.items())
```

[Back](../../hackerrank.md)
