import { PriorityType } from '@/types/PriorityType'
import axios from './axios'

export const getAllTodos = async (activityId: string) => {
  const response = await axios.get(
    `/todo-items?activity_group_id=${activityId}`,
  )
  return response.data.data
}

export const addTodo = async ({
  activityId,
  title,
  priority,
}: {
  title: string
  activityId: string
  priority: PriorityType
}) =>
  axios.post('/todo-items', {
    activity_group_id: activityId,
    title,
    priority,
  })

export const editTodo = async ({
  todoId,
  title,
  priority,
  is_active,
}: {
  todoId: number
  title?: string
  priority?: PriorityType
  is_active?: 0 | 1
}) => axios.patch(`/todo-items/${todoId}`, { title, priority, is_active })

export const deleteTodo = async (id: number) =>
  axios.delete(`/todo-items/${id}`)
