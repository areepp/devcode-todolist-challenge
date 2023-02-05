import { PriorityType } from '@/types/PriorityType'
import clsx from 'clsx'

const PriorityColor = ({
  priority,
  className,
}: {
  priority: PriorityType
  className?: string
}) => {
  return (
    <div
      className={clsx(
        'w-[14px] h-[14px] rounded-full',
        className,
        priority === 'very-high' && 'bg-priority-very-high',
        priority === 'high' && 'bg-priority-high',
        priority === 'normal' && 'bg-priority-normal',
        priority === 'low' && 'bg-priority-low',
        priority === 'very-low' && 'bg-priority-very-low',
      )}
    />
  )
}

export default PriorityColor
