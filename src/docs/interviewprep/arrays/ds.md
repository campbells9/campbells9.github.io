# 2D Array - DS

[Problem](https://www.hackerrank.com/challenges/2d-array/problem)

Category: Arrays

Difficulty: Easy

---

Given a 6x6 array, find the maximum "hourglass sum."

Input: a 2D array, $arr[i][j]$ for $1 \leq i, j \leq 6$.

$-9 \leq arr[i][j] \leq 9 \; \forall \; i, j$

Output: the maximum hourglass sum of the array. For any 3x3 block of $arr$, the
hourglass sum is the sum of the top 3, bottom 3, and center entries:

```[[a, b, c], [d, e, f], [g, h, i]]``` $\; \to \; a + b + c + e + g + h + i$

Every hourglass sum is at least -63 and at most 63.

There are only 16 possible 3x3 blocks in $arr$, so there are only 16 hourglass
sums to check. You can loop through the center entries of each block
($arr[1][1] \ldots arr[4][4]$) and calculate an hourglass sum for each.

Java 8:
```
public static int hourglassSum(List<List<Integer>> arr) {
    final int SIZE = 6;
    Integer[][] mat = new Integer[SIZE][SIZE];
    int i = 0;
    for (List<Integer> row : arr) {
        mat[i] = row.toArray(mat[i]);
        i++;
    }
    
    final int END = SIZE - 1;
    final int MIN_VAL = -9;
    int max = MIN_VAL * 7;
    for (i = 1; i < END; i++) {
        for (int j = 1; j < END; j++) {
            int sum = mat[i - 1][j - 1] + mat[i - 1][j] + mat[i - 1][j + 1];
            sum += mat[i][j];
            sum += mat[i + 1][j - 1] + mat[i + 1][j] + mat[i + 1][j + 1];
            max = Math.max(max, sum);
        }
    }
    
    return max;
}
```

C++:
```
int hourglassSum(vector<vector<int>> arr) {
    const int minVal = -9;
    int maxSum = minVal * 7;
    const int end = arr.size() - 1;
    for (int i = 1; i < end; i++) {
        for (int j = 1; j < end; j++) {
            int sum = arr[i - 1][j - 1] + arr[i - 1][j] + arr[i - 1][j + 1];
            sum += arr[i][j];
            sum += arr[i + 1][j - 1] + arr[i + 1][j] + arr[i + 1][j + 1];
            maxSum = max(maxSum, sum);
        }
    }
    
    return maxSum;
}
```

Python 3:
```
def hourglassSum(arr):
    min_val = -9
    max_sum = min_val * 7
    end = len(arr) - 1
    for i in range(1, end):
        for j in range(1, end):
            hourglass_sum = sum(arr[i - 1][(j - 1):(j + 2)])
            hourglass_sum += arr[i][j]
            hourglass_sum += sum(arr[i + 1][(j - 1):(j + 2)])
            max_sum = max(max_sum, hourglass_sum)
            
    return max_sum
```

[Back](../../hackerrank.md)
