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

<!-- DIAGRAM_BLOCK -->

## Implementation Approaches

### 1. Memoization (Top-Down)

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_memo(n):
    if n <= 2:
        return 1
    return fibonacci_memo(n - 1) + fibonacci_memo(n - 2)

# Time: O(n), Space: O(n) for cache + O(n) for recursion stack
```

```java
import java.util.HashMap;
import java.util.Map;

public class DynamicProgramming {
    private static Map<Integer, Integer> memo = new HashMap<>();
    
    public static int fibonacciMemo(int n) {
        if (n <= 2) return 1;
        if (memo.containsKey(n)) return memo.get(n);
        
        int result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
        memo.put(n, result);
        return result;
    }
    
    // Time: O(n), Space: O(n) for cache + O(n) for recursion stack
}
```

```cpp
#include <iostream>
#include <vector>
#include <map>
using namespace std;

map<int, int> memo;

int fibonacciMemo(int n) {
    if (n <= 2) return 1;
    if (memo.find(n) != memo.end()) return memo[n];
    
    memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
    return memo[n];
}

// Time: O(n), Space: O(n) for cache + O(n) for recursion stack
```

```c
#include <stdio.h>
#include <stdlib.h>

int* memo;

int fibonacciMemo(int n) {
    if (n <= 2) return 1;
    if (memo[n] != -1) return memo[n];
    
    memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
    return memo[n];
}

// Time: O(n), Space: O(n) for cache + O(n) for recursion stack
```

```javascript
const memo = new Map();

function fibonacciMemo(n) {
    if (n <= 2) return 1;
    if (memo.has(n)) return memo.get(n);
    
    const result = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
    memo.set(n, result);
    return result;
}

// Time: O(n), Space: O(n) for cache + O(n) for recursion stack
```

### 2. Tabulation (Bottom-Up)

The tabulation approach builds the solution iteratively from the bottom up, avoiding recursion overhead and potential stack overflow issues.

**Key Differences:**
- **Memoization**: Recursive + cache (top-down)
- **Tabulation**: Iterative + table (bottom-up)
- Both achieve O(n) time complexity for Fibonacci

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

```java
public static int fibonacciOptimized(int n) {
    if (n <= 2) return 1;
    
    int prev2 = 1, prev1 = 1;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)
```

```cpp
int fibonacciOptimized(int n) {
    if (n <= 2) return 1;
    
    int prev2 = 1, prev1 = 1;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)
```

```c
int fibonacciOptimized(int n) {
    if (n <= 2) return 1;
    
    int prev2 = 1, prev1 = 1;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)
```

```javascript
function fibonacciOptimized(n) {
    if (n <= 2) return 1;
    
    let prev2 = 1, prev1 = 1;
    
    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

// Time: O(n), Space: O(1)
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

```java
public static int knapsack01(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[n + 1][capacity + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w],  // Skip item
                    dp[i-1][w-weights[i-1]] + values[i-1]  // Take item
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
```

```cpp
int knapsack01(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = max(
                    dp[i-1][w],  // Skip item
                    dp[i-1][w-weights[i-1]] + values[i-1]  // Take item
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
```

```c
int knapsack01(int* weights, int* values, int n, int capacity) {
    int dp[n + 1][capacity + 1];
    
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i-1] <= w) {
                dp[i][w] = max(
                    dp[i-1][w],  // Skip item
                    dp[i-1][w-weights[i-1]] + values[i-1]  // Take item
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
```

```javascript
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w],  // Skip item
                    dp[i-1][w-weights[i-1]] + values[i-1]  // Take item
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    
    return dp[n][capacity];
}
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

```java
public static int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
```

```cpp
int lcs(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
```

```c
int lcs(char* s1, char* s2) {
    int m = strlen(s1), n = strlen(s2);
    int dp[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = dp[i-1][j] > dp[i][j-1] ? dp[i-1][j] : dp[i][j-1];
            }
        }
    }
    
    return dp[m][n];
}
```

```javascript
function lcs(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[m][n];
}
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

```java
public static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            if (dp[i - coin] != Integer.MAX_VALUE) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
}
```

```cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            if (dp[i - coin] != INT_MAX) {
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

```c
int coinChange(int* coins, int coinsSize, int amount) {
    int dp[amount + 1];
    for (int i = 0; i <= amount; i++) {
        dp[i] = INT_MAX;
    }
    dp[0] = 0;
    
    for (int i = 0; i < coinsSize; i++) {
        int coin = coins[i];
        for (int j = coin; j <= amount; j++) {
            if (dp[j - coin] != INT_MAX) {
                dp[j] = dp[j] < dp[j - coin] + 1 ? dp[j] : dp[j - coin] + 1;
            }
        }
    }
    
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

```javascript
function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            if (dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}
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
