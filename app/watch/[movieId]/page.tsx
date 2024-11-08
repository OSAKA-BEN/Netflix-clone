'use client'

import useMovie from '@/hooks/useMovie'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const WatchPage = ({ params }: { params: { movieId: string } }) => {
  const router = useRouter()
  const movieId = params.movieId
  const { data } = useMovie(movieId)

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed z-10 flex w-full flex-row items-center gap-8 bg-black bg-opacity-70 p-4">
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          size={40}
          className="cursor-pointer text-white hover:opacity-80"
        />
        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-normal">Watching:</span> {data?.title}
        </p>
      </nav>
      <video
        src={data?.videoUrl}
        className="h-full w-full"
        controls
        autoPlay
      ></video>
    </div>
  )
}

export default WatchPage
