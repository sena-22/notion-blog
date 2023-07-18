import {Client} from '@notionhq/client'
import {NotionToMarkdown} from 'notion-to-md'
import {NUMBER_OF_POSTS_PER_PAGE} from '../constants/constants'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({notionClient: notion})

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  })

  const allPosts = posts.results

  return allPosts.map((post) => {
    return getPageMetaData(post)
  })
}

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name
    })
    return allTags
  }
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
  }
}

export const getSinglePost = async (slug: string) => {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: 'Slug',
      formula: {
        string: {equals: slug},
      },
    },
  })
  const page = res.results[0]
  const metadata = getPageMetaData(page)
  const mdBlock = await n2m.pageToMarkdown(page.id)
  const mdString = n2m.toMarkdownString(mdBlock)
  return {metadata, markdown: mdString}
}

/* Home Page용 */
export const getPostsForTopPage = async () => {
  const allPosts = await getAllPosts()
  const slicedPosts = allPosts.slice(0, NUMBER_OF_POSTS_PER_PAGE)
  return slicedPosts
}

/* 페이지별 게시글 */
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts()
  const startIdx = (page - 1) * NUMBER_OF_POSTS_PER_PAGE
  const endIdx = startIdx + NUMBER_OF_POSTS_PER_PAGE
  return allPosts.slice(startIdx, endIdx)
}

/* 페이지 숫자 */
export const getNumberOfPages = async () => {
  const allPosts = await getAllPosts()

  return (
    Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) + (allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0)
  )
}
