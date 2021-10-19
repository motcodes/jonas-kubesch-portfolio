import Link from "next/link"

export const Nav = () => {
  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Jonas Kubesch</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
