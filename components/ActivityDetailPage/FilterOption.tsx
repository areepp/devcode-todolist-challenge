import { SortType } from '@/pages/detail/[id]'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface IOption {
  text: string
  imageSrc: string
  value: SortType
  cyName: string
}

const options: IOption[] = [
  {
    text: 'Terbaru',
    imageSrc: '/sort-terbaru.png',
    value: 'terbaru',
    cyName: 'sort-latest',
  },
  {
    text: 'Terlama',
    imageSrc: '/sort-terlama.png',
    value: 'terlama',
    cyName: 'sort-oldest',
  },
  {
    text: 'A-Z',
    imageSrc: '/sort-alphabet-asc.png',
    value: 'az',
    cyName: 'sort-az',
  },
  {
    text: 'Z-A',
    imageSrc: '/sort-alphabet-desc.png',
    value: 'za',
    cyName: 'sort-za',
  },
  {
    text: 'Belum Selesai',
    imageSrc: '/sort-belum-selesai.png',
    value: 'belumSelesai',
    cyName: 'sort-unfinished',
  },
]

const Option = ({
  data: { text, imageSrc, value, cyName },
  sortBy,
  setSortBy,
}: {
  data: IOption
  sortBy: SortType
  setSortBy: React.Dispatch<React.SetStateAction<SortType>>
}) => (
  <button
    className="w-full p-3 flex items-center justify-between border-b last:border-b-0"
    onClick={() => setSortBy(value)}
    data-cy={cyName}
  >
    <div className="flex items-center gap-4">
      <Image src={imageSrc} width="18" height="18" alt="sort option button" />
      <span>{text}</span>
    </div>
    {sortBy === value && (
      <Image src="/checkmark.png" width="13" height="24" alt="checkmark" />
    )}
  </button>
)

const FilterOption = ({
  sortBy,
  setSortBy,
}: {
  sortBy: SortType
  setSortBy: React.Dispatch<React.SetStateAction<SortType>>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    const closeOption = (e: MouseEvent) => {
      if (e.composedPath()[0] !== btnRef.current) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', closeOption)

    return () => document.body.removeEventListener('click', closeOption)
  }, [])

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        data-cy="todo-sort-button"
      >
        <Image
          ref={btnRef}
          src="/todo-sort-button.png"
          width="54"
          height="54"
          alt="sort todo button"
        />
      </button>
      {isOpen && (
        <div
          className="absolute top-full mt-1 w-[235px] bg-white overflow-hidden rounded-lg shadow-lg border"
          data-cy="sort-selection"
        >
          {options.map((option) => (
            <Option
              data={option}
              key={option.text}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterOption
