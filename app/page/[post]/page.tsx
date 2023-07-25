export const revalidate = 600

import {ParamsProps} from '@/@types'
import Pagination from '@/components/Pagination'
import SinglePost from '@/components/SinglePost'
import Tag from '@/components/Tag/Tag'
import {getAllTags, getNumberOfPages, getPostsByPage} from '@/lib/notionAPI'

export async function generateStaticParams() {
  const numberOfPage = await getNumberOfPages()

  let params = []
  for (let i = 1; i <= numberOfPage; i++) {
    params.push({params: {page: i.toString()}})
  }

  return [{paths: params}]
}

const PageList = async ({params}: ParamsProps) => {
  const curPage = params?.post || '0'
  const postsByPage = await getPostsByPage(parseInt(curPage.toString(), 10))
  const numberOfPage = await getNumberOfPages()
  const allTags = await getAllTags()

  return (
    <main className="flex flex-col items-center justify-center w-full mt-16 ">
      <section className="flex flex-col justify-center w-5/6 gap-3 mx-auto ">
        {postsByPage.map((post: any) => (
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
      <Pagination numberOfPage={numberOfPage} />
      <Tag tags={allTags} />
    </main>
  )
}

export default PageList
