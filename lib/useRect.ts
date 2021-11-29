import { MutableRefObject, useState, useEffect } from 'react'

export const useRect = (
  ref: MutableRefObject<HTMLElement>
): DOMRect | undefined => {
  // const ref = useRef<HTMLElement>()
  const [rect, setRect] = useState<DOMRect>()
  const set = () => setRect(ref.current?.getBoundingClientRect())

  const useEffectInEvent = (event, useCapture = false) => {
    useEffect(() => {
      set()
      window.addEventListener(event, set, useCapture)
      return () => window.removeEventListener(event, set, useCapture)
    }, [event, useCapture])
  }

  useEffectInEvent('resize')
  useEffectInEvent('scroll', true)

  return rect
}
