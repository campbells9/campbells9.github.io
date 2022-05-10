# Sherlock and Anagrams

[Problem](https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem)

Category: Dictionaries and Hashmaps

Difficulty: Medium

---

Given a string, determine how many pairs of substrings of the string are
anagrams of each other.

Input: a string $s$ of lowercase English letters.

\[ 2 \leq |s| \leq 100 \]

Output: the number of anagrammatic pairs of substrings in the string. The
substrings can overlap, and separate pairs can have substrings with the same
content. For example, ```"lolol"``` has 12 anagrams:

- 3 pairs of ```"l"``` and ```"l"```
- ```"o"``` and ```"o"```
- 4 pairs of ```"lo"``` and ```"ol"```
- ```"lo"``` and ```"lo"```
- ```"ol"``` and ```"ol"```
- ```"lol"``` and ```"lol"```
- ```"lolo"``` and ```"olol"```

Two substrings can only be anagrams if they are the same length. For any
$1 \leq k < |s|$, there are $|s| - (k - 1)$ substrings of length $k$. You will
need to check every pair of $k$-length substrings for each $k$ from 1 to $|s|$,
making the total number of pairs to check:

\[ \sum_{k=1}^{|s|} {|s| - (k - 1) \choose 2} \]

We won't need to check every single pair of substrings, but we will need to at
least look at every substring once. The number of substrings of $s$ is:

\[ \sum_{k=1}^{|s|} (|s| - (k - 1)) = {|s| \choose 2} = \frac{|s|(|s| + 1)}{2} \]

Note that ${|s| \choose 2}$ is the number of ways to choose a start index and a
stop index in $s$, and therefore the number of ways to choose a substring.

There are a few ways to check if two strings are anagrams, but one way that is
particularly useful for this problem is to *sort the characters of each string
and check if the strings become equal*. The strings will become equal after
sorting if and only if they are anagrams of each other.

For each substring in $s$, sort the characters to get a sorted substring. Use a
map to keep track of how many occurences of each sorted substring you find. If
you find a sorted substring $n$ times, then there are $n$ substrings of $s$
which sort to that sorted substring, and those $n$ substrings are all anagrams
of each other. That means that those $n$ substrings account for
${n \choose 2} = \frac{n(n + 1)}{2}$ anagrammatic pairs.

Java 8:
```java
public static int sherlockAndAnagrams(String s) {
    int anagrams = 0;
    Map<String, Integer> substringFreq = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
        for (int j = i + 1; j <= s.length(); j++) {
            String sub = s.substring(i, j);
            sub = sortedString(sub);
            substringFreq.put(sub, substringFreq.getOrDefault(sub, 0) + 1);
        }
    }
    for (String sub : substringFreq.keySet()) {
        int count = substringFreq.get(sub);
        anagrams += count * (count - 1) / 2;
    }
    
    return anagrams;
}

private static String sortedString(String s) {
    char[] chars = s.toCharArray();
    Arrays.sort(chars);
    
    return new String(chars);
}
```

C++:
```cpp
int sherlockAndAnagrams(string s) {
    map<string, int> substringFreq;
    for (int k = 1; k < s.size(); k++) {
        for (int i = 0; i <= s.size() - k; i++) {
            string sub = s.substr(i, k);
            sort(sub.begin(), sub.end());
            substringFreq[sub]++;
        }
    }
    
    int anagrams = 0;
    for (auto sub = substringFreq.begin(); sub != substringFreq.end(); sub++) {
        anagrams += sub->second * (sub->second - 1) / 2;
    }
    
    return anagrams;
}
```

Python 3:
```python
def sherlockAndAnagrams(s):
    freq = {}
    for i in range(len(s)):
        for j in range(i + 1, len(s) + 1):
            sub = "".join(sorted(s[i:j]))
            freq[sub] = freq.get(sub, 0) + 1
    
    anagrams = 0
    for val in freq.values():
        anagrams += val * (val - 1) // 2
        
    return anagrams
```

[Back](../../hackerrank.md)
