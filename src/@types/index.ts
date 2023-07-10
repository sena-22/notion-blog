export interface PostData {
  id: string
  title: string
  date: string
  description: string
}

export type PostDataWithContent = {
  contentHtml: string
} & PostData
