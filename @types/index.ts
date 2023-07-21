export interface PostData {
  id: string
  title: string
  date: string
  description: string
  slug: string
  tags: string[]
  isPaginationPage?: boolean
}

export type PostDataWithContent = {
  contentHtml: string
} & PostData

export type SinglePostData = {
  metadata: PostData
  markdown: {parent: string}
}

export type ParamsProps = {
  params: {[key: string]: string}
}

export type tagResponse = {
  id: string
  name: string
  color: string
}
