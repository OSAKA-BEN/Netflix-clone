import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'

import prismadb from './prismadb'

const serverAuth = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error('Not connected')
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) {
    throw new Error('Not connected')
  }

  return { currentUser }
}

export default serverAuth
