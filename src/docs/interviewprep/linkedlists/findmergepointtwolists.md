# Find Merge Point of Two Lists

[Problem](https://www.hackerrank.com/challenges/find-the-merge-point-of-two-joined-linked-lists/problem)

Category: Linked Lists

Difficuly: Easy

---

Given two linked lists that merge, determine which node they merge at.

Input: $h_1$ and $h_2$, the heads of two linked lists that share at least one
node. $h_1 \neq h_2$.

```
class SinglyLinkedListNode {
    int data;
    SinglyLinkedListNode* next;
}
```

Output: the data value of the first node that is contained in both lists.

Note that it is not just guaranteed that the lists have nodes that share the
same value: it is guaranteed that the lists share a node in memory, and
therefore share any nodes that come after it in the lists. Instead of checking
whether nodes have the same data value, you should be checking whether your
references to the nodes are equal.

If you can create a set of references to nodes, a simple way to solve the
problem is to add all of the nodes of $h_1$'s list to a set, and then read
through $h_2$'s list until you find the first node that is present in the set.
It is guaranteed that the first node in $h_2$'s list that is also in $h_1$'s
list is their merge point.

A clever way that doesn't require extra space involves cycling through both
lists at the same time until your references coincide. Let $c_1 \gets h_1$ and
$c_2 \gets h_2$, and continue iterating $c_1 \gets c_1$.next and
$c_2 \gets c_2$.next until $c_1 = c_2$.  When either reference reaches the end
of its list, reset it to the head of its list.

It makes sense that $c_1$ and $c_2$ will be equal eventually if the lists have
the same length, but it is not as obvious that they will eventually be equal if
the lists have different lengths.

Let $n_1$ be the length of $h_1$'s list and $n_2$ be the length of $h_2$'s list.
Let $m_1$ be the position of the merge point in $h_1$'s list and $m_2$ be the
position of the merge point in $h_2$'s list.

\[ 0 \leq m_1 < n_1 \]

\[ 0 \leq m_2 < n_2 \]

After the merge point, the lists are the same, so they both have the same number
of nodes after the merge point:

\[ n_1 - m_1 = n_2 - m_2 \]

Let $a = n_1 - m_1 = n_2 - m_2$.

On the $i^{\text{th}}$ iteration, $c_1$ will be at position $i \mod n_1$, and
$c_2$ will be at position $i \mod n_2$. We are looking for an $i$ for which
$m_1 = i \mod n_1$ and $m_2 = i \mod n_2$.

Take $i = \text{lcm}(n_1, n_2) - a$:

\[
\begin{align*}
i \mod n_1 & = (\text{lcm}(n_1, n_2) - a) \mod n_1 \\
& = (n_1 - a) \mod n_1 \\
& = m_1 \mod n_1 = m_1
\end{align*}
\]

\[
\begin{align*}
i \mod n_2 & = (\text{lcm}(n_1, n_2) - a) \mod n_2 \\
& = (n_2 - a) \mod n_2 \\
& = m_2 \mod n_2 = m_2
\end{align*}
\]

The last thing to check is that $i \geq 0$: this is true because $a \leq n_1$
and $a \leq n_2$, so $a \leq \text{lcm}(n_1, n_2)$.

Therefore, there will be an iteration for which $c_1$ and $c_2$ reference the
same node. The first time this occurs has to be the merge point.

This solution is easier and shorter to implement, and it suffices to solve this
problem.

Java 8:
```java
static int findMergeNode(SinglyLinkedListNode head1, SinglyLinkedListNode head2) {
    SinglyLinkedListNode current1 = head1;
    SinglyLinkedListNode current2 = head2;
    while (current1 != current2) {
        current1 = current1.next != null ? current1.next : head1;
        current2 = current2.next != null ? current2.next : head2;
    }
    
    return current1.data;
}
```

C++:
```cpp
int findMergeNode(SinglyLinkedListNode* head1, SinglyLinkedListNode* head2) {
    set<SinglyLinkedListNode*> references;
    SinglyLinkedListNode* current = head1;
    while (current) {
        references.insert(current);
        current = current->next;
    }
    current = head2;
    while (references.find(current) == references.end()) {
        current = current->next;
    }
    
    return current->data;
}
```

Python 3:
```python
def findMergeNode(head1, head2):
    current1, current2 = head1, head2
    while current1 is not current2:
        current1 = current1.next if current1.next else head1
        current2 = current2.next if current2.next else head2

    return current1.data
```

Alternate Python 3 solution:
```python
def findMergeNode(head1, head2):
    nodes = set()
    current = head1
    while current:
        nodes.add(current)
        current = current.next
    current = head2
    while current not in nodes:
        current = current.next
        
    return current.data
```

[Back](../../hackerrank.md)
