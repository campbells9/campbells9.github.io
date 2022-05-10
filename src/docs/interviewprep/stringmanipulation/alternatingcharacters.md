# Alternating Characters

[Problem](https://www.hackerrank.com/challenges/alternating-characters/problem)

Category: String Manipulation

Difficulty: Easy

---

Given two strings of A's and B's, determine the minimum number of character
deletions required to make the string have alternating characters.

Input: a string $s$ of which every character is ```'A'``` or ```'B'```.

\[ 1 \leq |s| \leq 10^5 \]

Output: the minimum number of character deletions required to make $s$ have no
two consecutive A's or B's in a row (such that it follows the pattern
```"ABAB..."``` or ```"BABA..."```).

If we delete every character that matches the character before it, that is
sufficient to leave $s$ with alternating characters. There is no need to
actually modify the string or build a new string, because we only need to count
how many times a character $s[i]$ matches the character before it, $s[i - 1]$.

Java 8:
```java
public static int alternatingCharacters(String s) {
    int deletions = 0;
    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == s.charAt(i - 1)) {
            deletions++;
        }
    }
    
    return deletions;
}
```

C++:
```cpp
int alternatingCharacters(string s) {
    int deletions = 0;
    for (int i = 1; i < s.size(); i++) {
        deletions += s[i] == s[i - 1];
    }
    
    return deletions;
}
```

Python 3:
```python
def alternatingCharacters(s):
    return sum(s[i] == s[i - 1] for i in range(1, len(s)))
```

[Back](../../hackerrank.md)
