'use client'
import React from 'react'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Markdown = ({markdown}: {markdown: string}) => {
  return (
    <ReactMarkdown
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter {...props} style={vscDarkPlus} showLineNumbers={true} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
      }}
      className="prose-pre:bg-[#1e1e1e] "
    >
      {markdown}
    </ReactMarkdown>
  )
}

export default Markdown
