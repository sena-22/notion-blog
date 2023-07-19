import Link from 'next/link'

interface Props {
  tags: string[]
}

const Tag = (props: Props) => {
  const {tags} = props

  return (
    <div>
      <section className="p-5 mx-auto mb-8 ">
        <div className="mb-4 font-medium">
          <div className="flex flex-wrap justify-center gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag}/page/1`}>
                <span className="inline-block p-2 transition-all duration-300 shadow-2xl cursor-pointer text-medium dark:text-white text-black/50 bg-black/10 dark:bg-white/10 hover:translate-y-1 hover:shadow-none">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tag
