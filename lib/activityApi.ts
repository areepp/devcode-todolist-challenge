import axios from './axios'

export const getAllActivities = async () => {
  const response = await axios.get('/activity-groups')
  return response.data.data
}

export const createNewActivity = async () =>
  axios.post('/activity-groups', {
    title: 'New Activity',
  })

export const deleteActivity = async (id: number) =>
  axios.delete(`/activity-groups/${id}`)

export const getActivityById = async (id: string) => {
  const response = await axios.get(`/activity-groups/${id}`)
  return response.data
}

export const editActivityTitle = async ({
  id,
  title,
}: {
  id: string
  title: string
}) => axios.patch(`/activity-groups/${id}`, { title })
