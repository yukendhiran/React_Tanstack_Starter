import { UserCreate } from '@/components/User/UserCreate'
import { UserView } from '@/components/User/UserView'
import { Button } from '@/components/ui/button'

import { logger } from '@/lib/logger'
import { useViewStore } from '@/store/view/viewStore'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/user/')({
  component: User,
})

function User() {
  const { view, setView } = useViewStore()
  logger.log('View', view)
  return (
    <div>
      <div className="flex justify-end pr-10">
        {view === 'list' && (
          <Button onClick={() => setView('create')}>Create</Button>
        )}
        {view === 'create' && (
          <Button onClick={() => setView('list')}>Back</Button>
        )}
      </div>

      {view === 'list' && <UserView />}
      {view === 'create' && <UserCreate />}
    </div>
  )
}
