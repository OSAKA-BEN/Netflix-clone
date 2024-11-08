'use client'

import { useInfoModal } from '@/hooks/useInfoModal'
import useMovie from '@/hooks/useMovie'
import { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import FavoriteButton from './FavoriteButton'
import PlayButton from './PlayButton'

interface InfoModalProps {
  visible?: boolean
  onClose: () => void
}

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const [isVisible, setIsVisible] = useState(visible)
  const { movieId } = useInfoModal()
  const { data } = useMovie(movieId)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  if (!data) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md">
        <div
          className={`relative flex-auto transform bg-zinc-900 drop-shadow-md duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
        >
          <div className="relative h-96">
            <video
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
              className="h-full w-full object-cover brightness-[60%]"
            ></video>
            <div
              className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70 text-white transition hover:bg-opacity-80"
              onClick={handleClose}
            >
              <AiOutlineClose size={20} className="text-white" />
            </div>

            <div className="absolute bottom-[10%] left-10">
              <p className="mb-8 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {data?.title}
              </p>
              <div className="flex flex-row gap-2">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-lg font-semibold text-green-400">New</p>
            <p className="text-lg text-white">{data?.description}</p>
            <p className="text-lg text-white">{data?.duration}</p>
            <p className="text-lg text-white">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
