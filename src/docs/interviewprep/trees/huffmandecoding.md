# Tree: Huffman Decoding

[Problem](https://www.hackerrank.com/challenges/tree-huffman-decoding/problem)

Category: Trees

Difficulty: Medium

---

Use a given [Huffman tree](https://en.wikipedia.org/wiki/Huffman_coding) to
decode an encoded string.

Input: the root of a Huffman tree and an encoded string $s$.

\[ 1 \leq |s| \leq 25 \]

```
class Node {
    int freq;
    char data;
    Node* left;
    Node* right;
}
```

Output: the decoded string $s$. It is guaranteed that $s$ can be decoded with
the given tree.

To understand the principle behind Huffman coding, consider ASCII representation
for text. We use 1 byte to represent each character; for example, the character
`e` is encoded with the byte `0x65` or `01100101`, and the character `z` is
encoded with the byte `0x7A` or `01111010`. This is a very simple and useful
representation for text, but consider storing the text of an entire
English-language book. Each `e` and `z` will take up the same amount of space,
but there will almost certainly be many more `e`'s than `z`'s. Imagine if we
changed our representation to use fewer than 8 bits for `e`. As a tradeoff, we
would have to use more than 8 bits to represent some other letters (suppose we
represented `e` with 5 bits, `01100`, then we wouldn't be able to use 8-bit
patterns that start with `01100` to represent other letters). But if those
letters were relatively rare, like `z` and `q`, it would be worth it and we
would be able to represent the same text in less space!

The idea is that we analyze the frequencies of characters in the text we want to
compress (or use an existing
[frequency analysis](https://en.wikipedia.org/wiki/Frequency_analysis)) and then
construct a Huffman tree that describes which bit patterns should correspond to
each character (giving the shortest patterns to the most common characters).
Now, we can use the tree to get an encoded version of the text which takes up
less space than the original. If we give the encoded text to someone else, along
with our Huffman tree, they can use the tree to decode each character and
recover the text. That is what this problem asks us to do.

Each character has a bit sequence that represents it, and it also has a leaf
node in the Huffman tree. The bit sequence corresponds to the path from the root
to the character's leaf node, where `0` means we follow the edge to the left
subtree and `1` means we follow the edge to the right subtree. Start with the
first bit in the string and follow the path from the root until you reach a leaf
node. Then, append that node's character to your result, go back to the root,
and continue reading bits from the string. The last bit should lead you to the
node with the last character of the result.

Java 8:
```java
void decode(String s, Node root) {
    StringBuilder result = new StringBuilder();
    Node current = root;
    for (int i = 0; i < s.length(); i++) {
        current = s.charAt(i) == '0' ? current.left : current.right;
        if (current.left == null && current.right == null) {
            result.append(current.data);
            current = root;
        }
    }
    System.out.println(result.toString());
}
```

C++:
```cpp
void decode_huff(node * root, string s) {
    string result;
    node* current = root;
    for (auto ch = s.begin(); ch != s.end(); ch++) {
        current = *ch == '0' ? current->left : current->right;
        if (!(current->left || current->right)) {
            result.push_back(current->data);
            current = root;
        }
    }
    cout << result << endl;
}
```

Python 3:
```python
def decodeHuff(root, s):
    result = ""
    current = root
    for ch in s:
        current = current.left if ch == "0" else current.right
        if not (current.left or current.right):
            result += current.data
            current = root
            
    print(result)
```

[Back](../../hackerrank.md)
