# Sorting: Comparator

[Problem](https://www.hackerrank.com/challenges/ctci-comparator-sorting/problem)

Category: Sorting

Difficulty: Medium

---

Write a function that can be used as a comparator to sort players by their
scores and names.

Input: two Player objects $a$ and $b$. $a$ and $b$'s names have only lowercase
English letters.

```
class Player {
    string name;
    int score;
}
```

\[ 0 \leq a.\text{score}, b.\text{score} \leq 1000 \]

Output: an integer that is:

- less than 0 if $a < b$: $a$ scored more points than $b$, or if they scored the
same number of points, $a$'s name comes before $b$'s alphabetically. $a$ should
come before $b$ in the sorted list of players.
- 0 if $a = b$: $a$ and $b$ scored the same number of points and have the same
name.
- more than 0 if $a > b$: $a$ scored fewer points than $b$, or if they scored
the same number of points, $a$'s name comes after $b$'s alphabetically. $a$
should come after $b$ in the sorted list of players.

The names are only relevant to the comparison if the players' scores are equal.
If $a$.score $\neq b$.score, a good value to return is $b$.score $- a$.score.
This will be less than 0 if $a$ scored more points than $b$ and more than 0 if
$a$ scored fewer points. If $a$.score $= b$.score, the problem reduces to
comparing $a$.name and $b$.name. We want all of the names with a given score to
be in their natural, alphabetical ordering, and many languages have string
classes with comparators or operators that achieve this for us. For example,
Java's ```String``` implements ```Comparable<String>```, so it has a
```compareTo``` we can use. C++'s ```string::compare``` method works similarly.

Java 8:
```java
public int compare(Player a, Player b) {
    if (a.score == b.score) {
        return a.name.compareTo(b.name);
    }

    return b.score - a.score;
}
```

Note: as of January 2022, there seems to be a bug in HackerRank's C++
boilerplate code for this problem. It expects your comparator to return -1 if
and only if $a > b$. -1 should signify that $a < b$, and typically it should be
appropriate to return any value less than 0 if $a < b$. HackerRank provides no
boilerplate for C++20, so I copied over the C++ boilerplate and fixed it.

C++20:
```cpp
struct Player {
    int score;
    string name;
};

class Checker {
    public:
        static int comparator(Player a, Player b)  {
            if (a.score == b.score) {
                return a.name.compare(b.name);
            }

            return b.score - a.score;
        }
};

bool compare(Player a, Player b) {
    return Checker::comparator(a, b) < 0;
}

int main() {
    int n;
    cin >> n;
    vector<Player> players;
    for (int i = 0; i < n; i++) {
        Player player;
        cin >> player.name >> player.score;
        players.push_back(player);
    }
    sort(players.begin(), players.end(), compare);
    for(auto player = players.begin(); player != players.end(); player++) {
        cout << player->name << " " << player->score << endl;
    }
    
    return 0;
}
```

Python 3:
```python
class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score
        
    def __repr__(self):
        return f"{self.name} {self.score}"
        
    def comparator(a, b):
        if a.score == b.score:
            return -1 if a.name < b.name else int(a.name > b.name)
            
        return b.score - a.score
```

[Back](../../hackerrank.md)
