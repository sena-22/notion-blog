import Link from 'next/link'
import {getAllPostIds, getPostData} from '../../lib/posts'
import {PostDataWithContent} from '../@types'

export default function Post({postData}: {postData: PostDataWithContent}) {
  return (
    <div className="flex flex-col min-h-screen p-20 ">
      <div className="mt-5 text-3xl dark:text-white/90">{postData.title}</div>
      <div className="mt-5 mb-5 text-sm dark:text-white/70">{postData.date}</div>
      <div className="mt-5 text-2xl leading-relaxed dark:text-white/70">
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{__html: `<div>${postData.contentHtml}</div>`}}
        ></div>
      </div>
      <Link href={{pathname: '/'}} className="mt-5 text-xl text-sky-800">
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
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}
