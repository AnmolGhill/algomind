---
title: "Binary Search: Complete Guide"
description: "Master binary search algorithm with implementation, complexity analysis, and practical examples."
category: "dsa"
difficulty: "Easy"
readTime: "8 min"
date: "2024-03-20"
tags: ["algorithms", "searching", "dsa", "beginner"]
---

# Binary Search: Complete Guide

Binary search is a fundamental algorithm that efficiently finds an item in a sorted array by repeatedly dividing the search interval in half.

## How It Works

Binary search follows these steps:
1. Compare the target value to the middle element of the array
2. If they are not equal, eliminate the half in which the target cannot lie
3. Continue searching the remaining half until the value is found or the interval is empty

## Algorithm Visualization

```
[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
 ^                    ^
Start              End (target = 13)

Middle = (0 + 9) / 2 = 4 → arr[4] = 9
9 < 13, so search right half: [11, 13, 15, 17, 19]

New Middle = (5 + 9) / 2 = 7 → arr[7] = 15
15 > 13, so search left half: [11, 13]

New Middle = (5 + 6) / 2 = 5 → arr[5] = 11
11 < 13, so search right half: [13]

Found! arr[6] = 13
```

## Implementation

### Recursive Approach
```python
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

### Iterative Approach
```python
def binary_search_iterative(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

## Time and Space Complexity

| Aspect | Complexity |
|--------|------------|
| Time (Best) | O(1) |
| Time (Average) | O(log n) |
| Time (Worst) | O(log n) |
| Space (Recursive) | O(log n) |
| Space (Iterative) | O(1) |

## When to Use Binary Search

✅ **Use when:**
- Array is sorted
- Need fast search operations
- Random access is available (arrays, not linked lists)

❌ **Don't use when:**
- Array is unsorted (sort first: O(n log n))
- Frequent insertions/deletions (consider balanced trees)
- Data structure doesn't support random access

## Common Variations

### 1. Finding First Occurrence
```python
def find_first_occurrence(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### 2. Finding Last Occurrence
```python
def find_last_occurrence(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### 3. Binary Search on Answer Range
Sometimes we don't search in an array, but in a range of possible answers:

```python
def find_minimal_max_divisor(arr, threshold):
    # Find smallest divisor such that sum(ceil(arr[i]/divisor)) <= threshold
    
    left, right = 1, max(arr)
    result = right
    
    while left <= right:
        mid = (left + right) // 2
        
        if sum((x + mid - 1) // mid for x in arr) <= threshold:
            result = mid
            right = mid - 1
        else:
            left = mid + 1
    
    return result
```

## Practice Problems

1. **Basic**: Find an element in a sorted array
2. **Medium**: Find first and last position of element
3. **Hard**: Search in a rotated sorted array
4. **Advanced**: Find minimum in a rotated sorted array

## Common Mistakes

1. **Integer Overflow**: `mid = (left + right) // 2` can overflow in some languages
   - Fix: `mid = left + (right - left) // 2`

2. **Infinite Loop**: Not updating `left` and `right` correctly
   - Always ensure the search space shrinks

3. **Off-by-One Errors**: Incorrect boundary conditions
   - Test with arrays of size 0, 1, and 2

## Real-World Applications

- **Database Indexing**: B-trees use binary search principles
- **Git Bisect**: Find the commit that introduced a bug
- **Dictionary Lookup**: Find words in a sorted dictionary
- **Game Development**: Collision detection in sorted spatial data

## Summary

Binary search is a powerful algorithm that reduces search time from linear to logarithmic complexity. Master its variations and edge cases to solve a wide range of problems efficiently.

**Key Takeaways:**
- Always work on sorted data
- Choose recursive vs iterative based on stack constraints
- Handle edge cases (empty array, single element)
- Consider variations for specific requirements
