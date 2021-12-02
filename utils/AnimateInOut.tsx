import React, { useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { TransitionContext } from './TransitionProvider'
import { useIsomorphicLayoutEffect } from 'lib'

interface IAnimateInOut {
  children: ChildNode
  from: {}
  to: {}
  durationIn?: number
  durationOut?: number
  delay?: number
  delayOut?: number
  set?: {}
  skipOutro?: boolean
}

const AnimateInOut = ({
  children,
  from = { autoAlpha: 0 },
  to = { autoAlpha: 1 },
  durationIn = 2,
  durationOut = 1.5,
  delay = 0.5,
  delayOut = 0,
  set = { autoAlpha: 0 },
  skipOutro = false,
}) => {
  //@ts-ignore
  const { timeline } = useContext(TransitionContext)
  const el = useRef()

  useIsomorphicLayoutEffect(() => {
    // intro animation
    if (set) {
      gsap.set(el.current, { ...set })
    }

    gsap.to(el.current, {
      ...to,
      delay: delay || 0,
      duration: durationIn,
      ease: 'sine.easeIn',
    })

    // outro animation
    if (!skipOutro) {
      timeline.add(
        gsap.to(el.current, {
          ...from,
          delay: delayOut || 0,
          duration: durationOut,
          ease: 'sine.easeOut',
        }),
        0
      )
    }
  }, [])

  return (
    <div id="page-transition" ref={el}>
      {children}
    </div>
  )
}
// const AnimateInOut = ({
//   children,
//   from = { autoAlpha: 1 },
//   to = { autoAlpha: 1 },
//   durationIn = 2,
//   durationOut = 1,
//   delay = 0,
//   delayOut = 0,
//   set = { autoAlpha: 1 },
//   skipOutro = false,
// }) => {
//   //@ts-ignore
//   const { timeline } = useContext(TransitionContext)
//   const el = useRef()

//   useIsomorphicLayoutEffect(() => {
//     // intro animation
//     if (set) {
//       // gsap.set(, { y: '-50%' })
//     }
//     // gsap.to(el.current, {
//     //   ...to,
//     //   delay: delay || 0,
//     //   duration: 0,
//     // })
//     // gsap.to(el.current, {
//     //   ...to,
//     //   delay: delay || 0,
//     //   duration: durationIn,
//     // })

//     gsap.fromTo(
//       '#pageTrans',
//       {
//         y: '-50%',
//       },
//       {
//         y: '100%',
//         duration: 4,
//         delay: 0,
//         ease: 'power4.easeIn',
//       }
//     )

//     gsap.fromTo(
//       '.page-transition-path',
//       { scaleX: 1 },
//       {
//         scaleX: 6,
//         duration: 3.5,
//         delay: 0.5,
//         ease: 'power4.easeIn',
//       }
//     )

//     // outro animation
//     if (!skipOutro) {
//       // gsap.to(el.current, {
//       //   ...from,
//       //   delay: delayOut || 0,
//       //   duration: durationOut,
//       // }),
//       timeline.add(
//         [
//           gsap.fromTo(
//             '#pageTrans',
//             {
//               y: '150%',
//             },
//             {
//               y: '-50%',
//               duration: 4,
//               delay: 0,
//               ease: 'power4.easeIn',
//             }
//           ),

//           gsap.fromTo(
//             '.page-transition-path',
//             { scaleX: 1 },
//             {
//               scaleX: 6,
//               duration: 2.5,
//               delay: 1.25,
//               ease: 'power4.easeIn',
//             }
//           ),
//         ],
//         0
//       )
//     }
//   }, [])

//   return (
//     <div id="page-transition" ref={el}>
//       {children}
//       <div id="pageTrans">
//         <svg
//           className="page-transition-svg"
//           viewBox="0 0 1440 489"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M1440 488.373L0 488.373L-1.99324e-05 260.373C-1.99324e-05 260.373 182.5 -53.1271 343.5 7.8729C504.5 68.8729 508.5 197.873 720 217.873C931.5 237.873 1008.5 100.373 1186.5 144.873C1364.5 189.373 1440 260.373 1440 260.373L1440 488.373Z"
//             fill="#F9CF9F"
//             className="page-transition-path"
//           />
//           <path
//             d="M1440 488.373L0 488.373L-1.57517e-05 308.194C-1.57517e-05 308.194 183 -25.155 344 33.3729C505 91.9008 509 270.183 720.5 289.373C932 308.562 1044.5 142.373 1192 173.373C1339.5 204.373 1440 308.194 1440 308.194L1440 488.373Z"
//             fill="#081216"
//             className="page-transition-path"
//           />
//           <path
//             d="M1440 488.373L0 488.373L-1.12397e-05 359.806C-1.12397e-05 359.806 228.5 -15.6271 375.5 90.3729C522.5 196.373 562 372.373 739 359.805C916 347.238 1044 200.873 1176 209.373C1308 217.873 1440 359.805 1440 359.805L1440 488.373Z"
//             fill="#0F3F57"
//             className="page-transition-path"
//           />
//         </svg>
//         <div className="page-transisiton-background"></div>
//       </div>
//     </div>
//   )
// }

export default React.memo(AnimateInOut)
