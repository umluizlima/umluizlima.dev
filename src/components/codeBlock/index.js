import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import style from './style'

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={style}
    >
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
