import useMedia from 'use-media'

export const useMobile = () => {
  if (typeof window !== 'undefined') {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true
    }
  }
  return false
}
