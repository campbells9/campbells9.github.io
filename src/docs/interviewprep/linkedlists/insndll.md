# Inserting a Node into a Sorted Doubly Linked List

[Problem](https://www.hackerrank.com/challenges/insert-a-node-into-a-sorted-doubly-linked-list/problem)

Category: Linked Lists

Difficulty: Easy

---

Insert a new node into the correct position in a sorted doubly linked list.

Input: the head of a doubly linked list with $n$ nodes sorted by data values,
and the data value $d$ of a new node to be inserted.

```
class DoublyLinkedListNode {
    int data;
    DoublyLinkedListNode* next;
    DoublyLinkedListNode* prev;

    DoublyLinkedListNode(int data) : data(data) {}
}
```

Output: the head of the updated linked list, where a node with data $d$ has been
inserted and the list is still sorted.

We need to iterate through the linked list until we find the position where the
new node should be inserted. A special case is when $d$ is less than the head's
data value: this means that the new node should become the new head of the list.
The old head's prev pointer should point to the new node.

Otherwise, we need to search the list for the insertion position. Because this
is a doubly linked list, we will need to update the nodes immediately before and
after the new node in the list. We want to find a node $c$ such that $c$ comes
before the new node ($c$.data $\leq d$), but $c$.next comes after the new node
($c$.next.data $> d$). The new node's prev and next pointers should point to $c$
and $c$.next, respectively. $c$'s next pointer and $c$.next's prev pointer
should each point to the new node.

Note that if $d$ is greater than every value in the list, then the new node
should go at the end. $c$ will be the last node, and $c$.next will not exist. In
this case, the new node's next pointer should be null.

Java 8:
```java
public static DoublyLinkedListNode sortedInsert(DoublyLinkedListNode llist,
                                                int data) {
    DoublyLinkedListNode newNode = new DoublyLinkedListNode(data);
    if (data < llist.data) {
        newNode.next = llist;
        llist.prev = newNode;
        
        return newNode;
    }
    
    DoublyLinkedListNode current = llist;
    while (current.next != null && current.next.data <= data) {
        current = current.next;
    }
    newNode.next = current.next;
    newNode.prev = current;
    current.next = newNode;
    if (newNode.next != null) {
        newNode.next.prev = newNode;
    }
    
    return llist;
}
```

C++:
```cpp
DoublyLinkedListNode* sortedInsert(DoublyLinkedListNode* llist, int data) {
    DoublyLinkedListNode* newNode = new DoublyLinkedListNode(data);
    if (data < llist->data) {
        newNode->next = llist;
        llist->prev = newNode;
        
        return newNode;
    }
    
    DoublyLinkedListNode* current = llist;
    while (current->next && current->next->data <= data) {
        current = current->next;
    }
    newNode->next = current->next;
    newNode->prev = current;
    current->next = newNode;
    if (newNode->next) {
        newNode->next->prev = newNode;
    }
    
    return llist;
}
```

Python 3:
```python
def sortedInsert(llist, data):
    node = DoublyLinkedListNode(data)
    if data < llist.data:
        node.next = llist
        llist.prev = node
        
        return node
    
    current = llist
    while current.next and current.next.data <= data:
        current = current.next
    node.next = current.next
    node.prev = current
    current.next = node
    if node.next:
        node.next.prev = node
        
    return llist
```

[Back](../../hackerrank.md)
