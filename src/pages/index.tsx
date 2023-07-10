import Link from 'next/link'
import {getAllPost} from '../../lib/posts'
import {PostData} from '../@types'

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
    <main className="flex flex-col min-h-screen">
      <h1 className="mt-10 ml-10 text-3xl border-solid dark:text-white/90">Untitled</h1>
      <ul className="flex flex-col justify-center">
        {allPostsData.map(({id, title, date, description}) => (
          <li
            key={id}
            className="flex justify-between p-10 m-10 text-2xl border-solid rounded-lg shadow-lg border-1 dark:text-white/90 align-center dark:border-sky-500 "
          >
            <div className="flex flex-col">
              <Link href={`${id}`} className="font-semibold hover:text-black/70 dark:hover:text-white">
                {title}
              </Link>
              <p className="mt-2 mb-3 text-sm dark:text-white/90">{date}</p>
              <p className="text-xl">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
