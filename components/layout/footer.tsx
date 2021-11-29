import Link from 'next/link'
import { GlobalContext, links, useRect } from 'lib'
import { Logo } from 'utils'
import { useContext, useRef } from 'react'
import { ILinks } from 'interfaces'
import { Torus } from 'components/3DModels'
import style from '../../styles/footer.module.scss'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const rect = useRect(footerRef)
  const rectTop = rect?.top

  return (
    <>
      <footer className={style.footer}>
        <Torus
          style={{
            top: Math.floor(Math.abs(24000 / (-rectTop - 320))),
            right: 48 + rect?.left * 0.5,
          }}
          className={style.footer__model}
        />
        <FooterTop footerRef={footerRef} />
        <div className={style.bottom}>
          <Logo size={48} className={style.imageContainer} footer />
          <h5>&copy; {new Date().getFullYear()}</h5>
        </div>
      </footer>
    </>
  )
}

const FooterTop = ({ footerRef }) => {
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
