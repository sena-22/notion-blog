export const revalidate = 60

import {ParamsProps, PostData} from '@/@types'
import Pagination from '@/components/Pagination'
import SinglePost from '@/components/SinglePost'
import Tag from '@/components/Tag/Tag'
import {getAllTags, getNumberOfPagesByTag, getPostsByTagAndPage} from '@/lib/notionAPI'

export const generateStaticParams = async () => {
  const allTags = await getAllTags()
  let params: {params: {tag: string; page: string}}[] = []

  await Promise.all(
    allTags.map(async (tag: string) => {
      const numberOfPagesByTag = await getNumberOfPagesByTag(tag)
      for (let i = 1; i <= numberOfPagesByTag; i++) {
        params.push({params: {tag: tag, page: i.toString()}})
      }
    })
  )

  return [
    {
      paths: params,
      fallback: 'blocking',
    },
  ]
}

const PageList = async ({params}: ParamsProps) => {
  const curPage = params?.page || '0'
  const curTag = params?.tag?.toString()
  const posts = await getPostsByTagAndPage(curTag, parseInt(curPage, 10))
  const numberOfPagesByTag = await getNumberOfPagesByTag(curTag)
  const allTags = await getAllTags()

  return (
    <main className="flex flex-col items-center justify-center w-full mt-16 ">
      <h1 className="mb-16 text-2xl font-medium text-center text-gray-900 dark:text-white hover:text-rose-400 ">
        #{curTag}
      </h1>
      <section className="flex flex-col justify-center w-5/6 gap-3 mx-auto ">
        {posts.map((post: PostData) => (
          <div key={post.id}>
            <SinglePost
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={true}
            />
          </div>
        ))}
      </section>
      <Pagination numberOfPage={numberOfPagesByTag} tag={curTag} />
      <Tag tags={allTags} />
    </main>
  )
}

export default PageList
