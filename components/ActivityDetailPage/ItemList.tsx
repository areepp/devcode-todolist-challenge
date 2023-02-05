import { getAllTodos } from '@/lib/todoApi'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { ITodo } from '@/types/ITodo'
import { sortTodos } from '@/utils/sortMethods'
import Todo from './Todo'
import { SortType } from '@/pages/detail/[id]'

const ItemList = ({ id, sortBy }: { id: string; sortBy: SortType }) => {
  const { isLoading, isError, data } = useQuery(
    ['activities', parseInt(id), 'todos'],
    () => getAllTodos(id),
  )

  if (isLoading) return <div>loading...</div>

  if (isError || !data) return <div>error</div>

  if (data.length === 0)
    return (
      <Image
        className="mx-auto"
        src="/buat-list-item.png"
        width="541"
        height="413"
        alt="foto buat list item"
        data-cy="todo-empty-state"
      />
    )

  const sortedData = sortTodos(data, sortBy)

  return (
    <div className="flex flex-col gap-2">
      {sortedData.map((todo: ITodo) => (
        <Todo key={todo.id} data={todo} activityId={id} />
      ))}
    </div>
  )
}

export default ItemList
