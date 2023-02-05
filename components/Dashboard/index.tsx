import { createNewActivity } from '@/lib/activityApi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Button from '../Button'
import Activities from './Activities'

const Dashboard = () => {
  const queryClient = useQueryClient()

  const { mutate: createActivityMutation } = useMutation(createNewActivity, {
    onSuccess: () => queryClient.invalidateQueries('activities'),
  })

  return (
    <main className="py-12 bg-zinc-100 w-full min-h-screen">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-4xl" data-cy="activity-title">
            Activity
          </h2>
          <Button
            type="primary"
            onClick={createActivityMutation}
            data-cy="activity-add-button"
          >
            + Tambah
          </Button>
        </div>
        <section className="mt-16 w-full">
          <Activities />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
