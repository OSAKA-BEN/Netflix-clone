'use client'

import useBillboard from '@/hooks/useBillboard'
import { useInfoModal } from '@/hooks/useInfoModal'
import { useCallback } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from './PlayButton'

const Billboard = () => {
  const { data } = useBillboard()
  const { onOpen } = useInfoModal()

  const handleOpenModal = useCallback(() => {
    onOpen(data?.id)
  }, [onOpen, data?.id])

  return (
    <div className="relative h-[56.25vw]">
      <video
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="h-[56.25vw] w-full object-cover brightness-[60%]"
      ></video>
      <div className="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
        <p className="text-1xl w-[50%] font-bold text-white drop-shadow-xl md:w-[60%] md:text-5xl lg:w-[50%] lg:text-6xl">
          {data?.title}
        </p>
        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
          {data?.description}
        </p>
        <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpenModal}
            className="flex w-auto flex-row items-center rounded-md bg-neutral-500 bg-opacity-70 px-2 py-1 text-xs font-semibold text-white transition hover:bg-opacity-80 md:px-4 md:py-2 lg:text-lg"
          >
            <AiOutlineInfoCircle className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Billboard
