# Balanced Brackets

[Problem](https://www.hackerrank.com/challenges/balanced-brackets/problem)

Category: Stacks and Queues

Difficulty: Medium

---

Determine whether a given string of brackets is balanced.

Input: a string $s$ of square brackets, curly brackets, or parentheses (```[```,
```]```, ```{```, ```}```, ```(```, or ```)```).

\[ 1 \leq |s| \leq 10^3 \]

Output: the string "YES" if $s$ is balanced, else the string "NO". $s$ is
balanced if every open bracket can be matched to a closing bracket of the same
type, and the string inside each set of brackets is matched. For example, a
balanced string of brackets could be ```"[{}]([]())"```, and unbalanced ones
could be ```"{}{"``` or ```"(([)])"```.

To better understand balanced brackets, you can think about how you would use
parentheses and brackets while writing code (or any text, for that matter). You
can nest them, but you must close each inner pair of brackets within its outer
pair. If you forget a closing bracket or put it in the wrong spot, you probably
get a syntax error.

Every time we find a close bracket, we need to make sure it matches the most
recent open bracket that hasn't been closed yet. We should use a stack to keep
track of each open bracket, so that when we find a close bracket, we can pop the
most recent open bracket and check if they match.

* If the close bracket doesn't match the open bracket on top of the stack, or if
the stack is empty when a close bracket is found, the string isn't balanced.
* After scanning the entire string, the string is balanced if and only if the
stack is empty.

Since there are only three types of brackets, it's fairly easy to manually check
for each in your loop. I found it convenient to use a map that pairs each open
bracket with its respective close bracket. You might assume you can add 1 to the
open bracket's [ASCII](https://www.asciitable.com/) value to get the close
bracket, but unfortunately the parentheses are 1 apart (40 and 41) while the
square and curly brackets are 2 apart (91 and 93, 123 and 125), so it wouldn't
work as cleanly as you might hope.

Java 8:
```java
public static String isBalanced(String s) {
    Map<Character, Character> bracketMap = new HashMap<>();
    bracketMap.put('(', ')');
    bracketMap.put('{', '}');
    bracketMap.put('[', ']');
    Stack<Character> stack = new Stack<>();
    for (int i = 0; i < s.length(); i++) {
        char ch = s.charAt(i);
        if (bracketMap.containsKey(ch)) {
            stack.push(ch);
        } else if (stack.isEmpty() || bracketMap.get(stack.pop()) != ch) {
            return "NO";
        }
    }
    
    return stack.isEmpty() ? "YES" : "NO";
}
```

C++:
```cpp
string isBalanced(string s) {
    stack<char> bracketStack;
    map<char, char> bracketMap;
    bracketMap['['] = ']';
    bracketMap['{'] = '}';
    bracketMap['('] = ')';
    for (auto ch = s.begin(); ch != s.end(); ch++) {
        auto rightBracket = bracketMap.find(*ch);
        if (rightBracket != bracketMap.end()) {
            bracketStack.push(*ch);
        } else {
            if (bracketStack.empty() || bracketMap[bracketStack.top()] != *ch) {
                return "NO";
            }
            
            bracketStack.pop();
        }
    }
    
    return bracketStack.empty() ? "YES" : "NO";
}
```

Python 3:
```python
def isBalanced(s):
    bracket_map = {"[": "]", "{": "}", "(": ")"}
    stack = []
    for ch in s:
        if ch in bracket_map:
            stack.append(ch)
        elif not stack or bracket_map[stack.pop()] != ch:
            return "NO"
        
    return "NO" if stack else "YES"
```

[Back](../../hackerrank.md)
