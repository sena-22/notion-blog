import Link from 'next/link'
import {PostData} from '../@types'
import {getAllPosts} from '../../lib/notionAPI'

export const getStaticProps = async () => {
  const posts = await getAllPosts()

  return {
    props: {
      posts,
    },
    revalidate: 300,
  }
}

interface HomeProps {
  posts: PostData[]
}

export default function Home({posts}: HomeProps) {
  return (
    <main className="flex flex-col min-h-screen ">
      <h1 className="mt-10 ml-10 text-3xl dark:text-white/90">Untitled</h1>
      <div className="flex flex-col">
        {posts.map(({id, title, date, description, tags, slug}) => (
          <div
            key={id}
            className="max-w-screen-lg flex justify-between p-10 m-10 text-2xl rounded-lg shadow-lg border-1 dark:text-white/90 align-center dark:shadow-sky-900 dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] dark:hover:shadow-sky-500"
          >
            <div className="flex flex-col">
              <Link href={`${slug}`} className="font-semibold hover:text-black/70 dark:hover:text-white">
                {title}
              </Link>
              <div className="mt-2 mb-3 dark:text-white/70">{date}</div>
              <div className="flex">
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="w-auto pt-1 pb-1 pl-2 pr-2 mb-1 mr-1 text-sm text-white bg-sky-900 rounded-xl"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="text-xl">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
