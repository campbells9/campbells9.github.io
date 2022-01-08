# Reverse a Doubly Linked List

[Problem](https://www.hackerrank.com/challenges/reverse-a-doubly-linked-list/problem)

Category: Linked Lists

Difficulty: Easy

---

Reverse the order of a given doubly linked list.

Input: the head of a doubly linked list with $n$ nodes.

$1 \leq n \leq 1000$

```
class DoublyLinkedListNode {
    int data;
    DoublyLinkedListNode* next;
    DoublyLinkedListNode* prev;
}
```

Output: the new head of the linked list where every link has been reversed.
Every node's next pointer points to the node before it in the original list, and
every node's prev pointer points to the node after it in the original list. The
new head will be the last node in the original list.

A simple way to reverse a doubly linked list involves keeping track of three
references: the current node $c$, its previous node $p$, and its next node $m$.
Start with $c$ as the head node and update its links:

$c.\text{prev} \gets m$

$c.\text{next} \gets p$

and then update the references:

$p \gets c$

$c \gets m$

$m \gets m.\text{next}$

Be careful to avoid dereferencing $m$ when it becomes null at the end of the
list.

Note that this algorithm correctly handles the first node of the list, where $p$
is null: it sets $c$.next to null, which is correct because $c$ will become the
last node of the reversed list. It also handles the last node of the list
correctly, where $m$ is null: it sets $c$.prev to null, and $c$ will become the
head of the new list. It even works if the list contains only one node, because
it swaps the two null references $c$.next and $c$.prev.

Java 8:
```java
public static DoublyLinkedListNode reverse(DoublyLinkedListNode llist) {
    DoublyLinkedListNode current = llist;
    DoublyLinkedListNode prev = current.prev;
    DoublyLinkedListNode next = current.next;
    while (next != null) {
        current.next = prev;
        current.prev = next;
        prev = current;
        current = next;
        next = current.next;
    }
    current.next = prev;
    current.prev = next;
    
    return current;
}
```

C++:
```cpp
DoublyLinkedListNode* reverse(DoublyLinkedListNode* llist) {
    DoublyLinkedListNode* current = llist;
    DoublyLinkedListNode* prev = current->prev;
    DoublyLinkedListNode* next = current->next;
    while (next) {
        current->next = prev;
        current->prev = next;
        prev = current;
        current = next;
        next = current->next;
    }
    current->next = prev;
    current->prev = next;
    
    return current;
}
```

Python 3:
```python
def reverse(llist):
    current = llist
    prev = current.prev
    next_node = current.next
    while next_node:
        current.next = prev
        current.prev = next_node
        prev = current
        current = next_node
        next_node = current.next
    current.next = prev
    current.prev = next_node
    
    return current
```

[Back](../../hackerrank.md)
