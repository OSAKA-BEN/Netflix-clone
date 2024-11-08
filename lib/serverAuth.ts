import { getServerSession } from 'next-auth'
import { authOptions } from './authOptions'

import prismadb from './prismadb'

const serverAuth = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error('Non connecté')
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) {
    throw new Error('Non connecté')
  }

  return { currentUser }
}

export default serverAuth
