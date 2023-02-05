import { getAllActivities } from '@/lib/activityApi'
import { IActivity } from '@/types/activity'
import { useQuery } from 'react-query'
import ActivityCard from './ActivityCard'
import Image from 'next/image'

const Activities = () => {
  const {
    isLoading,
    isError,
    data: activitiesData,
  } = useQuery('activities', getAllActivities)

  if (isLoading) return <div>loading...</div>

  if (isError || !activitiesData) return <div>error</div>

  if (activitiesData.length === 0)
    return (
      <Image
        className="mx-auto"
        src="/buat-activity-pertama.png"
        width="767"
        height="490"
        alt="buat activity pertama"
        data-cy="activity-empty-state"
      />
    )

  return (
    <div className="grid grid-cols-4 gap-4">
      {activitiesData.map((activity: IActivity) => {
        return <ActivityCard data={activity} key={activity.id} />
      })}
    </div>
  )
}

export default Activities
