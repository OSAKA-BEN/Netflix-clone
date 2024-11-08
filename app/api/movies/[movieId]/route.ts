import prisma from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } },
) {
  try {
    const { movieId } = params

    if (!movieId) {
      throw new Error('Movie ID is required')
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    })

    if (!movie) {
      throw new Error('Movie not found')
    }

    return NextResponse.json(movie)
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
