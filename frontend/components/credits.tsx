import style from '../styles/credits.module.scss'

interface ICredits {
  Profession: string
  Name: string
}

export function Credits({ data }) {
  return (
    <div className={style.credits}>
      <h3>Credits</h3>
      <div className={style.gridContainer}>
        {data.map((item: ICredits) => (
          <div className={style.item} key={item.Profession}>
            <p className={style.item__profession}>{item.Profession}</p>
            <p className={style.item__name}>{item.Name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
