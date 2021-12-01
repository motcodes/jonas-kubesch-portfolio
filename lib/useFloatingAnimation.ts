import { RefObject } from 'react'
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
  isScaling = false,
}: IFloatingAnimation) {
  const isDesktop = useMedia({ minWidth: 768 })
  useIsomorphicLayoutEffect(() => {
    if (isScaling && ref) {
      gsap.fromTo(
        ref.current,
        { scale: 0 },
        { scale: 1, duration: 0.5, delay: 1.2 }
      )
    }
  }, [])
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
