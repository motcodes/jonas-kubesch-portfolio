import Link from 'next/link'
import { GlobalContext, links } from 'lib'
import { Logo } from 'utils'
import style from '../../styles/footer.module.scss'
import { useRouter } from 'next/dist/client/router'
import { useContext } from 'react'
import { ILinks } from 'interfaces'

export function Footer() {
  return (
    <footer className={style.footer}>
      <FooterTop />
      <div className={style.bottom}>
        <Logo size={48} className={style.imageContainer} footer />
        <h5>&copy; {new Date().getFullYear()}</h5>
      </div>
    </footer>
  )
}

const FooterTop = () => {
  const { pathname } = useRouter()
  const { email, socialLinks } = useContext(GlobalContext)
  return (
    <div className={`${style.grid} ${style.top}`}>
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
