import { INavButton, ILinks } from 'interfaces'
import { useContext, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { GlobalContext, links } from 'lib'
import { Logo } from 'utils'
import style from '../../styles/header.module.scss'

export function Header() {
  const { pathname } = useRouter()
  const { socialLinks, email } = useContext(GlobalContext)
  const [isOpen, toggleOpen] = useState<Boolean>(false)

  function handleMenu() {
    toggleOpen(!isOpen)
    if (isOpen) {
      document.body.style.overflow = 'scroll'
    } else if (!isOpen) {
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <header className={style.header}>
      <div className={`${style.logoContainer} ${isOpen ? style.isOpen : ''}`}>
        <Link href="/">
          <a>
            <Logo size={48} className={style.logo} />
          </a>
        </Link>
      </div>

      <NavButton isOpen={isOpen} toggleOpen={handleMenu} />

      <div className={`${style.linkContainer} ${isOpen ? style.isOpen : ''}`}>
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
          <nav className={`${style.navigation} ${style.socialLinks}`}>
            <ul className={style.navigation__list}>
              {socialLinks.map((link: ILinks) => (
                <li key={link.url} className={style.navigation__list__item}>
                  <Link href={link.url}>
                    <a target="_blank" rel="noopener noreferer">
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className={style.contact}>
          <p>Get in touch</p>
          <p className={style.contact__email}>{email}</p>
        </div>
      </div>
    </header>
  )
}

const NavButton = ({ isOpen, toggleOpen }: INavButton) => (
  <button
    className={[style.mobileButton, isOpen ? style.isOpen : ''].join(' ')}
    onClick={toggleOpen}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isOpen ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </>
      ) : (
        <>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </>
      )}
    </svg>
  </button>
)
