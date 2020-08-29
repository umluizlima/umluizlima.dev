const fs = require('fs')
const path = require('path')

const { readMarkdownFile, parseMarkdownContent } = require('./markdown')

const getContentDirectory = () => (path.join(process.cwd(), 'content'))
const getBlogDirectory = () => (path.join(getContentDirectory(), 'blog'))

const getFileNames = (folder) => {
  if (!fs.existsSync(folder)) {
    return [];
  }
  return fs.readdirSync(folder);
}

const getAllContentIds = (folder) => {
  const fileNames = getFileNames(folder)
  return fileNames.map(fileName => (fileName.replace(/\.md$/, '')))
}

const getContentData = (folder, id) => {
  const fullPath = path.join(folder, `${id}.md`)
  const file = readMarkdownFile(fullPath)
  return {
    id,
    content: parseMarkdownContent(file.content),
    ...file.data
  }
}

const getAllContentData = (folder) => {
  const contentIds = getAllContentIds(folder)
  return contentIds.map((id) => (getContentData(folder, id)))
}

const getSortedContentData = (folder) => {
  return getAllContentData(folder).sort((a, b) => (a.date < b.date ? 1 : -1))
}

module.exports = {
  getSortedContentData,
  getAllContentIds,
  getContentData,
  getBlogDirectory,
}
