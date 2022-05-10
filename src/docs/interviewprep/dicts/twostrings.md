# Two Strings

[Problem](https://www.hackerrank.com/challenges/two-strings/problem)

Category: Dictionaries and Hashmaps

Difficulty: Easy

---

Given two strings, determine if they share any common substring.

Input: two strings $s_1$ and $s_2$ of lowercase English letters.

\[ 1 \leq |s_1|, |s_2| \leq 10^5 \]

Output: the string "YES" if there exists a non-empty string that is a substring
of both $s_1$ and $s_2$, otherwise the string "NO".

If $s_1$ and $s_2$ have a common non-empty substring, then they share at least
one letter in common. If $s_1$ and $s_2$ share a letter $c$ in common, then they
share the common substring "$c$" and the answer is Yes. Therefore, the answer
is Yes if and only if $s_1$ and $s_2$ have at least one letter in common. We
need to find one letter that is in both $s_1$ and $s_2$ to determine the answer
is Yes, and if the strings have no letters in common, the answer is No. This
is the condition we are trying to check:

\[ \{c : c \in s_1\} \cap \{c : c \in s_2\} \neq \emptyset \]

There are a few ways to do this. You can make separate sets with the characters
of $s_1$ and $s_2$ and calculate the intersection. You can make a set for $s_1$
and then check whether it contains any character of $s_2$. You can also make a
combined set for $s_1$ and $s_2$ and check for independence:

\[ |\{c : c \in s_1\} \cup \{c : c \in s_2\}| 
 = |\{c : c \in s_1\}| + |\{c : c \in s_2\}| \]

If the sets are independent, then the answer is No.

Java 8:
```java
public static String twoStrings(String s1, String s2) {
    Set<Character> s1set = new HashSet<>();
    for (int i = 0; i < s1.length(); i++) {
        s1set.add(s1.charAt(i));
    }
    for (int i = 0; i < s2.length(); i++) {
        if (s1set.contains(s2.charAt(i))) {
            return "YES";
        }
    }
    
    return "NO";
}
```

C++:
```cpp
string twoStrings(string s1, string s2) {
    set<char> s1set;
    for (auto ch = s1.begin(); ch != s1.end(); ch++) {
        s1set.insert(*ch);
    }
    for (auto ch = s2.begin(); ch != s2.end(); ch++) {
        if (s1set.find(*ch) != s1set.end()) {
            return "YES";
        }
    }
    
    return "NO";
}
```

Python 3:
```python
def twoStrings(s1, s2):
    return "YES" if set(s1) & set(s2) else "NO"
```

[Back](../../hackerrank.md)
