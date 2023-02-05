import { addTodo } from '@/lib/todoApi'
import { PriorityType } from '@/types/PriorityType'
import Image from 'next/image'
import { useState } from 'react'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import Select from 'react-select'
import { MyControl, MyMenuList, MyOption } from './MyCustomSelect'
import Spinner from '../Spinner'

export interface PriorityOption {
  value: PriorityType
  label: string
}

const options: PriorityOption[] = [
  { value: 'very-high', label: 'Very High' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Medium' },
  { value: 'low', label: 'Low' },
  { value: 'very-low', label: 'Very Low' },
]

const TodoModal = ({
  modalTitle,
  setModalVisible,
  mutation,
  todoTitle,
  priority,
}: {
  modalTitle: string
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  mutation: UseMutationResult<any, any, any, any>
  todoTitle?: string
  priority?: PriorityType
}) => {
  const [todoName, setTodoName] = useState(todoTitle ?? '')

  const priorityProvided = options.find((option) => option.value === priority)
  const [selectedPriority, setSelectedPriority] = useState<PriorityOption>(
    priorityProvided ?? {
      value: 'very-high',
      label: 'Very High',
    },
  )

  const { mutateAsync, isLoading } = mutation

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await mutateAsync({ todoName, selectedPriority })
    setModalVisible(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      onClick={() => setModalVisible(false)}
      data-cy="modal-add"
    >
      <div
        className="min-w-[830px] min-h-[400px] flex flex-col items-center gap-12  bg-white rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between px-8 py-6 border-b">
          <p className="text-lg font-bold" data-cy="modal-add-title">
            {modalTitle}
          </p>
          <button
            onClick={() => setModalVisible(false)}
            data-cy="modal-add-close-button"
          >
            <Image
              src="/modal-add-close-button.png"
              width="24"
              height="24"
              alt="close modal"
            />
          </button>
        </div>

        <form onSubmit={onSubmit} className="w-full flex flex-col gap-8">
          <fieldset className="flex flex-col gap-2  px-8">
            <label
              htmlFor="todo-name-input"
              className="text-xs font-semibold"
              data-cy="modal-add-name-title"
            >
              NAMA LIST ITEM
            </label>
            <input
              id="todo-name-input"
              type="text"
              placeholder="Tambahkan nama activity"
              className="p-3 border rounded"
              value={todoName}
              onChange={(e) => setTodoName(e.target.value)}
              data-cy="modal-add-name-input"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2 border-b px-8 pb-8">
            <label
              htmlFor="priority"
              className="text-xs font-semibold"
              data-cy="modal-add-priority-title"
            >
              PRIORITY
            </label>
            <Select
              id="priority"
              className="w-[205px]"
              options={options}
              defaultValue={
                priorityProvided
                  ? options.filter(
                      (option) => option.value === priorityProvided.value,
                    )
                  : options[0]
              }
              components={{
                Option: MyOption,
                Control: MyControl,
                MenuList: MyMenuList,
              }}
              onChange={(option) =>
                setSelectedPriority(option as PriorityOption)
              }
            />
          </fieldset>
          <button
            data-cy="modal-add-save-button"
            disabled={todoName === ''}
            className={`flex items-center text-lg font-bold rounded-full px-10 py-2 text-white self-end mb-8 mr-8 ${
              todoName === '' ? 'bg-blue-disabled' : 'bg-blue-primary'
            }`}
            type="submit"
          >
            {isLoading ? <Spinner /> : 'Simpan'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TodoModal
