import Link from 'next/link'
import {getAllPosts, getSinglePost} from '../../lib/notionAPI'
import Markdown from '../../components/Markdown'
import {Metadata} from 'next'

export async function generateMetadata({params}: {params: {slug: string}}) {
  const slug = params.slug
  const post = await getSinglePost(slug)

  return {title: post.metadata.title}
}

export default async function Post({params}: any) {
  const post = await getSinglePost(params.slug)

  return (
    <div className="flex flex-col min-h-screen p-20 ">
      <div className="mt-5 text-3xl dark:text-white/90">{post.metadata.title}</div>
      <div className="mt-5 mb-5 text-sm dark:text-white/70">{post.metadata.date}</div>
      <div className="mt-5 leading-relaxed prose dark:text-white/70 dark:prose-invert">
        <Markdown markdown={post.markdown.parent} />
      </div>

      <Link href={{pathname: '/'}} className="mt-5 text-xl text-sky-800">
        main
      </Link>
    </div>
  )
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts()
  const paths = allPosts.map(({slug}) => ({params: {slug}}))
  return paths
}
