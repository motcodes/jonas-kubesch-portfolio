import Link from 'next/link'
import { GlobalContext } from 'lib'
import { MutableRefObject, Ref, useContext, useEffect } from 'react'
import { Gradient } from 'utils/Gradient'
import style from '../styles/hero.module.scss'
import { ILinks } from 'interfaces'
import { Cone } from './3DModels'

export function Hero({
  description = '',
  heroRef,
}: {
  description: string
  heroRef: Ref<HTMLElement>
}) {
  const { socialLinks } = useContext(GlobalContext)
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
    <section ref={heroRef} id="hero" className={style.hero}>
      <canvas
        id="gradient-canvas"
        className={style.backgroundGradient}
        data-transition-in
      ></canvas>
      <div className={style.backgroundOverlayGradient}></div>
      <div className={style.container}>
        <section className={style.intro}>
          <h1>
            Jonas
            <br />
            Kubesch
          </h1>
          <p className={style.intro__description}>{description}</p>
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
