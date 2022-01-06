# Strings: Making Anagrams

[Problem](https://www.hackerrank.com/challenges/ctci-making-anagrams/problem)

Category: String Manipulation

Difficulty: Easy

---

Given two strings, determine the minimum number of character deletions required
to make the strings anagrams of each other.

Input: two strings $a$ and $b$ of lowercase English letters.

$1 \leq |a|, |b| \leq 10^4$

Output: the minimum number of character deletions required (total character
deletions from $a$ and $b$) to make $a$ and $b$ anagrams (the letters of $a$ can
be rearranged to create $b$, and vice versa).

For this problem, it is useful to create frequency tables that store how many
instances of each letter occur in $a$ and $b$. Two strings are anagrams of each
other if their frequency tables are the same. For example, ```"hello"``` and
```"leloh"``` are anagrams because both strings contain 1 ```'h'```, 1
```'e'```, 2 ```'l'```s, and 1 ```'o'```.

If $a$ and $b$ have the same frequencies for a letter $c$, then no instances of
$c$ need to be deleted from either string. However, if they do not have the same
number of $c$'s, then the string with more $c$'s needs to delete some instances
until both strings have the same number.

Let $c_a$ and $c_b$ be the number of instances of character $c \in [\text{a-z}]$
in $a$ and $b$ respectively. The minimum number of deletions needed $d$ is:

$d = \sum_{c \in [\text{a-z}]} |c_a - c_b|$

You can use maps for your frequency tables, or you can simply use arrays of 26
integers because the characters are limited to lowercase letters. With maps, it
would be easier to extend your solution to allow more characters.

Java 8:
```java
public static int makeAnagram(String a, String b) {
    Map<Character, Integer> aFreqMap = new HashMap<>();
    Map<Character, Integer> bFreqMap = new HashMap<>();
    for (int i = 0; i < a.length(); i++) {
        char ch = a.charAt(i);
        aFreqMap.put(ch, aFreqMap.getOrDefault(ch, 0) + 1);
    }
    for (int i = 0; i < b.length(); i++) {
        char ch = b.charAt(i);
        bFreqMap.put(ch, bFreqMap.getOrDefault(ch, 0) + 1);
    }
    
    int deletions = 0;
    for (char ch = 'a'; ch <= 'z'; ch++) {
        int aFreq = aFreqMap.getOrDefault(ch, 0);
        int bFreq = bFreqMap.getOrDefault(ch, 0);
        deletions += Math.abs(aFreq - bFreq);
    }
    
    return deletions;
}
```

C++:
```cpp
int makeAnagram(string a, string b) {
    map<char, int> aFreqMap, bFreqMap;
    for (auto ch = a.begin(); ch != a.end(); ch++) {
        aFreqMap[*ch]++;
    }
    for (auto ch = b.begin(); ch != b.end(); ch++) {
        bFreqMap[*ch]++;
    }
    
    int deletions = 0;
    for (char ch = 'a'; ch <= 'z'; ch++) {
        deletions += abs(aFreqMap[ch] - bFreqMap[ch]);
    }
    
    return deletions;
}
```

Python 3:
```python
def makeAnagram(a, b):
    letters = set(a) | set(b)
    a_freq = {ch: 0 for ch in letters}
    b_freq = {ch: 0 for ch in letters}
    for ch in a:
        a_freq[ch] += 1
    for ch in b:
        b_freq[ch] += 1
    deletions = 0
    for ch in letters:
        deletions += abs(a_freq[ch] - b_freq[ch])
        
    return deletions
```

[Back](../../hackerrank.md)
