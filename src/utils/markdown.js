const fs = require('fs')
const matter = require('gray-matter')
const { highlight, getLanguage } = require('highlight.js')
const marked = require('marked')

const readMarkdownFile = (fullpath) => {
  const fileContents = fs.readFileSync(fullpath, 'utf8')
  return matter(fileContents)
}

const parseMarkdownContent = (content) => {
  marked.setOptions({
    highlight: (code, language) => {
      const validLanguage = getLanguage(language) ? language : 'plaintext'
      return highlight(validLanguage, code).value
    }
  })
  return marked.parse(content)
}

module.exports = {
  readMarkdownFile,
  parseMarkdownContent,
}
