import Button from '@/components/Button'
import FilterOption from '@/components/ActivityDetailPage/FilterOption'
import Header from '@/components/Header'
import ItemList from '@/components/ActivityDetailPage/ItemList'
import TodoModal, {
  PriorityOption,
} from '@/components/ActivityDetailPage/TodoModal'
import { editActivityTitle, getActivityById } from '@/lib/activityApi'
import { addTodo } from '@/lib/todoApi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export type SortType = 'terbaru' | 'terlama' | 'az' | 'za' | 'belumSelesai'

const ActivityDetail = () => {
  const { query, isReady } = useRouter()
  const { id } = query
  const queryClient = useQueryClient()

  const [activityTitle, setActivityTitle] = useState<string>('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false)
  const [sortBy, setSortBy] = useState<SortType>('terbaru')

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    isLoading,
    isError,
    data: activityInfo,
  } = useQuery(
    ['activities', parseInt(id as string)],
    () => getActivityById(id as string),
    {
      enabled: isReady,
    },
  )

  const { mutate: editTitleMutation } = useMutation(
    () => editActivityTitle({ id: id as string, title: activityTitle }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['activities', parseInt(id as string)]),
    },
  )

  const addTodoMutation = useMutation(
    (data: { todoName: string; selectedPriority: PriorityOption }) =>
      addTodo({
        activityId: id as string,
        title: data.todoName,
        priority: data.selectedPriority.value,
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          'activities',
          parseInt(id as string),
          'todos',
        ]),
    },
  )

  useEffect(() => {
    setActivityTitle(activityInfo?.title ?? '')
  }, [activityInfo])

  useEffect(() => {
    if (isEditingTitle && inputRef.current) inputRef.current.focus()
  }, [isEditingTitle, inputRef])

  const handleEditTitleButton = () => {
    setIsEditingTitle(true)
  }

  const handleTitleInputBlur = () => {
    setIsEditingTitle(false)
    editTitleMutation()
  }

  if (isError) return <div>error</div>

  return (
    <>
      <Header />
      <main className="py-12 bg-zinc-100 w-full min-h-screen">
        <div className="my-container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/todo-back-button.png"
                  width="32"
                  height="32"
                  alt="back to home button"
                  data-cy="todo-back-button"
                />
              </Link>

              {isEditingTitle ? (
                <input
                  ref={inputRef}
                  type="text"
                  className="w-1/2 bg-transparent focus:outline-none focus:border-b-2 font-bold text-4xl"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  onBlur={handleTitleInputBlur}
                />
              ) : (
                <h2
                  className="font-bold text-4xl"
                  data-cy="todo-title"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {isLoading ? 'loading..' : activityInfo?.title}
                </h2>
              )}

              <button onClick={handleEditTitleButton}>
                <Image
                  data-cy="todo-title-edit-button"
                  src="/activity-title-edit-button.png"
                  width="24"
                  height="24"
                  alt="edit title button"
                />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <FilterOption sortBy={sortBy} setSortBy={setSortBy} />
              <Button
                type="primary"
                className="h-[54px]"
                onClick={() => setAddTodoModalVisible(true)}
                data-cy="todo-add-button"
              >
                + Tambah
              </Button>
            </div>
          </div>
          <section className="mt-16 w-full">
            {isReady && <ItemList sortBy={sortBy} id={id as string} />}
          </section>
        </div>
      </main>
      {isReady && addTodoModalVisible && (
        <TodoModal
          setModalVisible={setAddTodoModalVisible}
          mutation={addTodoMutation}
          modalTitle="Tambah List Item"
        />
      )}
    </>
  )
}

export default ActivityDetail
