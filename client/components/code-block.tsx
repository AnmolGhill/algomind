'use client'

import { useState } from 'react'

interface CodeBlockProps {
  codes: {
    [key: string]: string
  }
  defaultLanguage?: string
}

const languages = [
  { name: 'C++', key: 'cpp' },
  { name: 'C', key: 'c' },
  { name: 'Java', key: 'java' },
  { name: 'Python', key: 'python' },
  { name: 'JavaScript', key: 'javascript' }
]

export function GFGCodeBlock({ codes, defaultLanguage = 'cpp' }: CodeBlockProps) {
  const [activeLanguage, setActiveLanguage] = useState(defaultLanguage)

  const getSyntaxHighlightedCode = (code: string, language: string) => {
    const lines = code.split('\n')
    return lines.map((line, index) => {
      const tokens = []
      let currentIndex = 0
      
      if (language === 'cpp' || language === 'c') {
        // Handle comments first
        const commentMatch = line.match(/(\/\/.*)$/)
        if (commentMatch) {
          const commentIndex = line.indexOf('//')
          if (commentIndex > 0) {
            tokens.push(...highlightKeywords(line.substring(0, commentIndex), 'cpp'))
            tokens.push({ type: 'comment', text: commentMatch[1] })
          } else {
            tokens.push({ type: 'comment', text: commentMatch[1] })
          }
        } else {
          tokens.push(...highlightKeywords(line, 'cpp'))
        }
      } else if (language === 'java') {
        const commentMatch = line.match(/(\/\/.*)$/)
        if (commentMatch) {
          const commentIndex = line.indexOf('//')
          if (commentIndex > 0) {
            tokens.push(...highlightKeywords(line.substring(0, commentIndex), 'java'))
            tokens.push({ type: 'comment', text: commentMatch[1] })
          } else {
            tokens.push({ type: 'comment', text: commentMatch[1] })
          }
        } else {
          tokens.push(...highlightKeywords(line, 'java'))
        }
      } else if (language === 'python') {
        const commentMatch = line.match(/(#.*)$/)
        if (commentMatch) {
          const commentIndex = line.indexOf('#')
          if (commentIndex > 0) {
            tokens.push(...highlightKeywords(line.substring(0, commentIndex), 'python'))
            tokens.push({ type: 'comment', text: commentMatch[1] })
          } else {
            tokens.push({ type: 'comment', text: commentMatch[1] })
          }
        } else {
          tokens.push(...highlightKeywords(line, 'python'))
        }
      } else if (language === 'javascript') {
        const commentMatch = line.match(/(\/\/.*)$/)
        if (commentMatch) {
          const commentIndex = line.indexOf('//')
          if (commentIndex > 0) {
            tokens.push(...highlightKeywords(line.substring(0, commentIndex), 'javascript'))
            tokens.push({ type: 'comment', text: commentMatch[1] })
          } else {
            tokens.push({ type: 'comment', text: commentMatch[1] })
          }
        } else {
          tokens.push(...highlightKeywords(line, 'javascript'))
        }
      }

      return (
        <div key={index} className="flex min-h-[1.5em]">
          <span className="text-gray-500 mr-4 select-none" style={{ minWidth: '2em' }}>
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <div className="flex-1">
            {tokens.map((token, tokenIndex) => {
              if (token.type === 'keyword') {
                return <span key={tokenIndex} className="text-red-600">{token.text}</span>
              } else if (token.type === 'function') {
                return <span key={tokenIndex} className="text-purple-600">{token.text}</span>
              } else if (token.type === 'string') {
                return <span key={tokenIndex} className="text-green-600">{token.text}</span>
              } else if (token.type === 'number') {
                return <span key={tokenIndex} className="text-blue-600">{token.text}</span>
              } else if (token.type === 'operator') {
                return <span key={tokenIndex} className="text-orange-600">{token.text}</span>
              } else if (token.type === 'comment') {
                return <span key={tokenIndex} className="text-gray-500">{token.text}</span>
              } else {
                return <span key={tokenIndex}>{token.text}</span>
              }
            })}
          </div>
        </div>
      )
    })
  }

  const highlightKeywords = (text: string, language: string) => {
    const tokens = []
    
    const patterns: Record<string, {
      keywords: RegExp
      functions: RegExp
      strings: RegExp
      numbers: RegExp
      operators?: RegExp
    }> = {
      cpp: {
        keywords: /\b(#include|using|namespace|int|float|double|char|bool|void|return|if|else|for|while|do|switch|case|break|continue|class|struct|public|private|protected|const|static|new|delete|this|nullptr|true|false)\b/g,
        functions: /\b(std|cout|cin|vector|string|sort|begin|end|size|push_back|pop_back|find|length|max|min|abs|INT_MAX|INT_MIN)\b/g,
        strings: /(".*?"|'.*?')/g,
        numbers: /\b\d+\b/g,
        operators: /(?:!=|==|<=|>=|\+\+|--|&&|\|\||[+\-*/%=<>!&|^])/g
      },
      java: {
        keywords: /\b(public|private|protected|static|final|class|interface|extends|implements|import|package|int|String|void|return|if|else|for|while|do|switch|case|break|continue|new|this|super)\b/g,
        functions: /\b(System|out|println|print|ArrayList|HashMap|String|Integer|Double|Integer\.MAX_VALUE|Math)\b/g,
        strings: /(".*?"|'.*?')/g,
        numbers: /\b\d+\b/g,
        operators: /(?:!=|==|<=|>=|\+\+|--|&&|\|\||[+\-*/%=<>!&|^])/g
      },
      python: {
        keywords: /\b(def|class|if|elif|else|for|while|try|except|finally|return|import|from|as|global|nonlocal|lambda|yield|with|and|or|not|in|is|None|True|False)\b/g,
        functions: /\b(print|len|range|list|dict|set|tuple|str|int|float|bool|sorted|map|filter|sum|min|max|abs|round|float|inf)\b/g,
        strings: /(".*?"|'.*?')/g,
        numbers: /\b\d+\b/g,
        operators: /(?:!=|==|<=|>=|\+\+|--|and|or|not|[+\-*/%=<>!&|^])/g
      },
      javascript: {
        keywords: /\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|class|extends|new|this|super|import|export|from|default|async|await|try|catch|finally)\b/g,
        functions: /\b(console|Array|Object|String|Number|Boolean|Math|Date|JSON|parseInt|parseFloat|isNaN|setTimeout|setInterval|clearTimeout|clearInterval|Infinity)\b/g,
        strings: /(".*?"|'.*?'|`.*?`)/g,
        numbers: /\b\d+\b/g,
        operators: /(?:!=|==|===|!==|<=|>=|\+\+|--|&&|\|\||[+\-*/%=<>!&|^])/g
      }
    }

    const pattern = patterns[language]
    if (!pattern) {
      tokens.push({ type: 'text', text })
      return tokens
    }

    let remainingText = text
    let lastIndex = 0

    // Find all matches
    const allMatches = []
    
    // Strings first (to avoid conflicts with content)
    let match
    pattern.strings.lastIndex = 0
    while ((match = pattern.strings.exec(text)) !== null) {
      allMatches.push({ ...match, type: 'string' })
    }
    
    // Keywords
    pattern.keywords.lastIndex = 0
    while ((match = pattern.keywords.exec(text)) !== null) {
      allMatches.push({ ...match, type: 'keyword' })
    }
    
    // Functions
    pattern.functions.lastIndex = 0
    while ((match = pattern.functions.exec(text)) !== null) {
      allMatches.push({ ...match, type: 'function' })
    }
    
    // Numbers
    pattern.numbers.lastIndex = 0
    while ((match = pattern.numbers.exec(text)) !== null) {
      allMatches.push({ ...match, type: 'number' })
    }
    
    // Operators last (to avoid conflicts with other patterns)
    if (pattern.operators) {
      // Reset regex lastIndex before using
      pattern.operators.lastIndex = 0
      while ((match = pattern.operators.exec(text)) !== null) {
        allMatches.push({ ...match, type: 'operator' })
      }
    }

    // Sort matches by index, then by length (longer matches first to handle operator precedence)
    allMatches.sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index
      }
      // If same index, prefer longer matches (for operators like != over !)
      return (b[0]?.length || 0) - (a[0]?.length || 0)
    })

    // Remove overlapping matches (keep longest match for each position)
    const filteredMatches = []
    for (const match of allMatches) {
      const lastMatch = filteredMatches[filteredMatches.length - 1]
      if (!lastMatch || match.index >= lastMatch.index + (lastMatch[0]?.length || 0)) {
        filteredMatches.push(match)
      }
    }

    // Build tokens
    let currentIndex = 0
    for (const match of filteredMatches) {
      if (match.index > currentIndex) {
        tokens.push({ type: 'text', text: text.substring(currentIndex, match.index) })
      }
      tokens.push({ type: match.type, text: match[0] })
      currentIndex = match.index + match[0].length
    }

    if (currentIndex < text.length) {
      tokens.push({ type: 'text', text: text.substring(currentIndex) })
    }

    return tokens
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Header with language tabs */}
      <div className="bg-gray-50 border-b border-gray-300 px-2 sm:px-4 py-2">
        <div className="flex items-center">
          {/* Language tabs */}
          <div className="flex flex-wrap gap-1 sm:gap-1">
            {languages.map((lang) => {
              const isActive = activeLanguage === lang.key
              const hasCode = codes[lang.key]
              
              if (!hasCode) return null
              
              return (
                <button
                  key={lang.key}
                  onClick={() => setActiveLanguage(lang.key)}
                  className={`px-2 py-1 text-xs sm:text-sm font-medium rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {lang.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Code content */}
      <div className="p-2 sm:p-4 bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm overflow-x-auto">
        <div className="min-w-full">
          {codes[activeLanguage] ? (
            getSyntaxHighlightedCode(codes[activeLanguage], activeLanguage)
          ) : (
            <div className="text-gray-400">No code available for this language</div>
          )}
        </div>
      </div>
    </div>
  )
}
