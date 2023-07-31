import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="container px-5 mt-10 mx-auto lg:px-2 w-[90%] lg:w-[80%]">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-medium text-center dark:text-white hover:text-rose-400">Untitled</h1>
        </Link>

        <div>
          <ul className="flex items-center text-sm sm:py-4">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 transition-all duration-300 dark:text-white hover:text-rose-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="https://github.com/sena-22"
                className="block px-4 py-2 transition-all duration-300 dark:text-white hover:text-rose-400"
              >
                Github
              </Link>
            </li>

            <li>
              <Link
                href="https://rienrose.tistory.com/"
                className="block px-4 py-2 transition-all duration-300 dark:text-white hover:text-rose-400"
              >
                Tistory
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
