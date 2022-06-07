# Candies

[Problem](https://www.hackerrank.com/challenges/candies/problem)

Category: Dynamic Programming

Difficulty: Medium

---

Given a list of students' ratings, determine the minimum number of candies
needed to reward each student.

Input: an array $a[n]$ of integers that represent the performance of each
student. The students sit in a line in order, so student $i$ sits next to
students $i - 1$ and $i + 1$, for example.

\[ 1 \leq n \leq 10^5 \]

\[ 1 \leq a[i] \leq 10^5 \; \; \forall \; i \]

Output: the minimum total number of candies required to reward all of the
students. Each student should earn at least one candy. For any two students
sitting next to each other, if one has a higher rating, they must earn more
candies than the other. Note that adjacent students with the same rating are not
required to get the same number of candies.

It makes sense to try an iterative approach where you create an $n$-length array
to track how many candies each student has. You start by giving each student one
candy and make passes over $a$ where you check which student needs to be given
extra candies in each pair of adjacent students. If a student has a higher
rating than one of their neighbors, they need at least 2 candies. If they have a
higher rating than neighbors on both sides, they need at least 3 candies.
They'll need more than that if those neighbors with lower ratings need multiple
candies. The largest number of candies a student could ever need is $n$: imagine
if the students are lined up in order by increasing rating. You could give the
leftmost student one candy, so their neighbor needs 2 candies, and so on until
the $n^\text{th}$ student needs $n$ candies. If each pass gives at least one
candy to a student, you will eventually converge upon a good solution with some
finite number of passes.

A different approach, which is still dynamic programming, can solve this problem
with only two passes over $a$, one forwards and one backwards. Let
$a =$```[1, 5, 3, 2, 4]``` and consider the following two observations:

1. You can split $a$ into disjoint strictly increasing sections. These would be
```[1, 5]```, ```[3]```, and ```[2, 4]```. For each of these sections, each
student needs at least one more candy than the student on their left (if there
is one).
2. You can also split $a$ into disjoint strictly decreasing sections. These
would be ```[1]```, ```[5, 3, 2]```, and ```[4]```. For each of these sections,
each student needs at least one more candy than the student on their right (if
there is one).

Starting with every student having one candy ($c =$```[1, 1, 1, 1, 1]```), we
can first make a pass that satisfies the first condition: ```[1, 2, 1, 1, 2]```.
Then, we make a backward pass to increase each student's candy count until it
satisfies the second condition: ```[1, 3, 2, 1, 2]```. This ends up giving us an
optimal candy assignment. On your forward pass, you let $c[i] = c[i - 1] + 1$
wherever $a[i] > a[i - 1]$. On your backward pass, you let $c[i] = c[i + 1] + 1$
wherever $a[i] > a[i + 1]$ and $c[i] \leq c[i + 1]$. We started by only giving
each student one candy, and we increased their candy counts a little as possible
to satisfy the requirements. The answer is the sum of the $n$ values in the
array $c$.

Java 8:
```java
public static long candies(int n, List<Integer> arr) {
    long[] candies = new long[n];
    Arrays.fill(candies, 1L);
    for (int i = 1; i < n; i++) {
        if (arr.get(i) > arr.get(i - 1)) {
            candies[i] += candies[i - 1];
        }
    }
    for (int i = n - 2; i >= 0; i--) {
        if (arr.get(i) > arr.get(i + 1)) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1L);
        }
    }
    
    long result = 0L;
    for (int i = 0; i < n; i++) {
        result += candies[i];
    }
    
    return result;
}
```

C++:
```cpp
long candies(int n, vector<int> arr) {
    vector<long> candies(n, 1L);
    for (int i = 1; i < n; i++) {
        candies[i] += candies[i - 1] * (arr[i] > arr[i - 1]);
    }
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            candies[i] = max(candies[i], candies[i + 1] + 1L);
        }
    }
    
    long result = 0L;
    for (int i = 0; i < n; i++) {
        result += candies[i];
    }
    
    return result;
}
```

Python 3:
```python
def candies(n, arr):
    dp = [1 for _ in arr]
    for i in range(1, n):
        dp[i] += dp[i - 1] * (arr[i] > arr[i - 1])
    for i in range(n - 2, -1, -1):
        if arr[i] > arr[i + 1]:
            dp[i] = max(dp[i], dp[i + 1] + 1)
            
    return sum(dp)
```

[Back](../../hackerrank.md)
