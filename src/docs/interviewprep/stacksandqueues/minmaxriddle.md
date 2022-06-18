# Min Max Riddle

[Problem](https://www.hackerrank.com/challenges/min-max-riddle/problem)

Category: Stacks and Queues

Difficulty: Medium

---

Given an array of $n$ integers, for each possible window size 1 through $n$,
find the largest possible minimum value of a subarray of that length.

Input: an array of integers $a[n]$.

\[ 1 \leq n \leq 10^6 \]

\[ 1 \leq a[i] \leq 10^9 \; \; \forall \; i \]

Output: an $n$-length array where the $i^\text{th}$ element is the largest
possible minimum value of an $i$-length subarray of $a$.

Note that if the window size is 1, the answer is the maximum element in the
array. If the window size is $n$, the answer is the minimum element in the
array. The resulting array is going to be sorted in nonincreasing order, because
adding more elements to a subarray cannot increase its minimum value.

For each index $i$, consider the subarrays that have $a[i]$ as their minimum
element. There's always at least one: the length 1 subarray that only includes
that element. There may be more if some number of elements to the left or right
are greater than or equal to $a[i]$. A good idea is to find for each $i$ the
largest window size for which $a[i]$ is the minimum of a subarray. This can be
computed with a stack (similar to [Largest Rectangle](largestrectangle.md)). For
each index $i$, you initialize its max window size to the number of elements
since the last element that was less than $a[i]$ (or the start of the array if
there is no such element), and you determine this by popping elements from the
stack until you find that element (or the stack runs out). Then, you push $i$
onto the stack and "open" its window. Later, when $i$ is popped from the stack,
you "close" its window and add the number of elements that have since passed to
its max window size. In the end, you empty the stack and "close" any remaining
open windows, and you will have another array $m[n]$ where each $m[i]$ is the
maximum window size of a subarray that has the element $a[i]$ as its minimum.
Remember, at least one element is a maximum with $m[i] = 1$, and at least one
element is a minimum with $m[i] = n$.

Using $m$, for each $1 \leq k \leq n$, we need to find the largest element that
is the minimum of a $k$-length subarray. All of the elements in $m$ with
$m[i] \geq k$ can be written in such a subarray. I chose to map each value
$m[i]$ that appears in $m$ to the maximum $a[j]$ such that $m[i] = m[j]$. In
other words, I map each max window size to the largest element that has that max
window size. From there, you can fill in your output array backwards: for each
$i$ from $n$ to 1, you can check your map for the largest element with max
window size $i$, or check the result for $i + 1$ if no mapping exists.

Java 8:
```java
static long[] riddle(long[] arr) {
    int n = arr.length;
    int[] maxMinWindow = new int[n];
    Stack<Integer> stack = new Stack<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
            int prev = stack.pop();
            maxMinWindow[prev] += i - prev - 1;
        }
        
        int prev = stack.isEmpty() ? -1 : stack.peek();
        maxMinWindow[i] = i - prev;
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        int prev = stack.pop();
        maxMinWindow[prev] += n - prev - 1;
    }
    
    Map<Integer, Long> sizeToMaxMin = new HashMap<>();
    for (int i = 0; i < n; i++) {
        long maxMin = sizeToMaxMin.getOrDefault(maxMinWindow[i], 0L);
        sizeToMaxMin.put(maxMinWindow[i], Math.max(maxMin, arr[i]));
    }
    
    long[] result = new long[n];
    result[n - 1] = sizeToMaxMin.get(n);
    for (int i = n - 2; i >= 0; i--) {
        long maxMin = sizeToMaxMin.getOrDefault(i + 1, 0L);
        result[i] = Math.max(maxMin, result[i + 1]);
    }
    
    return result;
}
```

C++:
```cpp
vector<long> riddle(vector<long> arr) {
    int n = arr.size();
    vector<int> maxMinWindow(n);
    stack<int> s;
    for (int i = 0; i < n; i++) {
        while (!s.empty() && arr[s.top()] >= arr[i]) {
            int prev = s.top();
            s.pop();
            maxMinWindow[prev] += i - prev - 1;
        }
        
        int prev = s.empty() ? -1 : s.top();
        maxMinWindow[i] = i - prev;
        s.push(i);
    }
    while (!s.empty()) {
        int prev = s.top();
        s.pop();
        maxMinWindow[prev] += n - prev - 1;
    }
    
    map<int, long> sizeToMaxMin;
    for (int i = 0; i < n; i++) {
        long maxMin = sizeToMaxMin[maxMinWindow[i]];
        sizeToMaxMin[maxMinWindow[i]] = max(maxMin, arr[i]);
    }
    
    vector<long> result(n);
    result[n - 1] = sizeToMaxMin[n];
    for (int i = n - 2; i >= 0; i--) {
        result[i] = max(sizeToMaxMin[i + 1], result[i + 1]);
    }
    
    return result;
}
```

Python 3:
```python
def riddle(arr):
    n = len(arr)
    max_min_window, stack = [], []
    for i, val in enumerate(arr):
        while stack and arr[stack[-1]] >= val:
            prev = stack.pop()
            max_min_window[prev] += i - prev - 1
        prev = stack[-1] if stack else -1
        max_min_window.append(i - prev)
        stack.append(i)
    while stack:
        prev = stack.pop()
        max_min_window[prev] += n - prev - 1
    
    size_to_max_min = {}
    for val, window in zip(arr, max_min_window):
        max_min = size_to_max_min.get(window, 0)
        size_to_max_min[window] = max(max_min, val)
    
    result = [size_to_max_min[n]]
    for i in reversed(range(1, n)):
        max_min = size_to_max_min.get(i, 0)
        result.append(max(max_min, result[-1]))
        
    return list(reversed(result))
```

[Back](../../hackerrank.md)
