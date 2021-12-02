import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from 'lib'
import { useState, useContext, useRef } from 'react'
import { TransitionContext } from './TransitionProvider'

export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children)
  // @ts-ignore
  const { timeline, background } = useContext(TransitionContext)
  const el = useRef()

  useIsomorphicLayoutEffect(() => {
    if (children !== displayChildren) {
      if (timeline.duration() === 0) {
        // there are no outro animations, so immediately transition
        setDisplayChildren(children)
      } else {
        timeline.play().then(() => {
          // outro complete so reset to an empty paused timeline
          timeline.seek(0).pause().clear()
          setDisplayChildren(children)
        })
      }
    }
  }, [children])

  useIsomorphicLayoutEffect(() => {
    gsap.to(el.current, {
      background,
      duration: 1,
    })
  }, [background])

  return <div ref={el}>{displayChildren}</div>
}
