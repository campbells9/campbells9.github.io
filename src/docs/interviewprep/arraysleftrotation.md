# Arrays: Left Rotation

[Problem](https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem)

Category: Arrays

Difficulty: Easy

---

Given an array, rotate it to the left by $d$ elements.

Input: an array $a[n]$ and a number of rotations to make, $d$.

$1 \leq d \leq n \leq 10^5$

$1 \leq a[i] \leq 10^6 \; \forall \; i$

Output: the array shifted $d$ elements to the left. For example, for the
following array, shifting to the left by 1 element gives:

```[1, 2, 3, 4]``` $\to$ ```[2, 3, 4, 1]```

By 3 elements:

```[1, 2, 3, 4]``` $\to$ ```[2, 3, 4, 1]``` $\to$ ```[3, 4, 1, 2]``` $\to$ ```[4, 1, 2, 3]```

Shifting by 4 elements brings the array back to its original order.

The array could be modified in place, but for this problem it is okay to use an
extra array to store the values in their new positions without overriding the
values in the original array. For the value at position $i$, you can calculate
its new position $i'$ with $d$:

$i' \gets (i - d)$ mod $n$

Note that using the modulus operator with negative numbers may not always work
the way you expect. You might need to add $n$:

$i' \gets (i - d + n)$ mod $n$

The new array should have the elements from $d$ to the end, followed by the
elements from 0 to $d - 1$.

The description suggests that you should modify the array passed to the
function, but it also works to create and return a new array with the correct
values.

Java 8:
```
public static List<Integer> rotLeft(List<Integer> a, int d) {
    Iterator<Integer> iter = a.iterator();
    List<Integer> start = new LinkedList<>();
    for (int i = 0; i < d; i++) {
        start.add(iter.next());
    }
    
    List<Integer> newList = new LinkedList<>();
    while (iter.hasNext()) {
        newList.add(iter.next());
    }
    a.clear();
    a.addAll(newList);
    a.addAll(start);
    
    return a;
}
```

C++:
```
vector<int> rotLeft(vector<int> a, int d) {
    int n = a.size();
    vector<int> newVector(n, 0);
    for (int i = 0; i < n; i++) {
        newVector[(i - d + n) % n] = a[i];
    }
    a = newVector;
    
    return a;
}
```

Python 3:
```
def rotLeft(a, d):
    new_list = a[d:] + a[:d]
    a.clear()
    a.extend(new_list)
    
    return a
```