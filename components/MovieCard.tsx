import { useInfoModal } from '@/hooks/useInfoModal'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './FavoriteButton'

interface MovieCardProps {
  data: Record<string, any>
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter()
  const { onOpen } = useInfoModal()

  const handleOpenModal = useCallback(() => {
    onOpen(data?.id)
  }, [onOpen, data?.id])

  return (
    <div className="col-span group relative h-[12vw] bg-zinc-900">
      <img
        src={data.thumbnailUrl}
        alt="Thumbnail"
        className="duration h-full w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-200 group-hover:opacity-90 sm:group-hover:opacity-0"
      />
      <div className="invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-200 duration-200 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:scale-110 group-hover:opacity-100 sm:visible">
        <img
          src={data.thumbnailUrl}
          alt="Thumbnail"
          className="duration h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition"
        />
        <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="flex h-6 w-6 cursor-pointer flex-row items-center justify-center rounded-full bg-white p-1 text-zinc-800 hover:bg-neutral-300 lg:h-10 lg:w-10"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={handleOpenModal}
              className="group/item ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
            >
              <BiChevronDown
                className="text-white group-hover/item:text-neutral-300"
                size={30}
              />
            </div>
          </div>

          <p className="text-md mt-4 font-semibold text-green-400 lg:text-lg">
            New <span className="ml-1 text-white">2024</span>
          </p>

          <div className="mt-4 flex flex-row items-center gap-2 font-semibold text-white">
            <p className="text-[18px] text-white lg:text-sm">{data.duration}</p>
          </div>
          <div className="mt-4 flex flex-row items-center gap-2 font-semibold text-white">
            <p className="text-[18px] text-white lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
