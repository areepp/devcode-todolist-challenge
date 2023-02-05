import { IActivity } from '@/types/activity'
import { formatDateToIndo } from '@/utils/formatDateToIndo'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import DeleteActivityModal from './DeleteActivityModal'

const ActivityCard = ({ data }: { data: IActivity }) => {
  const { title, created_at, id } = data
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const handleDeleteButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.nativeEvent.preventDefault()
    setDeleteModalVisible(true)
  }

  return (
    <>
      <Link className="cursor-pointer" href={`/detail/${id}`}>
        <div
          className="h-[234px] p-6 flex flex-col justify-between bg-white rounded-xl shadow-xl"
          data-cy="activity-item"
        >
          <h3 className="font-bold" data-cy="activity-item-title">
            {title}
          </h3>
          <div className="flex justify-between">
            <p className="text-zinc-500" data-cy="activity-item-date">
              {formatDateToIndo(created_at)}
            </p>
            <button
              className="hover:bg-gray-300 rounded-full p-1 transition-all"
              onClick={handleDeleteButtonClick}
              data-cy="activity-item-delete-button"
            >
              <Image
                src="/delete-button.svg"
                width="18"
                height="24"
                alt="delete activity"
              />
            </button>
          </div>
        </div>
      </Link>

      {deleteModalVisible && (
        <DeleteActivityModal
          activityId={id}
          activityTitle={title}
          setDeleteModalVisible={setDeleteModalVisible}
        />
      )}
    </>
  )
}

export default ActivityCard
