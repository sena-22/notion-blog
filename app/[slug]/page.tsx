export const revalidate = 600

import Link from 'next/link'
import {getAllPosts, getSinglePost} from '../../lib/notionAPI'
import dynamic from 'next/dynamic'

const Markdown = dynamic(() => import('../../components/Markdown'))

export async function generateMetadata({params}: {params: {slug: string}}) {
  const slug = params.slug
  const post = await getSinglePost(slug)

  return {title: post.metadata.title}
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts()
  const paths = allPosts.map(({slug}) => ({params: {slug}}))
  return paths
}

export default async function Post({params}: any) {
  const post = await getSinglePost(params.slug)

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-lg p-5 md:p-20 max-h-2xl ">
      <div className="flex flex-col p-10 text-center rounded opacity-50 bg-gray-950 dark:opacity-80 min-w-[90%]">
        <div className="mt-5 text-2xl text-center text-white whitespace-normal lg:px-20 md:text-3xl hover:text-rose-400">
          {post.metadata.title}
        </div>
        <div className="mt-5 mb-5 text-sm text-white ">{post.metadata.date}</div>
        <div className="flex flex-wrap justify-center gap-2 sm:flex-row">
          {post.metadata.tags.map((tag: string, idx: number) => (
            <span key={idx} className="w-auto p-2 mr-2 text-xs text-white rounded bg-white/10">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5 prose dark:text-white/70 dark:prose-invert w-[100%]">
        <Markdown markdown={post.markdown.parent} />
      </div>
      <Link href={{pathname: '/'}} className="mt-5 text-xl text-sky-800">
        main
      </Link>
    </div>
  )
}
