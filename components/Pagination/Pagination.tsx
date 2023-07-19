import Link from 'next/link'
import React from 'react'
import {getPageLink} from '@/lib/blog-helper'

interface Props {
  numberOfPage: number
  tag?: string
}

export default function Pagination(props: Props) {
  const {numberOfPage, tag} = props

  let pages: number[] = []

  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i)
  }

  return (
    <section className="p-5 mx-auto mb-8 rounded-md lg:w-1/2">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li key={page} className="relative w-6 h-8 rounded-lg">
            <Link
              href={getPageLink(page, tag)}
              className="absolute dark:text-gray-100 text-md top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 hover:text-rose-400"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
