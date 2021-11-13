import { useRouter } from 'next/router'

export function routeURL(): string {
  const router = useRouter()
  return router.asPath
}
