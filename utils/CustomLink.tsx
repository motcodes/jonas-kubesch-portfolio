import Link from 'next/link'
import { linkResolver } from 'prismicConfiguration'

// Helper function to convert Prismic Rich Text links to Next/Link components
export function CustomLink(type, element, content, children, index) {
  return (
    <Link key={index} href={linkResolver(element.data)}>
      <a>{content}</a>
    </Link>
  )
}
