import { SortType } from '@/pages/detail/[id]'
import { ITodo } from '@/types/ITodo'

export const sortTodos = (data: ITodo[], method: SortType) => {
  switch (method) {
    case 'terbaru':
      return data
    case 'terlama':
      return [...data].reverse()
    case 'az':
      return data.sort((a: ITodo, b: ITodo) => a.title.localeCompare(b.title))
    case 'za':
      return data.sort((a: ITodo, b: ITodo) => b.title.localeCompare(a.title))
    case 'belumSelesai':
      return data.sort((a: ITodo, b: ITodo) => (a.is_active === 1 ? -1 : 1))
  }
}
