// app/page.tsx

import Billboard from '@/components/Billboard'
import InfoModalContainer from '@/components/InfoModalContainer'
import MovieListContainer from '@/components/MovieListContainer'
import Navbar from '@/components/Navbar'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth')
  }

  return (
    <>
      <InfoModalContainer />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieListContainer title="Trending Now" />
        <MovieListContainer title="My List" />
      </div>
    </>
  )
}
