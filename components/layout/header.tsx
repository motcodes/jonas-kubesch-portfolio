import router from 'next/router'
import { INavButton, ILinks } from 'interfaces'
import { useContext, useEffect, useState } from 'react'
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
    const htmlEl = document.getElementsByTagName('html')[0]
    if (isOpen) {
      htmlEl.classList.remove('noScrollY')
    } else if (!isOpen) {
      htmlEl.classList.add('noScrollY')
    }
  }

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      const htmlEl = document.getElementsByTagName('html')[0]
      htmlEl.classList.remove('noScrollY')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

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
      width={48}
      height={48}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isOpen ? (
        <>
          <line x1="22" y1="8" x2="2" y2="16"></line>
          <line x1="2" y1="8" x2="22" y2="16"></line>
        </>
      ) : (
        <>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="8" x2="22" y2="8"></line>
          <line x1="2" y1="16" x2="22" y2="16"></line>
        </>
      )}
    </svg>
  </button>
)
