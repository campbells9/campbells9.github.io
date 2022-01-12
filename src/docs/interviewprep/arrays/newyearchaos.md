# New Year Chaos

[Problem](https://www.hackerrank.com/challenges/new-year-chaos/problem)

Category: Arrays

Difficulty: Medium

---

Given the order of a group of people waiting in line, determine the minimum
number of times it must have occurred that a person swapped places with the
person in front of them.

Input: an array $q[n]$, which stores a permutation of the values
$\{1, 2, \ldots, n\}$.

$1 \leq n \leq 10^5$

Output: the minimum number of "bribes" that must have taken place in $q$. When a
person commits a bribe, they swap places with the person immediately in front of
them. For example, if $n = 4$, the line starts out as ```[1, 2, 3, 4]```. If
person 3 bribes the person in front of them, the line becomes
```[1, 3, 2, 4]```. If they bribe the person in front of them again, the line
becomes ```[3, 1, 2, 4]```. Nobody is allowed to make more than 2 bribes, so if
$q$ suggests that a person must have made more than 2 brides, print the message
```"Too chaotic"```.

$q$ represents a line of people, where $q[0]$ is the person at the front and
$q[n - 1]$ is the last person in line. From now on, think of "moving forward" as
going to the left and "moving backward" as going to the right in the array. For
a person $q[i]$, the people $q[j]$ for $j < i$ are ahead of $q[i]$ in line, and
the people $q[j]$ for $j > i$ are behind $q[i]$ in line.

Here are a few observations to make:

- Person $q[i]$ starts at index $q[i] - 1$. Every time they make a bribe, they
move forward one position, and every time another person bribes them, they move
backward one position.
- Person $q[i]$ can only bribe two times at most, so they can be at most two
positions in front of their starting position. $q[i]$ started at $q[i] - 1$, so
their new position $i$ must be at least $q[i] - 3$.
- $i < q[i] - 3$ implies that the person $q[i]$ must have bribed at least 3
people, so $q$ is too chaotic.
- Any person in front of $q[i]$ whose value is greater than $q[i]$ must have
bribed them. If $q[j] > q[i]$ and $j < i$, then $q[j]$ bribed $q[i]$.
- Any person who bribed $q[i]$ could only have bribed one other person. They can
be at most one position in front of $q[i]$'s starting position $q[i] - 1$. If
$q[j]$ bribed $q[i]$, then $q[i] - 2 \leq j < i$.

It turns out that $i < q[i] - 3$ if and only if $q[i]$ must have bribed at least
3 people. You may wonder about a situation where $q[i]$ bribes more than 2
people, but then gets bribed by many others and ends up behind where they
started. In order for this to happen, some of the people $q[i]$ bribed would
have to have bribed them back, making those bribes unnecessary. We are looking
for the minimum possible number bribes that could have been made to achieve $q$,
so we are only interested in counting bribes that are strictly necessary.

For each person $q[i]$ in the array, check whether $i \geq q[i] - 3$ to
determine if the person made no more than 2 bribes, and then count how many
bribes $q[i]$ must have received. Anyone who bribed $q[i]$ must be between
positions $q[i] - 2$ and $i$.

Java 8:
```java
public static void minimumBribes(List<Integer> q) {
    final int N = q.size();
    Integer[] arr = q.toArray(new Integer[N]);
    int result = 0;
    for (int i = 0; i < N; i++) {
        if (i < arr[i] - 3) {
            System.out.println("Too chaotic");
            
            return;
        }
        
        for (int j = Math.max(arr[i] - 2, 0); j < i; j++) {
            if (arr[j] > arr[i]) {
                result++;
            }
        }
    }
    System.out.println(result);
}
```

C++:
```cpp
void minimumBribes(vector<int> q) {
    const int n = q.size();
    int result = 0;
    for (int i = 0; i < n; i++) {
        if (i < q[i] - 3) {
            cout << "Too chaotic" << endl;
            
            return;
        }
        
        for (int j = max(q[i] - 2, 0); j < i; j++) {
            result += q[j] > q[i];
        }
    }
    cout << result << endl;
}
```

Python 3:
```python
def minimumBribes(q):
    result = 0
    for i, val in enumerate(q):
        if i < val - 3:
            return print("Too chaotic")
        
        result += sum(q[j] > q[i] for j in range(max(val - 2, 0), i))
    print(result)
```

[Back](../../hackerrank.md)
