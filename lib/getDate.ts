import { Date } from 'prismic-reactjs'

export const getDate = (date: string) =>
  Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(Date(date))
