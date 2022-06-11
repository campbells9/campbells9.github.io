# Largest Rectangle

[Problem](https://www.hackerrank.com/challenges/largest-rectangle/problem)

Category: Stacks and Queues

Difficulty: Medium

---

Given a list of building heights, find the area of the largest shopping mall
that could be built in place of the buildings.

Input: an array of integers $h[n]$ which represent the heights of buildings.

\[ 1 \leq n \leq 10^5 \]

\[ 1 \leq h[i] \leq 10^6 \; \; \forall \; i \]

Output: the area of the largest possible building (a rectangle with its base on
the ground) that is contained by other buildings. For example, if the building
heights are ```[1, 5, 3, 4, 2]```, then a building of height 3 can span from the
5 to the 4 with an area of $3 \times 3 = 9$. A building with height 3 cannot
extend further to the left or right because the buildings of heights 1 and 2
would not contain it.

The height of any subarray of $h[i:j]$ is the minimum height of any building in
that subarray, $\min_{i \leq k < j}(h[k])$. The length of the subarray is
the number of buildings it spans ($j - i$), and we are trying to find the
subarray with maximum area $(j - i)\min_{i \leq k < j}(h[k])$.

For each building $i$, we would like to know two things:

* Where is the closest building on the *left* that is strictly shorter than
building $i$?
* Where is the closest building on the *right* that is strictly shorter than
building $i$?

If we put the shopping mall at building $i$ with height $h[i]$, this tells us
how far to the left and right we are allowed to extend it. The optimum maximum
rectangle must encompass and have the same height as some building $i$
(otherwise, it could be made taller), so if we answer these questions for every
building in $h$, we can compute the areas of $n$ rectangles and output the
maximum area as the answer.

Consider a pass over the buildings from left to right. You can think of each
building as the starting point of an interval, where the closing point is the
next building that is shorter. So each interval represents how far you could
"extend" that building to the right. To find the areas of each interval, you
could create a stack and an $n$-length array of areas. At each building $i$, the
stack should contain the indices of every building whose interval is still open.
Notice that the buildings in this stack will be sorted by ascending height
because a shorter building that comes after a larger one would contradict the
fact that the larger building's interval is open.

When you pop $j$ from the stack, you can determine whether $i$ closes $j$'s
interval. If it does, you can add the number of elements between $j$ and $i$ to
$j$'s area. You are looking for the first building in the stack that is shorter
than $i$. This building is the left endpoint for $i$, so you can add the number
of buildings between that and $i$ to $i$'s area. Note that previous buildings
with the same height as $i$ are a special case that you might encounter first:
these buildings' intervals are not closed by $i$, but they are not a left
endpoint for $i$ either. At the end of the iteration, these elements must go
back into the stack, and then $i$ goes on top, as they are all the most recent
buildings with open intervals.

After scanning over all $n$ buildings, you will have a stack of buildings with
intervals that are open at the end of the array. Lastly, you have to go through
the stack and add the area on the right side of each building. Once every
building in the stack has been handled, you should have computed an area for
each building, and the answer is the maximum area.

Java 8:
```java
public static long largestRectangle(List<Integer> h) {
    int n = h.size();
    Stack<Integer> stack = new Stack<>();
    long[] area = new long[n];
    for (int i = 0; i < n; i++) {
        int height = h.get(i);
        while (!stack.isEmpty() && h.get(stack.peek()) > height) {
            int prev = stack.pop();
            int prevHeight = h.get(prev);
            area[prev] += (long) (i - prev - 1) * prevHeight;
        }
        
        long extraArea = 0L;
        if (!stack.isEmpty()) {
            extraArea = (long) (i - stack.peek()) * height;
        }
        
        Stack<Integer> equalHeightStack = new Stack<>();
        while (!stack.isEmpty() && h.get(stack.peek()) == height) {
            int prev = stack.pop();
            equalHeightStack.push(prev);
            area[prev] += extraArea;
        }
        if (!stack.isEmpty()) {
            area[i] = (long) (i - stack.peek()) * height;
        }
        while (!equalHeightStack.isEmpty()) {
            stack.push(equalHeightStack.pop());
        }
        if (stack.isEmpty()) {
            area[i] = (long) (i + 1) * height;
        }
        stack.push(i);
    }
    if (!stack.isEmpty()) {
        int prev = stack.pop();
        int prevHeight = h.get(prev);
        long extraArea = (long) (n - prev - 1) * prevHeight;
        area[prev] += extraArea;
        while (!stack.isEmpty()) {
            prev = stack.pop();
            
            int height = h.get(prev);
            if (height < prevHeight) {
                prevHeight = height;
                extraArea = (long) (n - prev - 1) * prevHeight;
            }
            area[prev] += extraArea;
        }
    }
    
    long result = 0L;
    for (int i = 0; i < n; i++) {
        result = Math.max(result, area[i]);
    }
    
    return result;
}
```

C++:
```cpp
long largestRectangle(vector<int> h) {
    int n = h.size();
    stack<int> s;
    vector<long> area(n);
    for (int i = 0; i < n; i++) {
        while (!s.empty() && h[s.top()] > h[i]) {
            int prev = s.top();
            area[prev] += (long) (i - prev - 1) * h[prev];
            s.pop();
        }
        
        long extraArea = 0L;
        if (!s.empty()) {
            extraArea = (long) (i - s.top()) * h[i];
        }
        
        stack<int> equalHeightIdxs;
        while (!s.empty() && h[s.top()] == h[i]) {
            int prev = s.top();
            equalHeightIdxs.push(prev);
            area[prev] += extraArea;
            s.pop();
        }
        if (!s.empty()) {
            area[i] = (long) (i - s.top()) * h[i];
        }
        while (!equalHeightIdxs.empty()) {
            s.push(equalHeightIdxs.top());
            equalHeightIdxs.pop();
        }
        if (s.empty()) {
            area[i] = (long) (i + 1) * h[i];
        }
        s.push(i);
    }
    if (!s.empty()) {
        int prev = s.top();
        int prevHeight = h[prev];
        long extraArea = (long) (n - prev - 1) * prevHeight;
        area[prev] += extraArea;
        s.pop();
        while (!s.empty()) {
            prev = s.top();
            if (h[prev] < prevHeight) {
                prevHeight = h[prev];
                extraArea = (long) (n - prev - 1) * prevHeight;
            }
            area[prev] += extraArea;
            s.pop();
        }
    }
    
    long result = 0L;
    for (auto val = area.begin(); val != area.end(); val++) {
        result = max(result, *val);
    }
    
    return result;
}
```

Python 3:
```python
def largestRectangle(h):
    s = []
    area = [0 for _ in h]
    for i, height in enumerate(h):
        while s and h[s[-1]] > height:
            prev = s.pop()
            area[prev] += (i - prev - 1) * h[prev]
        
        extra_area = 0
        if s:
            extra_area = (i - s[-1]) * height
        
        equal_height_idxs = []
        while s and h[s[-1]] == height:
            prev = s.pop()
            equal_height_idxs.append(prev)
            area[prev] += extra_area
        if s:
            area[i] = (i - s[-1]) * height
        while equal_height_idxs:
            s.append(equal_height_idxs.pop())
        if not s:
            area[i] = (i + 1) * height
        s.append(i)
    if s:
        prev = s.pop()
        prev_height = h[prev]
        extra_area = (n - prev - 1) * prev_height
        area[prev] += extra_area
        while s:
            prev = s.pop()
            if h[prev] < prev_height:
                prev_height = h[prev]
                extra_area = (n - prev - 1) * prev_height
            area[prev] += extra_area
            
    return max(area)
```

[Back](../../hackerrank.md)
