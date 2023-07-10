import Link from 'next/link'
import {getAllPost} from '../../lib/posts'
import {PostData} from '../../@types'

export async function getStaticProps() {
  const allPostsData = getAllPost()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Home({allPostsData}: {allPostsData: PostData[]}) {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <h1>Post list</h1>
      <ul>
        {allPostsData.map(({id, title, date, description}) => (
          <li key={id} className="p-3 m-2 text-center bg-slate-300">
            <Link href={`${id}`} className="font-bold">
              {title}
            </Link>
            <div>{date}</div>
            <div>{description}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
