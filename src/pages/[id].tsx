import Link from 'next/link'
import {getAllPostIds, getPostData} from '../../lib/posts'
import {PostDataWithContent} from '../@types'

export default function Post({post}: {post: PostDataWithContent}) {
  return (
    <div className={`flex min-h-screen flex-col p-24 max-w-7xl align-items-center ml-10`}>
      <h1 className="mt-10 text-3xl dark:text-white/90">{post.title}</h1>
      <div className="mt-5 mb-5 text-sm dark:text-white/70">{post.date}</div>
      <div
        className="mt-10 text-2xl leading-relaxed dark:text-white/70"
        dangerouslySetInnerHTML={{__html: post.contentHtml}}
      ></div>
      <Link href={'/'} className="mt-5 text-xl text-sky-800">
        main
      </Link>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: {id: string}}) {
  const post = await getPostData(params.id)

  return {
    props: {
      post,
    },
  }
}
