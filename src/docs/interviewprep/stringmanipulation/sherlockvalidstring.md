# Sherlock and the Valid String

[Problem](https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem)

Category: String Manipulation

Difficulty: Medium

---

Given a string, determine whether either every character in the string occurs an
equal number of times, or one character could be deleted to achieve this
condition.

Input: a string $s$ of lowercase English letters.

\[ 1 \leq |s| \leq 10^5 \]

Output: the string "YES" if every letter in $s$ occurs with the same frequency,
or if they would all occur with the same frequency if a single character was
deleted, otherwise the string "NO".

We can make a table of the frequency of each letter a-z in $s$, and then we need
to check whether the values in that table meet the condition. The answer is
Yes if and only if at least one of these conditions holds for some $k$:

- the frequency of every letter in $s$ is $k$
- the frequency of every letter in $s$ is $k$ except for one letter, which has
frequency $k + 1$
- the frequency of every letter in $s$ is $k$ except for one letter, which has
frequency 1

Note that deleting an instance of a letter with $k + 1$ instances causes all
letters to have frequency $k$, but so does removing a letter with frequency 1,
as that would remove the letter from consideration.

It is possible to check this condition with one pass over the values of the
table by keeping some properties in mind:

- If you find 3 distinct values, the answer is No. If every value is the same
and there is only one distinct value, the answer is Yes.
- If you find two values that are the same, that must be the common frequency.
- If you find 2 distinct values with a difference of more than 1, then the
answer is No, unless one of the values is 1 (in which case, that value must be
deleted).

My solutions keep a couple flags and check several conditions in order to output
No as soon as the condition becomes impossible to satisfy. However, as there can
only be at most 26 frequency values in your table, it is fine to make many more
passes over the values to achieve a simpler solution.

Java 8:
```java
public static String isValid(String s) {
    Map<Character, Integer> freq = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
        char ch = s.charAt(i);
        freq.put(ch, freq.getOrDefault(ch, 0) + 1);
    }
    
    boolean foundRemoval = false;
    boolean foundMatch = false;
    int commonFreq = 0;
    for (int value : freq.values()) {
        if (commonFreq == 0) {
            commonFreq = value;
        } else if (commonFreq == value) {
            foundMatch = true;
        } else {
            if (foundRemoval) {
                return "NO";
            }
            
            if (value - 1 == commonFreq || value == 1) {
                foundRemoval = true;
            } else if ((value + 1 == commonFreq || commonFreq == 1) 
                    && !foundMatch) {
                commonFreq = value;
                foundMatch = true;
                foundRemoval = true;
            } else {
                return "NO";
            }
        }
    }
    
    return "YES";
}
```

C++:
```cpp
string isValid(string s) {
    map<char, int> freq;
    for (auto ch = s.begin(); ch != s.end(); ch++) {
        freq[*ch]++;
    }
    
    bool foundRemoval = false;
    bool foundMatch = false;
    int commonFreq = 0;
    for (auto it = freq.begin(); it != freq.end(); it++) {
        int value = it->second;
        if (!commonFreq) {
            commonFreq = value;
        } else if (commonFreq == value) {
            foundMatch = true;
        } else {
            if (foundRemoval) {
                return "NO";
            }
            
            if (value - 1 == commonFreq || value == 1) {
                foundRemoval = true;
            } else if ((value + 1 == commonFreq || commonFreq == 1) 
                    && !foundMatch) {
                commonFreq = value;
                foundMatch = true;
                foundRemoval = true;
            } else {
                return "NO";
            }
        }
    }
    
    return "YES";
}
```

Python 3:
```python
def isValid(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    
    found_removal = False
    found_match = False
    common_freq = 0
    for v in freq.values():
        if not common_freq:
            common_freq = v
        elif common_freq == v:
            found_match = True
        else:
            if found_removal:
                return "NO"
            
            if v - 1 == common_freq or v == 1:
                found_removal = True
            elif (v + 1 == common_freq or common_freq == 1) and not found_match:
                common_freq = v
                found_match = True
                found_removal = True
            else:
                return "NO"
            
    return "YES"
```

Alternate Python 3 Solution:
```python
def isValid(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    
    values = tuple(freq.values())
    value_count = len(set(values))
    if value_count >= 3:
        return "NO"
    
    if value_count <= 1:
        return "YES"
    
    v1, v2 = tuple(set(values))
    value_freqs = {v : values.count(v) for v in (v1, v2)}
    required_freq = len(freq) - 1
    v1_match = value_freqs[v1] == required_freq
    v2_match = value_freqs[v2] == required_freq
    v1_remove = value_freqs[v1] == 1 and (v1 in (1, v2 + 1))
    v2_remove = value_freqs[v2] == 1 and (v2 in (1, v1 + 1))

    return "YES" if v1_match and v2_remove or v2_match and v1_remove else "NO"
```

[Back](../../hackerrank.md)
