import style from '../styles/hero.module.scss'

export function Hero() {
  return (
    <section className={style.hero}>
      <div className={style.backgroundPlaceholder}>M</div>
      <div className={style.container}>
        <h1>
          I'm <i>baby microdosing flexitarian street</i> art pour-over
          distillery. IPhone quinoa food truck, <b>prism snackwave</b> next
          level farm-to-table drinking vinegar.
        </h1>
      </div>
    </section>
  )
}
