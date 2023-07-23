import { RefObject, useState } from 'react'
import gsap from 'gsap'
import useMedia from 'use-media'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

interface IFloatingAnimation {
  ref: RefObject<HTMLDivElement> | RefObject<SVGAElement>
  from?: number | string
  fromDesktop?: number | string
  to?: number | string
  toDesktop?: number | string
  duration?: number
  isScaling?: boolean
}

export function useFloatingAnimation({
  ref,
  from = -3,
  fromDesktop = -5,
  to = 5,
  toDesktop = 20,
  duration = 3,
  isScaling = true,
}: IFloatingAnimation) {
  const isDesktop = useMedia({ minWidth: 768 })
  const [scaling, setScaling] = useState<boolean>(isScaling)
  const [count, setCount] = useState<number>(0)

  useIsomorphicLayoutEffect(() => {
    let counter = 0
    if (scaling && ref) {
      gsap.fromTo(
        ref.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 1, ease: 'power4.easeOut' }
      )
      setCount(++counter)
    }
    if (count > 0) {
      setScaling(false)
    }
  })
  useIsomorphicLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { y: isDesktop ? fromDesktop : from },
      {
        y: isDesktop ? toDesktop : to,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      }
    )
  })
}
