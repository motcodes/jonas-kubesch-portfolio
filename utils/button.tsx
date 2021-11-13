import style from '../styles/button.module.scss'

export const Button = ({
  className,
  children,
  ...rest
}: {
  className?: string
  children: ChildNode | string
  [x: string]: any
}) => {
  return (
    <button className={`${style.button} ${className}`} {...rest}>
      {children}
    </button>
  )
}
