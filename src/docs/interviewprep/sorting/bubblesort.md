# Sorting: Bubble Sort

[Problem](https://www.hackerrank.com/challenges/ctci-bubble-sort/problem)

Category: Sorting

Difficulty: Easy

---

Given an array, return how many swaps are needed to sort the array with Bubble
Sort.

Input: an array $a[n]$ of integers.

$2 \leq n \leq 600$

$1 \leq a[i] \leq 2 \times 10^6 \; \forall \; i$

Output: a message containing the number of swaps needed to sort $a$, as well as
elements $a[0]$ and $a[n - 1]$ after $a$ is sorted.

The problem gives you an example implementation of bubble sort, so it would be
easy enough to use bubble sort on $a$ and count the number of times you swapped
two elements. The number of times bubble sort swaps two elements is the same as
the number of *inversions* in the array: an inversion occurs whenever any two
elements in the array are out of order and the larger one comes first. You can
use a merge sort instead of a bubble sort and count the inversions to get the
correct number of swaps.

Consider merging two sorted arrays $l$ and $r$:

- Start with the first elements of $l$ and $r$: $i \gets 0, j \gets 0$.
- If $l[i] \leq r[j]$, then add $l[i]$ to the merged array and increment $i$.
- If $l[i] > r[j]$, then add $r[j]$ to the merged array and increment $j$.
- If $i$ reaches the end of $l$, add the remaining elements of $r$ to the
merged array.
- If $j$ reaches the end of $r$, add the remaining elements of $l$ to the merged
array.

Note that every value in $l$ occurs before every value in $r$ in the original
array. When $r[j]$ is placed before $l[i]$ in the merged array, there is an
inversion. But if $r[j]$ is in front of $l[i]$, it will also go in front of
the remaining elements in $l$ after $i$. So when $r[j]$ is added to the merged
array, that represents $l.\text{length} - i$ inversions.

A good way to count the total swaps needed to sort the array is to write a
recursive merge sort function that returns the number of swaps made. This way,
you can split the array into left and right halves, sum up the swaps incurred
by each recursive call, and then add the the number of swaps counted when
merging the two sorted arrays.

Java 8:
```
public static void countSwaps(List<Integer> a) {
    final int N = a.size();
    Integer[] arr = a.toArray(new Integer[N]);
    int swaps = mergeSort(arr, 0, N);
    System.out.println("Array is sorted in " + swaps + " swaps.");
    System.out.println("First Element: " + arr[0]);
    System.out.println("Last Element: " + arr[N - 1]);
}

private static int mergeSort(Integer[] arr, int start, int end) {
    if (start >= end - 1) {
        return 0;
    }
    
    int mid = (start + end) / 2;
    int swaps = mergeSort(arr, start, mid);
    swaps += mergeSort(arr, mid, end);
    
    int[] temp = new int[end - start];
    int i = start;
    int j = mid;
    int pos = 0;
    while (i < mid && j < end) {
        if (arr[i] <= arr[j]) {
            temp[pos] = arr[i];
            i++;
        } else {
            swaps += mid - i;
            temp[pos] = arr[j];
            j++;
        }
        pos++;
    }
    while (i < mid) {
        temp[pos] = arr[i];
        i++;
        pos++;
    }
    while (j < end) {
        temp[pos] = arr[j];
        j++;
        pos++;
    }
    for (int k = 0; k < temp.length; k++) {
        arr[start + k] = temp[k];
    }
    
    return swaps;
}
```

C++:
```
int mergeSort(vector<int>&, int, int);

void countSwaps(vector<int> a) {
    const int n = a.size();
    int swaps = mergeSort(a, 0, n);
    cout << "Array is sorted in " << swaps << " swaps." << endl;
    cout << "First Element: " << a[0] << endl;
    cout << "Last Element: " << a[n - 1] << endl;
}

int mergeSort(vector<int>& a, int start, int end) {
    if (start >= end - 1) {
        return 0;
    }
    
    const int mid = (start + end) / 2;
    int swaps = mergeSort(a, start, mid);
    swaps += mergeSort(a, mid, end);
    
    vector<int> temp;
    int i = start;
    int j = mid;
    while (i < mid && j < end) {
        if (a[i] <= a[j]) {
            temp.push_back(a[i]);
            i++;
        } else {
            swaps += mid - i;
            temp.push_back(a[j]);
            j++;
        }
    }
    while (i < mid) {
        temp.push_back(a[i]);
        i++;
    }
    while (j < end) {
        temp.push_back(a[j]);
        j++;
    }
    for (int k = 0; k < temp.size(); k++) {
        a[start + k] = temp[k];
    }
    
    return swaps;
}
```

Python 3:
```
def countSwaps(a):
    swaps = mergeSort(a)
    print("Array is sorted in", swaps, "swaps.")
    print("First Element:", a[0])
    print("Last Element:", a[-1])
    
def mergeSort(a):
    if len(a) <= 1:
        return 0
    
    mid = len(a) // 2
    left = a[:mid]
    right = a[mid:]
    swaps = mergeSort(left) + mergeSort(right)
    i = 0
    j = 0
    a.clear()
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            a.append(left[i])
            i += 1
        else:
            swaps += len(left) - i
            a.append(right[j])
            j += 1
    a.extend(left[i:])
    a.extend(right[j:])
    
    return swaps
```

[Back](../../hackerrank.md)
