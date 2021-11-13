import { ICredits } from 'interfaces'
import style from '../styles/credits.module.scss'

export function Credits({ data }) {
  return (
    <div className={style.credits}>
      <h3>Credits</h3>
      <div className={style.gridContainer}>
        {data.map((item: ICredits) => (
          <div className={style.item} key={item.role}>
            <p className={style.item__profession}>{item.role}</p>
            <p className={style.item__name}>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
