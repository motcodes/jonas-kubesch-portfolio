import style from '../styles/educations.module.scss'

export interface IEducations {
  name: string
  department: string
  from: string
  to: string
}

const splitDate = (date) => `${date.split('-')[1]}.${date.split('-')[0]}`

export function Educations({ data }: { data: Array<IEducations> }) {
  return (
    <section className={style.educations}>
      <h2 className={style.educations__heading}>Education</h2>
      {data.map((item) => (
        <div
          className={style.container}
          key={`${item.name} ${item.department}`}
        >
          <div className={style.container__info}>
            <h3 className={style.container__info__title}>{item.name}</h3>
            <h4 className={style.container__info__subtitle}>
              {item.department}
            </h4>
            <p className={style.container__info__date}>
              <span>{splitDate(item.from)}</span>
              {item.to && <span> - {splitDate(item.to)}</span>}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
