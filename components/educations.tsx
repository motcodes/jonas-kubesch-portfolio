import { IEducations } from 'interfaces'
import { getDate } from 'lib'
import style from '../styles/educations.module.scss'

export function Education({ data }: { data: Array<IEducations> }) {
  return (
    <section className={style.educations}>
      <h2 className={style.educations__heading}>Education</h2>
      {Array.isArray(data) && (
        <div className={style.container}>
          {data.map((item) => (
            <div
              className={style.container__info}
              key={`${item.name}-${item.from}`}
            >
              <h3 className={style.container__info__title}>{item.name}</h3>
              <p className={style.container__info__subtitle}>
                {item.department}
              </p>
              <p className={style.container__info__date}>
                <span>{getDate(item.from)}</span>
                {item.to ? (
                  <span> - {getDate(item.to)}</span>
                ) : (
                  <span> - present</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
