import { PriorityType } from './PriorityType'

export interface ITodo {
  id: number
  title: string
  priority: PriorityType
  is_active: 0 | 1
}
