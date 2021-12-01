import Link from 'next/link'
import { Ref, useContext, useEffect, useRef } from 'react'
import { ILinks } from 'interfaces'
import { GlobalContext } from 'lib'
import { Gradient } from 'utils'
import style from '../styles/hero.module.scss'

export function Hero({
  description = '',
  heroRef,
}: {
  description: string
  heroRef: Ref<HTMLElement>
}) {
  const { socialLinks } = useContext(GlobalContext)
  useEffect(() => {
    const gradient = new Gradient(
      document.querySelector('#gradient-canvas'),
      window.innerWidth,
      window.innerHeight
    )
    // @ts-ignore
    gradient.initGradient('#gradient-canvas')
  }, [])

  const descRef = useRef<HTMLParagraphElement>(null)

  return (
    <section ref={heroRef} id="hero" className={style.hero}>
      <canvas
        id="gradient-canvas"
        className={style.backgroundGradient}
        data-transition-in
      ></canvas>
      <div className={style.backgroundOverlayGradient}></div>
      <div className={style.backgroundOverlayColor}></div>
      <div className={style.container}>
        <section className={style.intro}>
          <h1>
            Jonas
            <br />
            Kubesch
          </h1>
          <p ref={descRef} className={style.intro__description}>
            {description}
          </p>
        </section>
        {socialLinks && (
          <ul className={style.linkContainer}>
            {socialLinks.map((link: ILinks) => (
              <li key={link.url}>
                <Link href={link.url}>
                  <a>{link.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <Cone className={style.hero__model} /> */}
    </section>
  )
}
