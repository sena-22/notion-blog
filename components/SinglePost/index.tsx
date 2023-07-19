import Link from 'next/link'

type Props = {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
  isPaginationPage: boolean
}

const SinglePost = (props: Props) => {
  const {title, description, date, tags, slug} = props

  return (
    <section className="sm:h-60 flex p-10 m-3 transition-all duration-300  hover:translate-y-1 rounded-lg shadow-[0_5px_10px_2px_rgba(0,0,0,0.08)] border-1 dark:text-white/90  dark:shadow-[0_5px_10px_2px_#1c1c1c] dark:hover:shadow-zinc-950 ">
      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold hover:text-black/70 hover:text-rose-400">
          <Link href={`/${slug}`}>{title}</Link>
        </h2>
        <div className="sm:flex sm:flex-row">
          <div className="p-1 mr-2 text-sm text-black/40 dark:text-white/70">{date}</div>
          <div>
            {tags.map((tag, idx) => (
              <Link key={tag} href={`/tag/${tag}/page/1`}>
                <span
                  key={idx}
                  className="w-auto p-1 mr-2 text-xs dark:text-white text-black/50 bg-black/10 dark:bg-white/10"
                >
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-base text-black/70 dark:text-white/70">{description}</p>
      </div>
    </section>
  )
}

export default SinglePost
