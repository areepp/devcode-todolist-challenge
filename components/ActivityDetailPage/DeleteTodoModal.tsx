import { deleteTodo } from '@/lib/todoApi'
import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import AlertActivity from '../AlertActivity'
import Button from '../Button'
import Spinner from '../Spinner'

const DeleteTodoModal = ({
  setDeleteTodoModalVisible,
  todoId,
  todoTitle,
  activityId,
}: {
  setDeleteTodoModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  todoId: number
  todoTitle: string
  activityId: string
}) => {
  const queryClient = useQueryClient()
  const {
    isLoading,
    mutateAsync: deleteTodoMutation,
    isSuccess,
  } = useMutation(() => deleteTodo(todoId))

  const closeModal = () => {
    if (isSuccess) {
      queryClient.invalidateQueries([
        'activities',
        parseInt(activityId),
        'todos',
      ])
    }
    setDeleteTodoModalVisible(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      onClick={closeModal}
      data-cy="modal-delete"
    >
      {isSuccess ? (
        <AlertActivity text="Todo" />
      ) : (
        <div
          className="w-[490px] h-[355px] px-16 py-10 flex flex-col items-center gap-12  bg-white rounded-2xl shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/modal-delete-icon.png"
            width="84"
            height="84"
            alt="delete activity alert"
            data-cy="modal-delete-icon"
          />

          <p className="text-lg text-center" data-cy="modal-delete-title">
            Apakah anda yakin menghapus List Item{' '}
            <strong>&quot;{todoTitle}&quot;?</strong>
          </p>
          <div className="flex gap-4">
            <Button
              type="light"
              onClick={closeModal}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </Button>
            <Button
              type="danger"
              onClick={() => deleteTodoMutation()}
              data-cy="modal-delete-confirm-button"
            >
              {isLoading ? <Spinner /> : 'Hapus'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteTodoModal
