import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  onClick: any
  type: 'primary' | 'danger' | 'light'
  className?: string
  [rest: string]: any
}

const Button = ({ children, onClick, type, className, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'flex justify-center items-center flex-shrink-0 min-w-[138px] max-h-[54px] text-lg font-bold rounded-full px-10 py-2',
        type === 'primary' && 'bg-blue-primary text-white',
        type === 'danger' && 'bg-rose-500 text-white',
        type === 'light' && 'bg-zinc-100 text-black',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
