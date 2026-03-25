'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GFGCodeBlock } from './code-block'
import { DiagramBlock } from './diagram-block'

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const preprocessContent = (text: string) => {
    // Replace diagram placeholders with special markers
    let processedText = text.replace(
      /## Algorithm Visualization/g,
      '## Algorithm Visualization\n\n<!-- DIAGRAM_BLOCK -->'
    )
    
    // Replace DP Problem-Solving Framework with diagram
    processedText = processedText.replace(
      /## DP Problem-Solving Framework/g,
      '## DP Problem-Solving Framework\n\n<!-- DIAGRAM_BLOCK -->'
    )
    
    // Convert all code blocks to GFG-style blocks
    // This regex matches ```language\ncode\n``` patterns
    processedText = processedText.replace(
      /```(\w+)\n([\s\S]*?)```/g,
      (match, language, code) => {
        return `\n\n<!-- MULTI_LANG_CODE_BLOCK -->\n\n`
      }
    )
    
    return processedText
  }

  // Function to extract code from the original content
  const extractCodeFromContent = (content: string) => {
    const codeBlocks: { [key: string]: string } = {}
    const regex = /```(\w+)\n([\s\S]*?)```/g
    let match
    
    while ((match = regex.exec(content)) !== null) {
      const language = match[1].toLowerCase()
      const code = match[2].trim()
      
      // Map language names to our keys
      const langMap: { [key: string]: string } = {
        'cpp': 'cpp',
        'c++': 'cpp',
        'c': 'c',
        'java': 'java',
        'python': 'python',
        'py': 'python',
        'javascript': 'javascript',
        'js': 'javascript'
      }
      
      const mappedLang = langMap[language] || language
      if (mappedLang in codeBlocks || mappedLang === 'cpp' || mappedLang === 'c' || mappedLang === 'java' || mappedLang === 'python' || mappedLang === 'javascript') {
        codeBlocks[mappedLang] = code
      }
    }
    
    return codeBlocks
  }

  // Extract code blocks from original content
  const extractedCodes = extractCodeFromContent(content)

  const components = {
    // Handle headings
    h1: ({children}: any) => <h1 className="text-3xl font-bold mb-4 text-gray-900">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-bold mb-4 text-gray-900">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-semibold mb-3 text-gray-900">{children}</h3>,
    
    // Handle paragraphs
    p: ({children}: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    
    // Handle lists
    ul: ({children}: any) => <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">{children}</ul>,
    ol: ({children}: any) => <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">{children}</ol>,
    li: ({children}: any) => <li>{children}</li>,
    
    // Handle inline code
    code: ({inline, children}: any) => {
      if (inline) {
        return <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{children}</code>
      }
      return null
    },
    
    // Handle blockquotes
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">{children}</blockquote>
    ),
    
    // Handle tables
    table: ({children}: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300">{children}</table>
      </div>
    ),
    thead: ({children}: any) => <thead className="bg-gray-50">{children}</thead>,
    th: ({children}: any) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold">{children}</th>,
    td: ({children}: any) => <td className="border border-gray-300 px-4 py-2">{children}</td>,
    
    // Handle emphasis
    strong: ({children}: any) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({children}: any) => <em className="italic">{children}</em>,
  }

  const processedContent = preprocessContent(content)
  
  // Split content by our custom markers
  const sections = processedContent.split(/<!-- (DIAGRAM_BLOCK|MULTI_LANG_CODE_BLOCK) -->/)
  
  return (
    <div>
      {sections.map((section, index) => {
        if (section === 'DIAGRAM_BLOCK') {
          return <DiagramBlock key={`diagram-${index}`} />
        }
        if (section === 'MULTI_LANG_CODE_BLOCK') {
          // Only use extracted codes from content
          const codesToUse = extractedCodes
          const defaultLang = extractedCodes['cpp'] ? 'cpp' : extractedCodes['c'] ? 'c' : extractedCodes['java'] ? 'java' : extractedCodes['python'] ? 'python' : 'cpp'
          return <GFGCodeBlock key={`code-${index}`} codes={codesToUse} defaultLanguage={defaultLang} />
        }
        
        // Regular markdown content
        if (section.trim()) {
          return (
            <div key={`md-${index}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {section}
              </ReactMarkdown>
            </div>
          )
        }
        
        return null
      })}
    </div>
  )
}
