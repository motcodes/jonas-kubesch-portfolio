import Link from 'next/link'
import { RefObject, useContext, useRef } from 'react'
import { ILinks } from 'interfaces'
import { Torus } from 'components/3DModels'
import { Logo } from 'utils'
import { GlobalContext, links, useRect } from 'lib'
import style from '../../styles/footer.module.scss'
import { useFloatingAnimation } from 'lib'

export function Footer() {
  const torusRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const rect = useRect(footerRef)
  const rectTop = rect?.top

  useFloatingAnimation({
    ref: torusRef,
    from: 0,
    to: 10,
    toDesktop: 10,
    isScaling: false,
  })

  return (
    <>
      <footer className={style.footer}>
        <Torus
          torusRef={torusRef}
          style={{
            top: Math.floor(Math.abs(24000 / (-rectTop - 320))) || 16,
            right: 48 + rect?.left * 0.5 || 48,
          }}
          className={style.footer__model}
        />
        <FooterTop footerRef={footerRef} />
        <div className={style.bottom}>
          <Logo size={48} className={style.imageContainer} footer />
          <h5>&copy; {new Date().getFullYear()}</h5>
        </div>
        <div className={`${style.bottom} ${style.siteBy}`}>
          <p>
            site by{' '}
            <Link href="https://matthiasoberholzer.com">
              <a>Matthias Oberholzer</a>
            </Link>
          </p>
        </div>
      </footer>
    </>
  )
}

const FooterTop = ({ footerRef }: { footerRef: RefObject<HTMLDivElement> }) => {
  const { email, socialLinks } = useContext(GlobalContext)
  return (
    <div ref={footerRef} className={`${style.grid} ${style.top}`}>
      <div className={style.grid__item}>
        <p>
          If you have a project idea in mind,
          <br /> then let’s get in touch
        </p>
        <p className={style.email}>{email}</p>
      </div>
      <ul className={`${style.grid__item} ${style.list}`}>
        {links.map((link) => (
          <li key={`footer-${link.url}`} className={style.list__item}>
            <Link href={link.url}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className={`${style.grid__item} ${style.list}`}>
        {socialLinks &&
          socialLinks.map((link: ILinks) => (
            <li key={`footer-${link.url}`} className={style.list__item}>
              <Link href={link.url}>
                <a>{link.title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
