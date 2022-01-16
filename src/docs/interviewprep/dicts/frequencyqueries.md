# Frequency Queries

[Problem](https://www.hackerrank.com/challenges/frequency-queries/problem)

Category: Dictionaries and Hashmaps

Difficulty: Medium

---

Respond to a list of queries for how many times a number appears in a data
structure.

Input: a list of operations $q$ where $q_i = (t_i, v_i)$. $t_i$ indicates the
type of the $i^{\text{th}}$ operation:

- $t_i = 1$: add an instance of $v_i$ to the data structure.
- $t_i = 2$: remove an instance of $v_i$ from the data structure.
- $t_i = 3$: query whether there is a number in the data structure that occurs
exactly $v_i$ times.

$1 \leq |q| \leq 10^5$

$1 \leq v_i \leq 10^9 \; \forall \; i$

Output: a list of integers that contains a response to each $t_i = 3$ query in
order: 1 if there is a number with frequency $v_i$ in the data structure, 0
otherwise. The list will be $|\{i : t_i = 3\}|$ elements long.

We could solve this problem with a map that stores the frequency of each value.
Type 1 and 2 operations update the map's $v_i$ entry, and then for each type 3
query, we need to search the keys of the map until we find one that has
frequency $v_i$. However, it would be better if we could look up values by
frequency in order to answer queries without checking the frequency of every
value. We can accomplish this with a second map that is keyed by frequencies.
Multiple values can have the same frequency, so you want to map each frequency
to the set of values that occur with that frequency.

If $f(v)$ is your lookup table, where $f_i(v)$ is the number of instances of $v$
in the data structure by the $i^{\text{th}}$ iteration, then your other map
$f^{-1}(v)$ should store the pullbacks of $f$:

\[ f_i^{-1}(v) = \{u : f_i(u) = v\} \]

Now, you can read through the operations and handle them as follows:

- $t_i = 1$: remove $v_i$ from $f^{-1}(f(v_i))$ and add it to
$f^{-1}(f(v_i) + 1)$, then increment $f(v_i)$.
- $t_i = 2$: remove $v_i$ from $f^{-1}(f(v_i))$ and add it to
$f^{-1}(f(v_i) - 1)$, then decrement $f(v_i)$.
- $t_i = 3$: add 0 to the output if $f^{-1}(v_i) = \emptyset$, else add 1

For my reference solutions, I implemented this data structure as a class called
```FrequencyTable```. I refer to $f$ and $f^{-1}$ as ```freq``` and
```freqLookup``` respectively.

Java 8:
```java
static List<Integer> freqQuery(List<List<Integer>> queries) {
    FrequencyTable freqTable = new FrequencyTable();
    List<Integer> result = new ArrayList<>();
    for (List<Integer> q : queries) {
        int type = q.get(0);
        int val = q.get(1);
        if (type == 1) {
            freqTable.insert(val);
        } else if (type == 2) {
            freqTable.delete(val);
        } else {
            result.add(freqTable.hasFrequency(val) ? 1 : 0);
        }
    }
    
    return result;
}

private static class FrequencyTable {
    private Map<Integer, Integer> freq;
    private Map<Integer, Set<Integer>> freqLookup;
    
    public FrequencyTable() {
        freq = new HashMap<>();
        freqLookup = new HashMap<>();
    }
    
    public void insert(int x) {
        int f = freq.getOrDefault(x, 0);
        freq.put(x, f + 1);
        if (f > 0) {
            freqLookup.get(f).remove(x);
        }
        if (!freqLookup.containsKey(f + 1)) {
            freqLookup.put(f + 1, new HashSet<>());
        }
        freqLookup.get(f + 1).add(x);
    }
    
    public void delete(int y) {
        int f = freq.getOrDefault(y, 0);
        if (f > 0) {
            freq.put(y, f - 1);
            freqLookup.get(f).remove(y);
            if (f > 1) {
                freqLookup.get(f - 1).add(y);
            }
        }
    }
    
    public boolean hasFrequency(int z) {
        Set<Integer> freqSet = freqLookup.get(z);
        
        return freqSet != null && !freqSet.isEmpty();
    }
}
```

C++:
```cpp
class FrequencyTable {
    private:
        map<int, int> freq;
        map<int, set<int>*> freqLookup;
        
    public:
        void insert(int x) {
            int f = freq[x];
            freq[x]++;
            if (f > 0) {
                freqLookup[f]->erase(x);
            }
            if (freqLookup.find(f + 1) == freqLookup.end()) {
                freqLookup[f + 1] = new set<int>();
            }
            freqLookup[f + 1]->insert(x);
        }
        
        void remove(int y) {
            int f = freq[y];
            if (f > 0) {
                freq[y]--;
                freqLookup[f]->erase(y);
                if (f > 1) {
                    freqLookup[f - 1]->insert(y);
                }
            }
        }
        
        bool hasFrequency(int z) {
            bool present = freqLookup.find(z) != freqLookup.end();

            return present && !freqLookup[z]->empty();
        }
};

vector<int> freqQuery(vector<vector<int>> queries) {
    FrequencyTable freqTable;
    vector<int> result;
    for (auto q = queries.begin(); q != queries.end(); q++) {
        int type = (*q)[0];
        int val = (*q)[1];
        if (type == 1) {
            freqTable.insert(val);
        } else if (type == 2) {
            freqTable.remove(val);
        } else {
            result.push_back(freqTable.hasFrequency(val));
        }
    }
    
    return result;
}
```

Python 3:
```python
def freqQuery(queries):
    freq_table = FrequencyTable()
    result = []
    for op, val in queries:
        if op == 1:
            freq_table.insert(val)
        elif op == 2:
            freq_table.delete(val)
        else:
            result.append(int(freq_table.has_frequency(val)))
            
    return result
    
class FrequencyTable:
    def __init__(self):
        self.freq = {}
        self.freq_lookup = {}
        
    def insert(self, x):
        f = self.freq.get(x, 0)
        self.freq[x] = f + 1
        if f > 0:
            self.freq_lookup[f].remove(x)
        if f + 1 not in self.freq_lookup:
            self.freq_lookup[f + 1] = set()
        self.freq_lookup[f + 1].add(x)
        
    def delete(self, y):
        f = self.freq.get(y, 0)
        if f > 0:
            self.freq[y] = f - 1
            self.freq_lookup[f].remove(y)
            if f > 1:
                self.freq_lookup[f - 1].add(y)
                
    def has_frequency(self, z):
        return len(self.freq_lookup.get(z, set())) > 0
```

[Back](../../hackerrank.md)
