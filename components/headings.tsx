import { IHeadings } from 'interfaces'

export function Headings({ variant = 'h1', className, children }: IHeadings) {
  switch (variant) {
    case 'h1':
      return <h1 className={className}>{children}</h1>
    case 'h2':
      return <h2 className={className}>{children}</h2>
    case 'h3':
      return <h3 className={className}>{children}</h3>
  }
}
