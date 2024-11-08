import { without } from 'lodash'
import { NextRequest, NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'

export async function POST(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth()

    const { movieId } = await request.json()

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie) {
      throw new Error('Invalid ID')
    }

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { currentUser } = await serverAuth()

    const { movieId } = await request.json()

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!existingMovie) {
      throw new Error('Invalid ID')
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)
  }
}
