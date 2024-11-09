import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Avatar from '../../components/Avatar'
import { authOptions } from '../../lib/authOptions'

const ProfilesPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-white md:text-4xl">
          Who&apos;s watching?
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <Avatar session={session} />
        </div>
      </div>
    </div>
  )
}

export default ProfilesPage
