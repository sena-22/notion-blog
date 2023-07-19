export const getPageLink = (page: number, tag?: string) => {
  return tag ? `/tag/${tag}/page/${page}` : `/page/${page}`
}
