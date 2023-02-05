import { editTodo } from '@/lib/todoApi'
import { ITodo } from '@/types/ITodo'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import DeleteTodoModal from './DeleteTodoModal'
import PriorityColor from './PriorityColor'
import TodoModal, { PriorityOption } from './TodoModal'

interface Props {
  activityId: string
  data: ITodo
}

const Todo = ({ data, activityId }: Props) => {
  const { title, priority, id, is_active } = data
  const queryClient = useQueryClient()
  const [deleteTodoModalVisible, setDeleteTodoModalVisible] = useState(false)
  const [isActive, setIsActive] = useState(is_active)
  const [editTodoModalVisible, setEditTodoModalVisible] = useState(false)

  const { mutate: checkTodoMutation } = useMutation(
    (data: { todoId: number; is_active: 0 | 1 }) => editTodo(data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          'activities',
          parseInt(activityId),
          'todos',
        ]),
    },
  )

  const editTodoMutation = useMutation(
    (data: { todoName: string; selectedPriority: PriorityOption }) =>
      editTodo({
        todoId: id,
        title: data.todoName,
        priority: data.selectedPriority.value,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          'activities',
          parseInt(activityId),
          'todos',
        ]),
    },
  )

  const handleCheckTodo = () => {
    setIsActive((prev) => (prev === 1 ? 0 : 1))
    const checkedValue = isActive === 1 ? 0 : 1
    checkTodoMutation({ todoId: id, is_active: checkedValue })
  }

  return (
    <div
      className="flex justify-between items-center p-7 shadow-lg bg-white rounded-lg"
      data-cy="todo-item"
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          value={isActive}
          checked={isActive === 1 ? false : true}
          onChange={handleCheckTodo}
          data-cy="todo-item-checkbox"
        />
        <PriorityColor priority={priority} />
        <span
          className={clsx(isActive === 0 && 'line-through')}
          data-cy="todo-item-title"
        >
          {title}
        </span>
        <button onClick={() => setEditTodoModalVisible(true)}>
          <Image
            src="/todo-item-edit-button.png"
            width="20"
            height="20"
            alt="edit todo button"
          />
        </button>
      </div>
      <button
        onClick={() => setDeleteTodoModalVisible(true)}
        data-cy="todo-item-delete-button"
      >
        <Image
          src="/todo-item-delete-button.png"
          width="24"
          height="24"
          alt="delete todo button"
        />
      </button>
      {deleteTodoModalVisible && (
        <DeleteTodoModal
          setDeleteTodoModalVisible={setDeleteTodoModalVisible}
          activityId={activityId}
          todoId={id}
          todoTitle={title}
        />
      )}
      {editTodoModalVisible && (
        <TodoModal
          modalTitle="Edit Item"
          setModalVisible={setEditTodoModalVisible}
          mutation={editTodoMutation}
          todoTitle={title}
          priority={priority}
        />
      )}
    </div>
  )
}

export default Todo
