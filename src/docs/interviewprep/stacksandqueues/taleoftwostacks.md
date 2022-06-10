# Queues: A Tale of Two Stacks

[Problem](https://www.hackerrank.com/challenges/ctci-queue-using-two-stacks/problem)

Category: Stacks and Queues

Difficulty: Medium

---

Implement a queue with two stacks.

The elements of the queue are integers, and the queue has three operations:
```enqueue```, ```dequeue```, and ```peek```. ```enqueue(x)``` adds an element
```x``` to the back of the queue. ```dequeue``` returns and removes the element
at the front of the queue, and ```peek``` just returns it without removing it.
The queue is a FIFO data structure, so the elements should be popped in the same
order they were pushed in.

The problem challenges you to implement a queue using two stacks, which are LIFO
data structures. Popping from a stack gives the most recently pushed element,
not the element that was pushed the earliest.

It's important to observe that you can flip a stack, or change it so the bottom
elements are now on top and vice versa, by emptying it into another stack
(popping each element from one stack and pushing it onto the new one in order).
This is useful because, for our queue, we might enqueue some elements and push
them onto a stack, but then if we want to dequeue some elements, those will be
on the bottom. We can reverse the stack by flipping it into a second stack, and
now the *oldest* elements will be on top instead of the newest, and we can
implement dequeue by popping from this stack. Then, if we wanted to enqueue more
elements, we could flip the stack rightside-up again and push them on top of the
newest elements.

There's a key improvement we can make to this strategy, though. Think of the
rightside-up stack as the enqueue stack and the upside-down stack as the dequeue
stack. If we enqueue five elements (call them 1, 2, 3, 4, and 5), then we know
that the next five calls to dequeue should remove 1, 2, 3, 4, and 5 in that
order. Suppose we have our enqueue stack ```[1, 2, 3, 4, 5]``` with the
rightmost element on top, and we receive a dequeue call. We fill the dequeue
stack, ```[5, 4, 3, 2, 1]```, and pop the 1 because it is the oldest element.
Now, suppose we want to enqueue more elements. We don't need to move everything
back into the enqueue stack to put the new elements on top of 5. We don't need
to change anything about the dequeue stack because it is already in the state
```[5, 4, 3, 2]```, and we know that no matter what, 2, 3, 4, and 5 are the next
four elements to be dequeued. We can continue filling the enqueue stack and
removing from the dequeue stack, until the dequeue stack eventually becomes
empty and a dequeue is performed. Then, we can flip the enqueue stack into the
dequeue stack and continue dequeueing. In all, every element starts in the
enqueue stack, then moves to the dequeue stack at some point, and then finally
gets dequeued and exits the data structure.

Java 8:
```java
static class MyQueue<T> {
    private Stack<T> enqStack;
    private Stack<T> deqStack;
    
    public MyQueue() {
        enqStack = new Stack<>();
        deqStack = new Stack<>();
    }
    
    public void enqueue(T item) {
        enqStack.push(item);
    }
    
    public T dequeue() {
        peek();
        
        return deqStack.pop();
    }
    
    public T peek() {
        if (deqStack.isEmpty()) {
            while (!enqStack.isEmpty()) {
                deqStack.push(enqStack.pop());
            }
        }
        
        return deqStack.peek();
    }
}
```

C++:
```cpp
class MyQueue {
    public:
        stack<int> stack_newest_on_top, stack_oldest_on_top;
          
        void push(int x) {
            stack_newest_on_top.push(x);
        }

        void pop() {
            front();
            stack_oldest_on_top.pop();
        }

        int front() {
            if (stack_oldest_on_top.empty()) {
                while (!stack_newest_on_top.empty()) {
                    stack_oldest_on_top.push(stack_newest_on_top.top());
                    stack_newest_on_top.pop();
                }
            }
            
            return stack_oldest_on_top.top();
        }
};
```

Python 3:
```python
class MyQueue(object):
    def __init__(self):
        self.enq, self.deq = [], []
    
    def peek(self):
        if not self.deq:
            while self.enq:
                self.deq.append(self.enq.pop())
                
        return self.deq[-1]
        
    def pop(self):
        self.peek()
        self.deq.pop()
        
    def put(self, value):
        self.enq.append(value)
```

[Back](../../hackerrank.md)
