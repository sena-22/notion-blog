import Link from 'next/link'
import {getAllPostIds, getPostData} from '../../lib/posts'
import {PostDataWithContent} from '../../@types'

export default function Post({post}: {post: PostDataWithContent}) {
  return (
    <div className={`flex min-h-screen flex-col items-center p-24`}>
      <h1>{post.title}</h1>
      <div>{post.date}</div>
      <div dangerouslySetInnerHTML={{__html: post.contentHtml}}></div>
      <Link href={'/'}>Go Home</Link>
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
