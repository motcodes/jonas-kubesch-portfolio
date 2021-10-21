import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { links } from 'lib'
import { Logo } from 'utils'
import style from '../../styles/header.module.scss'

export function Header({ socialLinks = [] }) {
  const { pathname } = useRouter()

  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <Link href="/">
          <a>
            <Logo size={48} className={style.logo} />
          </a>
        </Link>
      </div>

      <nav className={style.navigation}>
        <ul className={style.navigation__list}>
          {links
            .filter((link) => link.url !== pathname)
            .map((link) => (
              <li key={link.url} className={style.navigation__list__item}>
                <Link href={link.url}>
                  <a>{link.title}</a>
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {socialLinks && (
        <nav className={[style.navigation, style.socialLinks].join(' ')}>
          <ul className={style.navigation__list}>
            {socialLinks.map((link) => (
              <li key={link.url} className={style.navigation__list__item}>
                <Link href={link.url}>
                  <a>{link.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
