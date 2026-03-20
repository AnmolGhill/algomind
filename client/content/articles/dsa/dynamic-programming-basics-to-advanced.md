---
title: "Dynamic Programming: From Basics to Advanced"
description: "Master dynamic programming with step-by-step approach, common patterns, and practice problems."
category: "dsa"
difficulty: "Medium"
readTime: "15 min"
date: "2024-03-20"
tags: ["algorithms", "dynamic-programming", "optimization", "dsa", "intermediate"]
---

# Dynamic Programming: From Basics to Advanced

Dynamic Programming (DP) is a powerful algorithmic technique that solves complex problems by breaking them down into simpler overlapping subproblems.

## What is Dynamic Programming?

DP is an optimization technique that:
1. Breaks down complex problems into simpler subproblems
2. Stores results of subproblems to avoid redundant calculations
3. Builds up the solution to the original problem

## Core Principles

### 1. Optimal Substructure
The optimal solution to the problem can be constructed from optimal solutions to its subproblems.

### 2. Overlapping Subproblems
The same subproblems are solved multiple times in the recursive approach.

## DP Problem-Solving Framework

```
┌─────────────────────────────────────┐
│         1. Identify the Problem      │
│    Does it have optimal substructure │
│    and overlapping subproblems?     │
└─────────────────┬───────────────────┘
                  │ Yes
                  ▼
┌─────────────────────────────────────┐
│         2. Define the State          │
│   What information do we need to     │
│   represent each subproblem?        │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│      3. Formulate Recurrence         │
│   Express solution in terms of      │
│   smaller subproblems               │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│    4. Choose Implementation          │
│   Memoization (Top-Down) or         │
│   Tabulation (Bottom-Up)            │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│       5. Implement & Optimize       │
│   Write code and optimize for       │
│   time/space complexity             │
└─────────────────────────────────────┘
```

## Implementation Approaches

### 1. Memoization (Top-Down)
```python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return 1
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Time: O(n), Space: O(n)
```

### 2. Tabulation (Bottom-Up)
```python
def fibonacci_tab(n):
    if n <= 2:
        return 1
    
    dp = [0] * (n + 1)
    dp[1] = dp[2] = 1
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Time: O(n), Space: O(n)
```

### 3. Space Optimization
```python
def fibonacci_optimized(n):
    if n <= 2:
        return 1
    
    prev2, prev1 = 1, 1
    
    for _ in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return current

# Time: O(n), Space: O(1)
```

## Common DP Patterns

### 1. 0/1 Knapsack Problem
**Problem**: Given weights and values of items, maximize total value without exceeding capacity.

```python
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],  # Skip item
                    dp[i-1][w-weights[i-1]] + values[i-1]  # Take item
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]
```

### 2. Longest Common Subsequence (LCS)
**Problem**: Find longest sequence common to two strings.

```python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
```

### 3. Coin Change Problem
**Problem**: Find minimum number of coins to make up a given amount.

```python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

## State Definition Examples

### 1. Grid Problems
- **State**: `dp[i][j]` = maximum/minimum value to reach cell (i,j)
- **Transition**: `dp[i][j] = max(dp[i-1][j], dp[i][j-1]) + grid[i][j]`

### 2. Subsequence Problems
- **State**: `dp[i]` = length of LIS ending at index i
- **Transition**: `dp[i] = max(dp[j] + 1)` for all `j < i` and `arr[j] < arr[i]`

### 3. Partition Problems
- **State**: `dp[i][j]` = can we partition first i elements to sum j
- **Transition**: `dp[i][j] = dp[i-1][j] or dp[i-1][j-arr[i-1]]`

## Optimization Techniques

### 1. Space Optimization
- Use rolling arrays instead of full DP table
- Keep only previous states when possible

### 2. State Compression
- Use bitmask to represent subsets
- Reduce multidimensional DP to 1D or 2D

### 3. Mathematical Insights
- Find patterns or formulas to avoid DP entirely
- Use prefix sums or other preprocessing

## Practice Problems by Difficulty

### Easy
1. **Climbing Stairs**: Count ways to reach nth stair
2. **Fibonacci Number**: nth Fibonacci number
3. **Maximum Subarray**: Find contiguous subarray with max sum

### Medium
1. **Coin Change**: Minimum coins for given amount
2. **Longest Increasing Subsequence**: Length of LIS
3. **0/1 Knapsack**: Maximize value with weight constraint

### Hard
1. **Edit Distance**: Minimum operations to convert string A to B
2. **Trapping Rain Water**: Amount of water that can be trapped
3. **Regular Expression Matching**: Pattern matching with '.' and '*'

## Common Mistakes to Avoid

1. **Incorrect State Definition**
   - Make sure state captures all necessary information
   - Avoid missing edge cases

2. **Wrong Transition Logic**
   - Double-check recurrence relations
   - Consider all possible previous states

3. **Initialization Errors**
   - Set correct base cases
   - Handle boundary conditions properly

4. **Memory Issues**
   - Optimize space when possible
   - Be aware of memory limits for large inputs

## Real-World Applications

- **Resource Allocation**: Optimize resource distribution
- **Path Planning**: Find optimal routes in navigation
- **Bioinformatics**: DNA sequence alignment
- **Finance**: Portfolio optimization
- **Gaming**: AI decision-making algorithms

## Summary

Dynamic Programming is a powerful technique that transforms exponential problems into polynomial ones. Master these steps:

1. **Identify** if DP applies (optimal substructure + overlapping subproblems)
2. **Define** clear state representation
3. **Formulate** correct recurrence relation
4. **Choose** appropriate implementation approach
5. **Optimize** for time and space constraints

**Remember**: Practice is key to recognizing DP patterns and formulating solutions quickly!
