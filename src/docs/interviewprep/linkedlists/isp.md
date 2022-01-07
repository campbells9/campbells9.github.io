# Insert a Node at a Specific Position in a Linked List

[Problem](https://www.hackerrank.com/challenges/insert-a-node-at-a-specific-position-in-a-linked-list/problem)

Category: Linked Lists

Difficulty: Easy

---

Insert a new node with the given data at the given position in a linked list.

Input: the head of a linked list with $n$ nodes, a data value $d$, and a
position $p$.

$1 \leq n \leq 1000$

$0 \leq p \leq n$

```
class SinglyLinkedListNode {
    int data;
    SinglyLinkedListNode* next;

    SinglyLinkedListNode(int data) : data(data) {}
}
```

Output: The head of the updated linked list, where a new node with data $d$ has
been inserted at index $p$.

There are two cases to consider. If $p = 0$, then the new node should be
inserted at the front of the list, and it should become the new head, with its
next pointer pointing to the old head.

If $p > 0$, let $c$ be the node at position $p - 1$. $c$.next should point to
the new node, and the new node should point to the old value of $c$.next, the
node which was originally at position $p$ (and will now be at position $p + 1$).
Make sure you link your new node to $c$.next before linking $c$ to your new
node so you don't lose a pointer to the rest of the list.

Java 8:
```java
public static SinglyLinkedListNode insertNodeAtPosition(
        SinglyLinkedListNode llist, int data, int position) {
    SinglyLinkedListNode newNode = new SinglyLinkedListNode(data);
    if (position == 0) {
        newNode.next = llist;
        
        return newNode;
    }
    
    SinglyLinkedListNode current = llist;
    int i = 1;
    while (i < position) {
        current = current.next;
        i++;
    }
    newNode.next = current.next;
    current.next = newNode;
    
    return llist;
}
```

C++:
```cpp
SinglyLinkedListNode* insertNodeAtPosition(SinglyLinkedListNode* llist,
                                           int data, int position) {
    SinglyLinkedListNode* newNode = new SinglyLinkedListNode(data);
    if (!position) {
        newNode->next = llist;
        
        return newNode;
    }
    
    SinglyLinkedListNode* current = llist;
    int i = 1;
    while(i < position) {
        current = current->next;
        i++;
    }
    newNode->next = current->next;
    current->next = newNode;
    
    return llist;
}
```

Python 3:
```python
def insertNodeAtPosition(llist, data, position):
    node = SinglyLinkedListNode(data)
    if not position:
        node.next = llist
        
        return node
    
    current = llist
    i = 1
    while i < position:
        current = current.next
        i += 1
    node.next = current.next
    current.next = node
    
    return llist
```

[Back](../../hackerrank.md)
