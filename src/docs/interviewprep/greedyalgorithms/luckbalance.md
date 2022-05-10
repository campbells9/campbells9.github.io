# Luck Balance

[Problem](https://www.hackerrank.com/challenges/luck-balance/problem)

Category: Greedy Algorithms

Difficulty: Easy

---

Given a list of contests with "luck" values, which are either important or
unimportant, and a maximum number of important contests that can be lost,
determine the maximum possible amount of "stored luck" after all contests.

Input: two arrays $L[n]$ and $T[n]$, and $k$, the maximum number of important
contests that can be lost.  $L[i]$ is the luck value of contest $i$, and
$T[i] = 1$ if contest $i$ is important, else $T[i] = 0$.

\[ 1 \leq k \leq n \leq 100 \]

\[ 1 \leq L[i] \leq 10^4 \; \forall \; i \]

Output: the maximum amount of stored luck attainable after all contests. Luck
starts at 0, and winning contest $i$ decreases luck by $L[i]$, while losing
contest $i$ increases luck by $L[i]$.

The idea behind "saving luck" is that the more you lose, the greater your chance
of winning becomes in the future, and the more you win, the greater your chance
of losing becomes in the future. A contest $i$ with a high luck value $L[i]$
costs a lot of luck to win.

The first observation to make is that the constraint is that we can lose no more
than $k$ important contests, but there is no limit to the number of unimportant
contests we can lose. Every contest has a positive luck value, so we should lose
every unimportant contest. For important contests, we should lose as many as we
are allowed, and we should choose the contests with the largest luck values to
lose.

Make a list of the luck values for important contests and sort it. Add up to $k$
of the largest values to your overall luck value and subtract any remaining
values. Note that if you can lose at most $k$ contests, then you must win at
least $m.\text{length} - k$ important contests, where $m$ is the array of
important contests. If $k \geq m.\text{length}$, then you may lose every
important contest. You can either start from the highest values and choose $k$
contests to lose, or you can start from the lowest values and choose
$m.\text{length} - k$ contests to win.

Java 8:
```java
public static int luckBalance(int k, List<List<Integer>> contests) {
    int luck = 0;
    List<Integer> important = new ArrayList<>();
    for (List<Integer> contest : contests) {
        final int L = contest.get(0);
        final int T = contest.get(1);
        if (T == 1) {
            important.add(L);
        } else {
            luck += L;
        }
    }
    Collections.sort(important);
    
    int requiredWins = important.size() - k;
    for (int l : important) {
        if (requiredWins > 0) {
            luck -= l;
            requiredWins--;
        } else {
            luck += l;
        }
    }
    
    return luck;
}
```

C++:
```cpp
int luckBalance(int k, vector<vector<int>> contests) {
    vector<int> important;
    int luck = 0;
    for (auto contest = contests.begin(); contest != contests.end(); contest++) {
        const int L = contest->front();
        const int T = contest->back();
        if (T) {
            important.push_back(L);
        } else {
            luck += L;
        }
    }
    sort(important.begin(), important.end());
    for (auto l = important.rbegin(); l != important.rend(); l++) {
        if (k) {
            luck += *l;
            k--;
        } else {
            luck -= *l;
        }
    }
    
    return luck;
}
```

Python 3:
```python
def luckBalance(k, contests):
    important = [contest[0] for contest in contests if contest[-1]]
    important.sort(reverse = True)
    luck = sum(contest[0] for contest in contests if not contest[-1])
    for l in important:
        if k:
            luck += l
            k -= 1
        else:
            luck -= l
            
    return luck
```

[Back](../../hackerrank.md)
