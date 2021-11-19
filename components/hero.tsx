import { useEffect } from 'react'
import { Gradient } from 'utils/Gradient'
import style from '../styles/hero.module.scss'

export function Hero() {
  useEffect(() => {
    // Create your instance
    const gradient = new Gradient(
      document.querySelector('#gradient-canvas'),
      window.innerWidth,
      window.innerHeight
    )

    // Call `initGradient` with the selector to your canvas
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  }, [])
  return (
    <section className={style.hero}>
      {/* <div className={style.backgroundPlaceholder}>M</div> */}
      <canvas
        id="gradient-canvas"
        className={style.backgroundPlaceholder}
        data-transition-in
      ></canvas>
      <div className={style.backgroundGradient}></div>
      <div className={style.container}>
        <h1>
          I'm <i>baby microdosing flexitarian street</i> art pour-over
          distillery. IPhone quinoa food truck, <b>prism snackwave</b> next
          level farm-to-table drinking vinegar.
        </h1>
      </div>
    </section>
  )
}
