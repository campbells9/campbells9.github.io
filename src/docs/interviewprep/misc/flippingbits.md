# Flipping Bits

[Problem](https://www.hackerrank.com/challenges/flipping-bits/problem)

Category: Miscellaneous

Difficulty: Easy

---

Flip all of the bits of a 32-bit unsigned integer.

Input: an unsigned integer $n$.

$0 \leq n < 2^{32}$

Output: the unsigned integer result of flipping all 32 bits of $n$.

To flip the bits of any bitstring, XOR it with a bitstring of all ones:

\[ 0 \oplus 1 = 1, \; 1 \oplus 1 = 0 \]

\[ b \oplus 1 = \lnot b \; \text{for} \; b \in \{0, 1\} \]

Another equivalent formula is to subtract $n$ from the bitstring of all ones.

Note that the input and output for this problem are actually 64-bit signed
integers, even though $n$ is small enough to fit in a 32-bit unsigned integer.
This is why simply negating $n$ does not give the desired answer. We only want
to flip $n$'s lower 32 bits, so you should XOR $n$ with a long integer that
has 32 zeroes followed by 32 ones. You may have to be careful with your
language's implicit casting: for example, ```0xFFFFFFFF``` might be interpreted
as the integer ```-1```, which could be cast as a long ```-1``` with 64 ones.
Calculating $2^{32} - 1$ and subtracting $n$ may be a less tricky way to achieve
the same result.

Java 8:
```java
public static long flippingBits(long n) {
    return n ^ 0xFFFFFFFFL;
}
```

C++:
```cpp
long flippingBits(long n) {
    return n ^ 0xFFFFFFFF;
}
```

Python 3:
```python
def flippingBits(n):
    return n ^ 0xFFFFFFFF
```

Alternate Python 3 Solution:
```python
def flippingBits(n):
    return 2 ** 32 - 1 - n
```

[Back](../../hackerrank.md)
