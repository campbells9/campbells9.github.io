# Linked Lists: Detect a Cycle

[Problem](https://www.hackerrank.com/challenges/ctci-linked-list-cycle/problem)

Category: Linked Lists

Difficulty: Easy

---

Determine whether a given linked list has a cycle.

Input: the head of a linked list with $n$ nodes.

$0 \leq n \leq 100$

```
struct Node {
    int data;
    struct Node* next;
}
```

Output: ```true``` if the list has a cycle and ```false``` if it terminates.

One way to detect a cycle in the linked list is to iterate over the list and use
a set to mark each node as visited. If you reach a node that has already been
added to the set, there is a cycle. The list terminates if and only if there is
no cycle.

Another way to detect a cycle comes from [Floyd's Tortoise and Hare](https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_tortoise_and_hare): use two pointers to read through the
list, where one pointer iterates sequentially ($c \gets c$.next) and the other
iterates over every other node ($c \gets c$.next.next). If you ever see the end
of the list with the faster pointer, there is no cycle. If there is a cycle,
then eventually, both pointers will point to the same node.

If you think about lists with different lengths and different cycle lengths, it
may not be obvious that this is always true. Assume that the list of $n$ nodes
has $m$ nodes at the beginning, followed by a cycle of $\ell$ nodes
($n = m + \ell$). Let $c_i$ be the node at index $i$ in the list. Once the nodes
enter the cycle ($i \geq m$), it becomes true that $c_i = c_{i + k\ell}$ for all
$k \geq 0$. If you can write $i = k\ell$ for some $k$ that makes $i \geq m$,
then you can say that $c_i = c_{i + k\ell} = c_{2i}$. On the $i^{\text{th}}$
iteration, the slow pointer will point to $c_i$ and the fast pointer will point
to $c_{2i}$. Eventually, you will reach an $i = k\ell \geq m$ for some $k$, and
$c_i$ and $c_{2i}$ will be the same node.

Many other approaches are viable to solve this problem. Notice that the list has
at most 100 nodes. If you iterate over 100 nodes in the list and still haven't
found the end, there must have been a cycle.

Java 7:
```java
boolean hasCycle(Node head) {
    Set<Node> nodes = new HashSet<>();
    Node current = head;
    while (current != null) {
        if (nodes.contains(current)) {
            return true;
        }
        
        nodes.add(current);
        current = current.next;
    }
    
    return false;
}
```

C++:
```cpp
bool has_cycle(Node* head) {
    if (!head) {
        return false;
    }
    
    Node* current = head;
    Node* next = current->next;
    while (current != next) {
        if (!next || !next->next) {
            return false;
        }
        
        current = current->next;
        next = next->next->next;
    }
    
    return true;
}
```

Python 3:
```python
def has_cycle(head):
    nodes = set()
    current = head
    while current:
        if current in nodes:
            return True
        
        nodes.add(current)
        current = current.next
        
    return False
```

Alternate Python 3 Solution:
```python
def has_cycle(head):
    MAX_NODES = 100
    node_count = 0
    current = head
    while current and node_count <= MAX_NODES:
        node_count += 1
        current = current.next
        
    return node_count > MAX_NODES
```

[Back](../../hackerrank.md)
