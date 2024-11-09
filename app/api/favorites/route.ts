import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { currentUser } = await serverAuth()

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    })

    return NextResponse.json(favoriteMovies)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'An error occured' }, { status: 500 })
  }
}
