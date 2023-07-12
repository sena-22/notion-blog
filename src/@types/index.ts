export interface PostData {
  id: string
  title: string
  date: string
  description: string
  slug: string
  tags: string[]
}

export type PostDataWithContent = {
  contentHtml: string
} & PostData

export type SinglePostData = {
  metadata: PostData
  markdown: {parent: string}
}
