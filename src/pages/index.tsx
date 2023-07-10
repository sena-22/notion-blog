import {getPostsData} from '../../lib/posts'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

interface PostData {
  id: number
  title: string
  date: string
}

export async function getStaticProps() {
  const allPostsData = getPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
export default function Home({allPostsData}: {allPostsData: PostData[]}) {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
      <h1>Post list</h1>
      <ul>
        {allPostsData.map(({id, title, date}) => (
          <li key={id}>
            <div>{title}</div>
            <div>{date}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
