import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {PostData} from '../src/@types'
import {remark} from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

// cwd: current working directory
const postsDirectory = path.join(process.cwd(), '__posts')

export function getAllPost(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const {
      data: {title, date, description},
    } = matter(fileContents)

    return {
      id,
      title,
      date,
      description,
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const remarkedContent = await remark().use(remarkRehype).use(rehypeStringify).process(matterResult.content)

  const contentHtml = remarkedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
