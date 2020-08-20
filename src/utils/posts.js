import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

const getFileNames = (path) => {
  if (!fs.existsSync(path)) {
    return [];
  }
  return fs.readdirSync(postsDirectory);
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = getFileNames(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = getFileNames(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into string
  const processedContent = await remark()
    .process(matterResult.content)
  const content = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    content,
    ...matterResult.data
  }
}