import Link from 'next/link'
import {SinglePostData} from '../@types'
import {getAllPosts, getSinglePost} from '../../lib/notionAPI'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface PostProps {
  post: SinglePostData
}

export default function Post({post}: PostProps) {
  return (
    <div className="flex flex-col min-h-screen p-20 ">
      <div className="mt-5 text-3xl dark:text-white/90">{post.metadata.title}</div>
      <div className="mt-5 mb-5 text-sm dark:text-white/70">{post.metadata.date}</div>
      <div className="mt-5 text-2xl leading-relaxed dark:text-white/70">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {post.markdown.parent}
        </ReactMarkdown>
      </div>
      <Link href={{pathname: '/'}} className="mt-5 text-xl text-sky-800">
        main
      </Link>
    </div>
  )
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths = allPosts.map(({slug}) => ({params: {slug}}))
  return {
    paths,
    fallback: 'blocking', // 404 not found
  }
}

export const getStaticProps = async ({params}: any) => {
  const post = await getSinglePost(params.slug) // url에서 params를 가져옴

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 6, //6시간마다 갱신(ISR)
  }
}
