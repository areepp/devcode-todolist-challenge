import { deleteActivity } from '@/lib/activityApi'
import Image from 'next/image'
import { useMutation, useQueryClient } from 'react-query'
import AlertActivity from '@/components/AlertActivity'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'

const DeleteActivityModal = ({
  setDeleteModalVisible,
  activityId,
  activityTitle,
}: {
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  activityId: number
  activityTitle: string
}) => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteActivityMutation,
    isLoading,
    isSuccess,
  } = useMutation((id: number) => deleteActivity(id))

  const closeModal = () => {
    if (isSuccess) {
      queryClient.invalidateQueries('activities')
    }
    setDeleteModalVisible(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      onClick={closeModal}
      data-cy="modal-delete"
    >
      {isSuccess ? (
        <AlertActivity text="Activity" />
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

          <p className="text-lg text-center">
            Apakah anda yakin menghapus activity{' '}
            <strong>&quot;{activityTitle}&quot;?</strong>
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
              onClick={() => deleteActivityMutation(activityId)}
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

export default DeleteActivityModal
