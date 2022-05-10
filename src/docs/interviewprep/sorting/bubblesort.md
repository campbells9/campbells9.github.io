# Sorting: Bubble Sort

[Problem](https://www.hackerrank.com/challenges/ctci-bubble-sort/problem)

Category: Sorting

Difficulty: Easy

---

Given an array, return how many swaps are needed to sort the array with Bubble
Sort.

Input: an array $a[n]$ of integers.

\[ 2 \leq n \leq 600 \]

\[ 1 \leq a[i] \leq 2 \times 10^6 \; \forall \; i \]

Output: a message containing the number of swaps needed to sort $a$, as well as
elements $a[0]$ and $a[n - 1]$ after $a$ is sorted.

The problem gives you an example implementation of bubble sort, and it suffices
to use bubble sort on $a$ and count the number of times you swapped two
elements. 

Java 8:
```java
public static void countSwaps(List<Integer> a) {
    final int N = a.size();
    Integer[] arr = a.toArray(new Integer[N]);
    int swaps = 0;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swaps++;
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    a.clear();
    for (int val : arr) {
        a.add(val);
    }
    System.out.println("Array is sorted in " + swaps + " swaps.");
    System.out.println("First Element: " + arr[0]);
    System.out.println("Last Element: " + arr[N - 1]);
}
```

C++:
```cpp
void countSwaps(vector<int> a) {
    const int n = a.size();
    int swaps = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - 1; j++) {
            if (a[j] > a[j + 1]) {
                swaps++;
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    cout << "Array is sorted in " << swaps << " swaps." << endl;
    cout << "First Element: " << a[0] << endl;
    cout << "Last Element: " << a[n - 1] << endl;
}
```

Python 3:
```python
def countSwaps(a):
    swaps = 0
    for _ in list(a):
        for i in range(len(a) - 1):
            if a[i] > a[i + 1]:
                swaps += 1
                a[i], a[i + 1] = a[i + 1], a[i]
    print("Array is sorted in", swaps, "swaps.")
    print("First Element:", a[0])
    print("Last Element:", a[-1])
```

[Back](../../hackerrank.md)
