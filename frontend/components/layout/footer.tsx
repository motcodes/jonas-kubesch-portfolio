import Link from 'next/link'
import { GlobalContext, links } from 'lib'
import { Logo } from 'utils'
import style from '../../styles/footer.module.scss'
import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { ISocialLinks } from './layout'

export function Footer({ socialLinks }) {
  return (
    <footer className={style.footer}>
      <FooterTop socialLinks={socialLinks} />
      <div className={style.bottom}>
        <Logo size={48} className={style.imageContainer} footer />
        <h5>&copy; {new Date().getFullYear()}</h5>
      </div>
    </footer>
  )
}

const FooterTop = ({ socialLinks }) => {
  const { pathname } = useRouter()
  const { email } = useContext(GlobalContext)
  return (
    <div className={[style.grid, style.top].join(' ')}>
      <div className={style.grid__item}>
        <p>Get in touch</p>
        <p className={style.email}>{email}</p>
      </div>
      <ul className={[style.grid__item, style.list].join(' ')}>
        {links.map((link) => (
          <li
            key={`footer-${link.url}`}
            className={[
              style.list__item,
              pathname === link.url ? style.active : '',
            ].join(' ')}
          >
            <Link href={link.url}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className={[style.grid__item, style.list].join(' ')}>
        {socialLinks.map((link: ISocialLinks) => (
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
