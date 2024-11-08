import { useCallback, useMemo } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import axios from 'axios'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorite = useCallback(async () => {
    let response

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({ ...currentUser, favoriteIds: updatedFavoriteIds })
    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorite}
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
    >
      <Icon className="text-white" size={25} />
    </div>
  )
}

export default FavoriteButton
