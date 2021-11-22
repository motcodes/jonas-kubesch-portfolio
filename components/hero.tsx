import Link from 'next/link'
import { GlobalContext } from 'lib'
import { useContext, useEffect } from 'react'
import { Gradient } from 'utils/Gradient'
import style from '../styles/hero.module.scss'
import { ILinks } from 'interfaces'

export function Hero() {
  const { metadescription, socialLinks } = useContext(GlobalContext)
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
          <p>{metadescription}</p>
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
        <svg
          width="328"
          height="1"
          viewBox="0 0 328 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            y1="0.75"
            x2="328"
            y2="0.75"
            stroke="var(--offwhite)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </section>
  )
}
