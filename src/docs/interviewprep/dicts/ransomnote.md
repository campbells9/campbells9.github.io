# Hash Tables: Ransom Note

[Problem](https://www.hackerrank.com/challenges/ctci-ransom-note/problem)

Category: Dictionaries and Hashmaps

Difficulty: Easy

---

Given a list of words in a magazine, determine whether it is possible to cut out
enough words to write a given ransom note.

Input: arrays $magazine[m]$ and $note[n]$ of strings, each of which is a word
made of uppercase and lowercase English letters.

\[ 1 \leq m, n \leq 3 \times 10^5 \]

Output: print ```Yes``` if it is possible to arrange the words of $magazine$ to
write the $note$, otherwise print ```No```. For example, if the $note$ is
```["two", "plus", "two", "is", "four"]```, then if the $magazine$ contains two
```"two"```s, a ```"plus"```, an ```"is"```, and a ```"four"```, then the output
is ```Yes```. If it is missing any of those, or it only has one ```"two"```, or
there is a ```"Plus"``` instead of a ```"plus"```, then the answer is ```No```.
Note that the words are case-sensitive.

It is not enough to know that every word in $note$ is also in $magazine$; there
must be as many instances of any word in $magazine$ as there are in $note$. You
can use maps to count the number of occurences in each word of $magazine$ and
$note$. The answer is ```No``` if there is a word in your $note$ map that either
doesn't occur in $magazine$ or occurs fewer times in $magazine$ than in $note$.

Java 8:
```java
public static void checkMagazine(List<String> magazine, List<String> note) {
    Map<String, Integer> magazineFreq = new HashMap<>();
    Map<String, Integer> noteFreq = new HashMap<>();
    for (String word : magazine) {
        magazineFreq.put(word, magazineFreq.getOrDefault(word, 0) + 1);
    }
    for (String word : note) {
        noteFreq.put(word, noteFreq.getOrDefault(word, 0) + 1);
    }
    for (String word : noteFreq.keySet()) {
        if (noteFreq.get(word) > magazineFreq.getOrDefault(word, 0)) {
            System.out.println("No");
            
            return;
        }
    }
    
    System.out.println("Yes");
}
```

C++:
```cpp
void checkMagazine(vector<string> magazine, vector<string> note) {
    map<string, int> magazineFreq;
    map<string, int> noteFreq;
    for (auto word = magazine.begin(); word != magazine.end(); word++) {
        magazineFreq[*word]++;
    }
    for (auto word = note.begin(); word != note.end(); word++) {
        noteFreq[*word]++;
    }
    for (auto entry = noteFreq.begin(); entry != noteFreq.end(); entry++) {
        if (entry->second > magazineFreq[entry->first]) {
            cout << "No" << endl;
            
            return;
        }
    }
    
    cout << "Yes" << endl;
}
```

Python 3:
```python
def checkMagazine(magazine, note):
    magazine_freq = {word: 0 for word in magazine}
    note_freq = {word: 0 for word in note}
    for word in magazine:
        magazine_freq[word] += 1
    for word in note:
        note_freq[word] += 1
    for word, freq in note_freq.items():
        if word not in magazine_freq or magazine_freq[word] < freq:
            print("No")
            
            return
        
    print("Yes")
```

[Back](../../hackerrank.md)
